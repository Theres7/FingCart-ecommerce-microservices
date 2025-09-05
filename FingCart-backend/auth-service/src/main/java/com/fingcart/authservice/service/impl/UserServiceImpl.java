package com.fingcart.authservice.service.impl;

import com.fingcart.authservice.dto.UserRequestDto;
import com.fingcart.authservice.dto.UserResponseDto;
import com.fingcart.authservice.entity.AppUser;
import com.fingcart.authservice.entity.Role;
import com.fingcart.authservice.exception.UserNotFoundException;
import com.fingcart.authservice.mapper.UserMapper;
import com.fingcart.authservice.repository.UserRepository;
import com.fingcart.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDto registerUser(UserRequestDto userRequestDto) {

        AppUser user = AppUser.builder()
                .name(userRequestDto.getName())
                .username(userRequestDto.getUsername())
                .email(userRequestDto.getEmail())
                .password(passwordEncoder.encode(userRequestDto.getPassword()) )
                .role(Role.USER)
                .build();

        AppUser savedAppUser = userRepository.save(user);
        return userMapper.toDto(savedAppUser);
    }

    @Override
    public UserResponseDto getUserById(Long id) {
        AppUser user = userRepository.findById(id).orElseThrow( () -> new UserNotFoundException("User with id "+ id+ " not found"));
        return userMapper.toDto(user);
    }

    @Override
    public UserResponseDto updateUser(Long id, UserRequestDto request) {
        AppUser user = userRepository.findById(id).orElseThrow( () -> new UserNotFoundException("U"));
        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        AppUser updatedAppUser = userRepository.save(user);
        return userMapper.toDto(updatedAppUser);
    }

    @Override
    public boolean deleteUser(Long id) {
        AppUser user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        if(user != null){
        userRepository.delete(user);
            return true;
        }
        return false;
    }
}
