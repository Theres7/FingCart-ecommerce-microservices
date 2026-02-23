package com.fingcart.orderservice.service.impl;

import com.fingcart.orderservice.client.AuthClient;
import com.fingcart.orderservice.client.CartClient;
import com.fingcart.orderservice.dto.*;
import com.fingcart.orderservice.exception.*;
import com.fingcart.orderservice.model.Order;
import com.fingcart.orderservice.model.OrderItem;
import com.fingcart.orderservice.model.OrderStatus;
import com.fingcart.orderservice.repository.OrderItemRepository;
import com.fingcart.orderservice.repository.OrderRepository;
import com.fingcart.orderservice.service.CheckoutService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CheckoutServiceImpl implements CheckoutService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartClient cartClient;
    private final AuthClient authClient;

    public Mono<CheckoutResponse> checkout(CheckoutRequest request, String token) {
        return validateCartId(request.getCartId())
                .filter(cart -> !cart.getItems().isEmpty())
                .switchIfEmpty(Mono.error(new CartEmptyException("Cart is empty")))
                .flatMap(cart -> {

                    // Get user, create order, save it, clear cart, and return response
                    return validateUserAuthentication(token)
                            .flatMap(user -> saveOrderWithItems(cart, user.getId()) )
                            .flatMap(savedOrder -> cartClient.clearCart(request.getCartId())
                                    .thenReturn(new CheckoutResponse(savedOrder.getId(),
                                "http://fingcart.com/demo-orders/checkout/"+savedOrder.getId())) );
                });
    }

    public Mono<Order> saveOrderWithItems(CartResponseDto cart, Long userId){
        Order order = createOrderFromCart(cart, userId);
        return orderRepository.save(order)
                .flatMap(savedOrder -> {
                    List<OrderItem> orderItems = createOrderItems(cart, savedOrder);

                    // Save all order items
                    return orderItemRepository.saveAll(orderItems)
                            .collectList()
                            .thenReturn(savedOrder);
                });
    }

    public Mono<CartResponseDto> validateCartId(UUID cartId){
        return cartClient.getCartById(cartId)
                .onErrorResume(WebClientResponseException.NotFound.class,
                        ex -> Mono.error(new CartNotFoundException("Cart not found for " + cartId)));
    }

    public Mono<UserResponseDto> validateUserAuthentication(String token){
        return authClient.getCurrentUser(token)
                .onErrorResume(WebClientResponseException.Unauthorized.class, ex -> {
                    log.error("Unauthorized access with token");
                    return Mono.error(new UnauthorizedException("Invalid or expired token"));
                });
    }

    public List<OrderItem> createOrderItems(CartResponseDto cart, Order order){
        return cart.getItems().stream()
                .map(item -> new OrderItem(
                        order.getId(),
                        item.getProductId(),
                        item.getQuantity(),
                        item.getTotalPrice()
                                .multiply(BigDecimal.valueOf(item.getQuantity())) ))
                .toList();
    }

    public Order createOrderFromCart(CartResponseDto cart, Long customerId) {
        Order order = new Order();
        order.setCustomerId(customerId);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());
        order.setTotalPrice(cart.getTotalPrice());
       return order;
    }

}



