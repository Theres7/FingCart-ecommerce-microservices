package com.fingcart.orderservice.controller;

import com.fingcart.orderservice.dto.OrderResponseDto;
import com.fingcart.orderservice.dto.OrderWithItemsDto;
import com.fingcart.orderservice.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<Flux<OrderResponseDto>> getAllOrders(@RequestHeader("Authorization") String token){
        Flux<OrderResponseDto> orders = orderService.getAllOrders(token);
        return ResponseEntity.status(HttpStatus.OK).body(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mono<OrderWithItemsDto>> getOrderWithItemsByOrderId(@PathVariable Long id) {
        Mono<OrderWithItemsDto> orderWithItems = orderService.getOrderWithItems(id);
        return ResponseEntity.ok(orderWithItems);
    }

    @GetMapping("/ordersWithItems")
    public ResponseEntity<Flux<OrderWithItemsDto>> getAllOrdersWithItems() {
        Flux<OrderWithItemsDto> orderWithItems = orderService.getAllOrdersWithItems();
        return ResponseEntity.ok(orderWithItems);
    }

}
