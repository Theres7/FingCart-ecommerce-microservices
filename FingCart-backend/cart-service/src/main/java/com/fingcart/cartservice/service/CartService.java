package com.fingcart.cartservice.service;

import com.fingcart.cartservice.dto.CartResponseDto;
import com.fingcart.cartservice.dto.CartItemResponseDto;

import java.util.UUID;

public interface CartService {

    CartResponseDto createCart();

    CartItemResponseDto addItemToCart(UUID cartId, Long productId);

    CartResponseDto getCartById(UUID cartId);

    CartItemResponseDto updateCartItem(UUID cartId, Long productId, Integer quantity);

    void clearCart(UUID cartId);

    void removeItem(UUID cartId, Long productId);

}
