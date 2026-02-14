package com.fingcart.orderservice.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Table(name = "orders")
public class Order {
    @Id
    @Column("id")
    private Long id;

    @Column("customer_id")
    private Long customerId;

    @Column("status")
    private OrderStatus status;

    @Column("created_at")
    private LocalDateTime createdAt;

    @Column("total_price")
    private BigDecimal totalPrice;

}