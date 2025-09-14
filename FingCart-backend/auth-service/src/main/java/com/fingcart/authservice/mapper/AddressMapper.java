package com.fingcart.authservice.mapper;

import com.fingcart.authservice.dto.AddressRequestDto;
import com.fingcart.authservice.dto.AddressResponseDto;
import com.fingcart.authservice.entity.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    AddressResponseDto toDto(Address address);
    Address toEntity(AddressRequestDto AddressRequestDto);
}
