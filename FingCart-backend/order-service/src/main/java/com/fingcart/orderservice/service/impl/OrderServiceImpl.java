package com.fingcart.orderservice.service.impl;

import com.fingcart.orderservice.client.AuthClient;
import com.fingcart.orderservice.dto.OrderResponseDto;
import com.fingcart.orderservice.dto.OrderWithItemsDto;
import com.fingcart.orderservice.exception.OrderNotFoundException;
import com.fingcart.orderservice.exception.UnauthorizedException;
import com.fingcart.orderservice.mapper.OrderMapper;
import com.fingcart.orderservice.model.OrderItem;
import com.fingcart.orderservice.repository.OrderItemRepository;
import com.fingcart.orderservice.repository.OrderRepository;
import com.fingcart.orderservice.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderMapper orderMapper;
    private final AuthClient authClient;

    public Flux<OrderResponseDto> getAllOrders(String token){
        return authClient.getCurrentUser(token)
                .onErrorResume(WebClientResponseException.class, ex -> {
            log.error("Unauthorized access with token");
            return Mono.error(new UnauthorizedException("Invalid or expired token")); })
                .flatMapMany(user -> orderRepository.findAllByCustomerId(user.getId()))
                .map(orderMapper::toDto);
    }

    // Get order with items
    public Mono<OrderWithItemsDto> getOrderWithItems(Long orderId) {
        return orderRepository.findById(orderId)
                .switchIfEmpty(Mono.error(new OrderNotFoundException("Order not found for " + orderId)))
                .flatMap(order ->orderItemRepository.findByOrderId(orderId)
                            .collectList()
                            .map(items -> new OrderWithItemsDto(order, items))
                );
    }

    @Override
    public Flux<OrderWithItemsDto> getAllOrdersWithItems() {
        return orderRepository.findAll()
                .flatMap(order -> {
                    Mono<List<OrderItem>> itemsMono = orderItemRepository
                            .findByOrderId(order.getId())
                            .collectList();

                    return itemsMono.map(items -> new OrderWithItemsDto(order, items));
                });
    }
}
