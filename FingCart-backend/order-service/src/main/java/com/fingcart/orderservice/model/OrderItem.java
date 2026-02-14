package com.fingcart.orderservice.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;

@Getter
@Setter
@Table(name = "order_items")
@NoArgsConstructor
public class OrderItem {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column("id")
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "order_id")
    @Column("order_id")
    private Long orderId;

    @Column("product_id")
    private Long productId;

    @Column("quantity")
    private Integer quantity;

    @Column("total_price")
    private BigDecimal totalPrice;

    public OrderItem(Long orderId, Long productId, Integer quantity, BigDecimal totalPrice) {
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
}