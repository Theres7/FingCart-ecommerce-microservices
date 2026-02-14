package com.fingcart.orderservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient productWebClient(){
        return WebClient.builder()
                .baseUrl("http://localhost:9002")
                .build();
    }

    @Bean
    public WebClient cartWebClient(){
        return WebClient.builder()
                .baseUrl("http://localhost:9003")
                .build();
    }

    @Bean
    public WebClient authWebClient(){
        return WebClient.builder()
                .baseUrl("http://localhost:9005")
                .build();
    }

}
