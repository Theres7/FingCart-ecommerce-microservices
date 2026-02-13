package com.fingcart.authservice.service;

import com.fingcart.authservice.dto.UpdateUserRequestDto;
import com.fingcart.authservice.dto.UserRequestDto;
import com.fingcart.authservice.dto.UserResponseDto;

public interface UserService {
    UserResponseDto saveUser(UserRequestDto request, String encodedPassword);

    UserResponseDto getUserById(Long id);

    UserResponseDto updateUser(Long id, UpdateUserRequestDto request);

    void deleteUser(Long id);
}
