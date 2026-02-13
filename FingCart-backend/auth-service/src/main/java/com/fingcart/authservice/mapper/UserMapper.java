package com.fingcart.authservice.mapper;

import com.fingcart.authservice.dto.UpdateUserRequestDto;
import com.fingcart.authservice.dto.UserRequestDto;
import com.fingcart.authservice.dto.UserResponseDto;
import com.fingcart.authservice.entity.AppUser;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = AddressMapper.class)
public interface UserMapper {
    UserResponseDto toDto(AppUser user);
    AppUser toEntity(UserRequestDto request);

    // Update existing entity from DTO
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "addresses", ignore = true) // Handle separately
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDto(UpdateUserRequestDto dto, @MappingTarget AppUser user);
}

