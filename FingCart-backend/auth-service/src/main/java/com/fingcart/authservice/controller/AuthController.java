package com.fingcart.authservice.controller;

import com.fingcart.authservice.config.JwtConfig;
import com.fingcart.authservice.dto.JwtResponseDto;
import com.fingcart.authservice.dto.LoginRequestDto;
import com.fingcart.authservice.dto.LoginResponseDto;
import com.fingcart.authservice.dto.UserResponseDto;
import com.fingcart.authservice.entity.AppUser;
import com.fingcart.authservice.jwt.Jwt;
import com.fingcart.authservice.mapper.UserMapper;
import com.fingcart.authservice.repository.UserRepository;
import com.fingcart.authservice.service.AuthService;
import com.fingcart.authservice.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtConfig jwtConfig;
    private final UserMapper userMapper;
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/login")
    public JwtResponseDto login(
            @Valid @RequestBody LoginRequestDto request,
            HttpServletResponse response) {

        LoginResponseDto loginResult = authService.login(request);
        String refreshToken = loginResult.getRefreshToken().toString();
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/api/auth/refresh");
        cookie.setMaxAge(jwtConfig.getRefreshTokenExpiration());
        cookie.setSecure(true);
        response.addCookie(cookie);

        return new JwtResponseDto(loginResult.getAccessToken().toString());
    }

//    refresh token
    @PostMapping("/refresh")
    public JwtResponseDto refreshAccessToken(@CookieValue(value = "refreshToken") String refreshToken) {
        Jwt accessToken = authService.refreshAccessToken(refreshToken);
        return new JwtResponseDto(accessToken.toString());
    }
//
    @GetMapping("/current-user")
    public ResponseEntity<UserResponseDto> currentUser() {
        AppUser user = authService.getCurrentUser();
        if (user != null) {
            UserResponseDto userDto = userMapper.toDto(user);
            return ResponseEntity.ok(userDto);
        }
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Void> BadCredentialsException(){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
