package com.fingcart.orderservice.client;

import com.fingcart.orderservice.dto.UserResponseDto;
import com.fingcart.orderservice.exception.AuthServiceUnavailableException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthClient {

    private final WebClient authWebClient;

    public Mono<UserResponseDto> getCurrentUser(String token) {
        return authWebClient
                .get()
                .uri("/api/auth/me")
                .header("Authorization", token)
                .retrieve()
                .bodyToMono(UserResponseDto.class)
                .onErrorMap(WebClientRequestException.class,ex
                        -> new AuthServiceUnavailableException("Unable to connect to the authentication service", ex));
    }

}
