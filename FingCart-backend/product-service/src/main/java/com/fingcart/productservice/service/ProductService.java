package com.fingcart.productservice.service;

import com.fingcart.productservice.dto.ProductRequestDto;
import com.fingcart.productservice.dto.ProductResponseDto;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {
    ProductResponseDto createProduct(ProductRequestDto request) throws BadRequestException;

    ProductResponseDto getProductById(Long id);

    Page<ProductResponseDto> getAllProducts(Pageable pageable);

    ProductResponseDto updateProduct(Long id, ProductRequestDto request);

    void deleteProduct(Long id);

    Page<ProductResponseDto> getProductsByCategory(Long categoryId, Pageable pageable);
}
