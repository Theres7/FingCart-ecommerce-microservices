package com.fingcart.orderservice.service;

import com.fingcart.orderservice.dto.OrderResponseDto;
import com.fingcart.orderservice.dto.OrderWithItemsDto;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface OrderService {
    Flux<OrderResponseDto> getAllOrders(String token);

    Mono<OrderWithItemsDto> getOrderWithItems(Long orderId);

    Flux<OrderWithItemsDto> getAllOrdersWithItems();
}
