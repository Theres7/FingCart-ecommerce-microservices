package com.fingcart.authservice.service.impl;

import com.fingcart.authservice.dto.UpdateUserRequestDto;
import com.fingcart.authservice.dto.UserRequestDto;
import com.fingcart.authservice.dto.UserResponseDto;
import com.fingcart.authservice.entity.Address;
import com.fingcart.authservice.entity.AppUser;
import com.fingcart.authservice.entity.Role;
import com.fingcart.authservice.exception.UserNotFoundException;
import com.fingcart.authservice.mapper.AddressMapper;
import com.fingcart.authservice.mapper.UserMapper;
import com.fingcart.authservice.repository.AddressRepository;
import com.fingcart.authservice.repository.UserRepository;
import com.fingcart.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AddressMapper addressMapper;
    private final AddressRepository addressRepository;

    @Override
    public UserResponseDto saveUser(UserRequestDto userRequestDto, String encodedPassword) {
        AppUser user = AppUser.builder()
                .name(userRequestDto.getName())
                .username(userRequestDto.getUsername())
                .email(userRequestDto.getEmail())
                .password(encodedPassword)
                .role(Role.USER)
                .build();

        if (userRequestDto.getAddresses() != null) {
            List<Address> addresses = userRequestDto.getAddresses().stream()
                    .map(addressRequestDto -> Address.builder()
                            .state(addressRequestDto.getState())
                            .district(addressRequestDto.getDistrict())
                            .city(addressRequestDto.getCity())
                            .street(addressRequestDto.getStreet())
                            .pincode(addressRequestDto.getPincode())
                            .user(user)
                            .build())
                    .toList();
            user.setAddresses(addresses);
        }

        AppUser savedAppUser = userRepository.save(user);
        return userMapper.toDto(savedAppUser);
    }

    @Override
    public UserResponseDto getUserById(Long id) {
        AppUser user = userRepository.findById(id)
                .orElseThrow( () -> new UserNotFoundException("User with id "+ id+ " not found"));
        return userMapper.toDto(user);
    }

    @Override
    public UserResponseDto updateUser(Long id, UpdateUserRequestDto request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();

        // Authorization check
        if (!userId.equals(id)) {
            throw new AccessDeniedException("You can only update your own account");
        }

        AppUser user = userRepository.findById(id)
                .orElseThrow( () -> new UserNotFoundException("User not found with id " + id));

        // Use MapStruct to update the entity
        userMapper.updateUserFromDto(request, user);

        // Handle addresses separately
        if(request.getAddresses() != null){
            Set<String> existingKeys = user.getAddresses()
                    .stream()
                    .map(a -> a.getStreet() + "|" + a.getCity() + "|" + a.getPincode())
                    .collect(Collectors.toSet());
            List<Address> addresses = request
                    .getAddresses()
                    .stream()
                    .filter(dto -> !existingKeys.contains(
                            dto.getStreet() + "|" + dto.getCity() + "|" + dto.getPincode()
                    ))
                    .map(addressDto -> {
                Address address = addressMapper.toEntity(addressDto);
                address.setUser(user);
                return address;
            }).collect(Collectors.toList());
            addressRepository.saveAll(addresses);
            user.getAddresses().addAll(addresses);
        }
        AppUser updatedAppUser = userRepository.save(user);
        return userMapper.toDto(updatedAppUser);
    }

    @Override
    public void deleteUser(Long id) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        if(user != null){
        userRepository.delete(user);
        }
    }
}
