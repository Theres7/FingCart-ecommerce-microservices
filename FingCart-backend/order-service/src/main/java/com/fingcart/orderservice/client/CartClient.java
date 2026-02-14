package com.fingcart.orderservice.client;

import com.fingcart.orderservice.dto.CartResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CartClient {
    private final WebClient cartWebClient;

    public Mono<CartResponseDto> getCartById(UUID cartId) {
        return cartWebClient
                .get()
                .uri("/api/carts/{cartId}", cartId)
                .retrieve()
                .bodyToMono(CartResponseDto.class);
    }

    public Mono<Void> clearCart(UUID cartId) {
        return cartWebClient
                .delete()
                .uri("/api/carts/{cartId}/cartItems", cartId)
                .retrieve()
                .bodyToMono(Void.class);
    }

}
