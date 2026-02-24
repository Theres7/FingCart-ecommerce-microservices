package com.fingcart.productservice.controller;

import com.fingcart.productservice.dto.ProductRequestDto;
import com.fingcart.productservice.dto.ProductResponseDto;
import com.fingcart.productservice.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponseDto> createProduct(@Valid @RequestBody ProductRequestDto request) throws BadRequestException {
        log.info("Creating new product: {}", request.getName());
        ProductResponseDto product = productService.createProduct(request);
        return ResponseEntity.status(201).body(product);
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<ProductResponseDto> getProductById(@PathVariable Long id) {
        log.debug("Fetching product with Id: {}", id);
        ProductResponseDto product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping
    public ResponseEntity<Page<ProductResponseDto>> getAllProducts(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort sort = direction.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() :
                Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        log.debug("Listing products with pagination: {}", pageable);
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDto> updateProduct(@PathVariable Long id,
                                                            @Valid @RequestBody ProductRequestDto request) {
        log.info("Updating product ID {} with data: {}", id, request.getName());
        ProductResponseDto product = productService.updateProduct(id, request);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.warn("Deleting product with Id: {}", id);
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<ProductResponseDto>> getProductsByCategory(
            @PathVariable String categoryId,
            @PageableDefault(size = 10) Pageable pageable) {
        log.debug("Fetching products for category Id: {}", categoryId);
        Page<ProductResponseDto> productsByCategory = productService.getProductsByCategory(categoryId, pageable);
        return ResponseEntity.ok(productsByCategory);
    }

}
