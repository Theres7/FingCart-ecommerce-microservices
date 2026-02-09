package com.fingcart.cartservice.controller;

import com.fingcart.cartservice.dto.*;
import com.fingcart.cartservice.service.CartService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/carts")
@AllArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<CartResponseDto> createCart() {
        CartResponseDto cartResponse = cartService.createCart();
        return ResponseEntity.status(HttpStatus.CREATED).body(cartResponse);
    }

    @PostMapping("/{cartId}/cartItems")
    public ResponseEntity<CartItemResponseDto> addProductToCart(@PathVariable UUID cartId,
                                                                @Valid @RequestBody AddItemToCartRequest request){
        CartItemResponseDto cartItemResponse = cartService.addItemToCart(cartId, request.getProductId());
        return ResponseEntity.status(HttpStatus.CREATED).body(cartItemResponse);
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<CartResponseDto> getCartById(@PathVariable UUID cartId){
        CartResponseDto cartResponse = cartService.getCartById(cartId);
        return ResponseEntity.ok(cartResponse);
    }

    @PutMapping("/{cartId}/cartItems/{productId}")
    public ResponseEntity<?> updateCartItem(@PathVariable("cartId") UUID cartId,
                                                      @PathVariable("productId") Long productId,
                                                      @Valid @RequestBody UpdateCartItemRequest request){
        CartItemResponseDto updatedCartItem = cartService.updateCartItem(cartId, productId, request.getQuantity());
        return ResponseEntity.ok(updatedCartItem);
    }

    @DeleteMapping("/{cartId}/cartItems/{productId}")
    public ResponseEntity<Void> removeItemFromCart(
            @PathVariable("cartId") UUID cartId,
            @PathVariable("productId") Long productId ){

        cartService.removeItem(cartId, productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{cartId}/cartItems")
    public ResponseEntity<Void> clearCart(@PathVariable UUID cartId){
        cartService.clearCart(cartId);
        return ResponseEntity.noContent().build();
    }

}
