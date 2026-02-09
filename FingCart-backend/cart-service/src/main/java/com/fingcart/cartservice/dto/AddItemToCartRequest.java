package com.fingcart.cartservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddItemToCartRequest {
    @NotNull
    private Long productId;
}
