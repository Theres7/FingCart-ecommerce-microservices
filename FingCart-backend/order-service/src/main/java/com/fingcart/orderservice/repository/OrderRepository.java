package com.fingcart.orderservice.repository;

import com.fingcart.orderservice.model.Order;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface OrderRepository extends ReactiveCrudRepository<Order, Long> {
    Flux<Order> findAllByCustomerId(Long customerId);

}