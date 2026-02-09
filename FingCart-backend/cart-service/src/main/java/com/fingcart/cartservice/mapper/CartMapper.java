package com.fingcart.cartservice.mapper;

import com.fingcart.cartservice.dto.CartItemResponseDto;
import com.fingcart.cartservice.dto.CartResponseDto;
import com.fingcart.cartservice.entity.Cart;
import com.fingcart.cartservice.entity.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartMapper {
    @Mapping(target = "totalPrice", expression = "java(cart.getTotalPrice())")
    CartResponseDto toDto(Cart cart);

    CartItemResponseDto toDto(CartItem cartItem);
}
