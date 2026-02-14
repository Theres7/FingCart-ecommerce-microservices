package com.fingcart.orderservice.mapper;

import com.fingcart.orderservice.dto.OrderResponseDto;
import com.fingcart.orderservice.model.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderResponseDto toDto(Order order);
}
