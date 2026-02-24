package com.fingcart.productservice.service.impl;

import com.fingcart.productservice.dto.ProductRequestDto;
import com.fingcart.productservice.dto.ProductResponseDto;
import com.fingcart.productservice.entity.Product;
import com.fingcart.productservice.exception.ResourceNotFoundException;
import com.fingcart.productservice.mapper.ProductMapper;
import com.fingcart.productservice.repository.ProductRepository;
import com.fingcart.productservice.service.ProductService;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final Pattern OBJECT_ID_PATTERN = Pattern.compile("^[a-fA-F0-9]{24}$");
    private static final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;


    @Override
    public ProductResponseDto createProduct(ProductRequestDto request)  {
        validateCategoryIdOrThrow(request.getCategoryId());
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .imageUrl(request.getImageUrl())
                .categoryId(request.getCategoryId())
                .isDeleted(false)
                .build();
        Product savedProduct = productRepository.save(product);
        return productMapper.toDto(savedProduct);
    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .filter(p -> !p.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return productMapper.toDto(product);
    }

    @Override
    public Page<ProductResponseDto> getAllProducts(Pageable pageable) {
        return productRepository.findByIsDeletedFalse(pageable).map(productMapper::toDto);
    }

    @Override
    public ProductResponseDto updateProduct(Long id, ProductRequestDto request) {
        Product product = productRepository.findById(id)
                .filter(p -> !p.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        validateCategoryIdOrThrow(request.getCategoryId());
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setImageUrl(request.getImageUrl());
        product.setCategoryId(request.getCategoryId());
        return productMapper.toDto(productRepository.save(product));
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .filter(p -> !p.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        product.setDeleted(true);
        productRepository.save(product);
    }

    @Override
    public Page<ProductResponseDto> getProductsByCategory(String categoryId, Pageable pageable) {
        validateCategoryIdOrThrow(categoryId);
        return productRepository.findByCategoryIdAndIsDeletedFalse(categoryId, pageable)
                .map(productMapper::toDto);
    }

    private void validateCategoryIdOrThrow(String categoryId) {
        if (!isValid(categoryId)) {
            throw new IllegalArgumentException("Invalid category ID: " + categoryId);
        }
    }

    public boolean isValid(String id) {
        if (id == null || id.isBlank())
            return false;
        return OBJECT_ID_PATTERN.matcher(id).matches();
    }

}
