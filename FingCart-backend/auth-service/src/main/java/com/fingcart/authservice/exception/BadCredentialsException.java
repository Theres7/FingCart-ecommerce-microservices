package com.fingcart.authservice.exception;

public class BadCredentialsException extends RuntimeException   {
    public BadCredentialsException(String message) {
        super(message);
    }
}
