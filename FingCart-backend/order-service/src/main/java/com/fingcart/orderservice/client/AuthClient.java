package com.fingcart.orderservice.client;

import com.fingcart.orderservice.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class AuthClient {

    private final WebClient authWebClient;

    public Mono<UserResponseDto> getCurrentUser(String token) {
        return authWebClient
                .get()
                .uri("/api/auth/me")
                .header("Authorization", token)
                .retrieve()
                .bodyToMono(UserResponseDto.class);
    }

}
