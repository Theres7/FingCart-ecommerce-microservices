package com.fingcart.authservice.service;

import com.fingcart.authservice.dto.LoginRequestDto;
import com.fingcart.authservice.dto.LoginResponseDto;
import com.fingcart.authservice.dto.UserRequestDto;
import com.fingcart.authservice.dto.UserResponseDto;
import com.fingcart.authservice.entity.AppUser;
import com.fingcart.authservice.exception.UserAlreadyExistsException;
import com.fingcart.authservice.exception.UserNotFoundException;
import com.fingcart.authservice.jwt.Jwt;
import com.fingcart.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserResponseDto registerUser(UserRequestDto userRequestDto) {

        if (userRepository.existsByUsername(userRequestDto.getUsername())) {
            throw new UserAlreadyExistsException("Username is already taken");
        }

        if (userRepository.existsByEmail(userRequestDto.getEmail())) {
            throw new UserAlreadyExistsException("Email is already registered");
        }

        String encodedPassword = passwordEncoder.encode(userRequestDto.getPassword());
        return userService.saveUser(userRequestDto, encodedPassword);
    }

    public LoginResponseDto login(LoginRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        AppUser user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        Jwt accessToken = jwtService.generateAccessToken(user);
        Jwt refreshToken = jwtService.generateRefreshToken(user);
        return new LoginResponseDto(accessToken, refreshToken);
    }

    public Jwt refreshAccessToken(String refreshToken) {
        Jwt jwt = jwtService.parseToken(refreshToken);
        if (jwt == null || jwt.isExpired()) {
            throw new BadCredentialsException("Invalid refresh token");
        }

        AppUser user = userRepository.findById(jwt.getUserId()).orElseThrow();
        return jwtService.generateAccessToken(user);
    }

    public AppUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();
        return userRepository.findById(userId).orElseThrow( () -> new UserNotFoundException("User not found"));
    }
}
