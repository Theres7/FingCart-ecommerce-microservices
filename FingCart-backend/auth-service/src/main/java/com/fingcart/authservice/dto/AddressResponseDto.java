package com.fingcart.authservice.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressResponseDto {
    private Long id;
    private String state;
    private String district;
    private String city;
    private String street;
    private String pincode;
}
