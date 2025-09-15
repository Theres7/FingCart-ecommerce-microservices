package com.fingcart.authservice.mapper;

import com.fingcart.authservice.dto.UserRequestDto;
import com.fingcart.authservice.dto.UserResponseDto;
import com.fingcart.authservice.entity.AppUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = AddressMapper.class)
public interface UserMapper {
    UserResponseDto toDto(AppUser user);
    AppUser toEntity(UserRequestDto request);
}

