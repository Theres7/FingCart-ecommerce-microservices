package com.fingcart.orderservice.dto;

import com.fingcart.orderservice.model.Order;
import com.fingcart.orderservice.model.OrderItem;
import com.fingcart.orderservice.model.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderWithItemsDto {
    private Long id;
    private Long customerId;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private BigDecimal totalPrice;
    private List<OrderItem> orderItems;

    // Constructor from Order and items
    public OrderWithItemsDto(Order order, List<OrderItem> items) {
        this.id = order.getId();
        this.customerId = order.getCustomerId();
        this.status = order.getStatus();
        this.createdAt = order.getCreatedAt();
        this.totalPrice = order.getTotalPrice();
        this.orderItems = items;
    }
}
