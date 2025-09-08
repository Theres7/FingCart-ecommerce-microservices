package com.fingcart.productservice.service.impl;

import com.fingcart.productservice.dto.CategoryResponseDto;
import com.fingcart.productservice.dto.ProductRequestDto;
import com.fingcart.productservice.dto.ProductResponseDto;
import com.fingcart.productservice.entity.Product;
import com.fingcart.productservice.exception.BadRequestException;
import com.fingcart.productservice.exception.ResourceNotFoundException;
import com.fingcart.productservice.mapper.ProductMapper;
import com.fingcart.productservice.repository.ProductRepository;
import com.fingcart.productservice.service.ProductService;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private static final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;
    private final WebClient.Builder webClientBuilder;
    private final ProductMapper productMapper;

    @Override
    public ProductResponseDto createProduct(ProductRequestDto request)  {
        validateCategoryIdOrThrow(request.getCategoryId());
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .quantity(request.getQuantity())
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
    public Page<ProductResponseDto> getProductsByCategory(Long categoryId, Pageable pageable) {
        validateCategoryIdOrThrow(categoryId);
        return productRepository.findByCategoryIdAndIsDeletedFalse(categoryId, pageable)
                .map(productMapper::toDto);
    }

    private void validateCategoryIdOrThrow(Long categoryId) {
        if (categoryId == null) {
            throw new BadRequestException("Category ID is required");
        }
        try {
             webClientBuilder.build().get()
                    .uri("http://CATEGORY-SERVICE/api/categories/{id}", categoryId)
                    .retrieve()
                    .onStatus( status -> status.value() == HttpStatus.NOT_FOUND.value(),
                            response -> Mono.error(new BadRequestException("Invalid category ID: " + categoryId)))

                    .onStatus(
                            HttpStatusCode::is4xxClientError,
                            response -> response.createException()
                                    .flatMap(ex -> Mono.error(new BadRequestException("Failed to validate category: " + ex.getMessage())))
                    )
                    .onStatus(
                            HttpStatusCode::is5xxServerError,
                            response -> response.createException()
                                    .flatMap(ex -> Mono.error(new BadRequestException("Category service unavailable. Please try again.")))
                    )
                    .bodyToMono(CategoryResponseDto.class)
                    .block(); // blocking here for a synchronous service method

        } catch (WebClientResponseException e) {
            log.error("Category-service error: status={}, body={}", e.getRawStatusCode(), e.getResponseBodyAsString());
            throw new BadRequestException("Failed to validate category. Please try again.");
        } catch (Exception e) {
            log.error("Error calling category-service", e);
            throw new BadRequestException("Category validation unavailable. Please try again later.");
        }
    }

}
