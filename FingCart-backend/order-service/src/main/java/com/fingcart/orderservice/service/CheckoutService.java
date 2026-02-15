package com.fingcart.orderservice.service;

import com.fingcart.orderservice.dto.CheckoutRequest;
import com.fingcart.orderservice.dto.CheckoutResponse;
import reactor.core.publisher.Mono;

public interface CheckoutService {
    Mono<CheckoutResponse> checkout(CheckoutRequest request, String token);
}
