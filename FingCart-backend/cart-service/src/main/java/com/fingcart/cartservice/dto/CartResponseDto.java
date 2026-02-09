package com.fingcart.cartservice.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponseDto {
    private UUID id;
    private List<CartItemResponseDto> items = new ArrayList<>();
    private BigDecimal totalPrice = BigDecimal.ZERO;
    private LocalDateTime createdAt;
}
