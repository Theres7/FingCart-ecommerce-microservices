package com.fingcart.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private Long id;
    private String name;
    private String username;
    private String email;
}
