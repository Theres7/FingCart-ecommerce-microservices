package com.fingcart.authservice.service;

import com.fingcart.authservice.dto.UserRequestDto;
import com.fingcart.authservice.dto.UserResponseDto;

public interface UserService {
    UserResponseDto registerUser(UserRequestDto request);

    UserResponseDto getUserById(Long id);

    UserResponseDto updateUser(Long id, UserRequestDto request);

    boolean deleteUser(Long id);
}
