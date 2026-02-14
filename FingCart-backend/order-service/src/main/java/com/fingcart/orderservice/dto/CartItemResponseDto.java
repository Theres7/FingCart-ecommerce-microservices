package com.fingcart.orderservice.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemResponseDto {
    private Long productId;
    private int quantity;
    private BigDecimal totalPrice;
}
