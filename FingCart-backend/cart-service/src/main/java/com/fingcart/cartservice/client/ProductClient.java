package com.fingcart.cartservice.client;

import com.fingcart.cartservice.dto.ProductResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class ProductClient {
    private final WebClient productWebClient;

    public ProductResponseDto getProductById(Long productId) {
        return productWebClient
                .get()
                .uri("/api/products/{id}", productId)
                .retrieve()
                .bodyToMono(ProductResponseDto.class)
                .block();
    }
}