package com.fingcart.orderservice.controller;

import com.fingcart.orderservice.dto.CheckoutRequest;
import com.fingcart.orderservice.dto.CheckoutResponse;
import com.fingcart.orderservice.service.CheckoutService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
public class CheckoutController {
    private final CheckoutService checkoutService;

    @PostMapping
    public ResponseEntity<Mono<CheckoutResponse>> checkout(@Valid @RequestBody CheckoutRequest request,
                                           @RequestHeader("Authorization") String token)  {
        Mono<CheckoutResponse> checkoutResponse = checkoutService.checkout(request, token);
        return ResponseEntity.status(HttpStatus.OK).body(checkoutResponse);
    }
}
