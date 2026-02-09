package com.fingcart.cartservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient productWebClient(
            WebClient.Builder builder,
            @Value("${product-service.base-url}") String baseUrl) {
        return builder
                .baseUrl(baseUrl)
                .build();
    }

//    @Bean
//    public WebClient productWebClient(){
//        return WebClient.builder()
//                .baseUrl("http://localhost:9002")
//                .build();

//    }

}
