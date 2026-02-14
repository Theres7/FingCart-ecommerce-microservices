package com.fingcart.orderservice.mapper;

import com.fingcart.orderservice.dto.OrderItemDto;
import com.fingcart.orderservice.model.OrderItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
    OrderItemDto toDto(OrderItem orderItem);
}
