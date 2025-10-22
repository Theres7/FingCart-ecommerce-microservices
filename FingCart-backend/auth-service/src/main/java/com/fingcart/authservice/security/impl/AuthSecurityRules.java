package com.fingcart.authservice.security.impl;

import com.fingcart.authservice.entity.Role;
import com.fingcart.authservice.security.SecurityRules;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.stereotype.Component;

@Component
public class AuthSecurityRules implements SecurityRules {
    @Override
    public void configure(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry registry) {
       registry.requestMatchers(HttpMethod.POST,"/api/auth/login").permitAll()
               .requestMatchers(HttpMethod.POST, "/api/auth/refresh").permitAll()
               .requestMatchers(HttpMethod.GET,"/api/auth/current-user").permitAll()
               .requestMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll()
               .requestMatchers("/swagger-ui.html").permitAll()
               .requestMatchers("/v3/api-docs/**").permitAll();

    }
}
