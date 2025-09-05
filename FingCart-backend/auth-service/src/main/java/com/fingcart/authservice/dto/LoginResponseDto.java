package com.fingcart.authservice.dto;

import com.fingcart.authservice.jwt.Jwt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private Jwt accessToken;
    private Jwt refreshToken;
}
