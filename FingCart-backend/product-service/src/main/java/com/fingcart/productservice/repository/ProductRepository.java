package com.fingcart.productservice.repository;

import com.fingcart.productservice.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
    Page<Product> findByIsDeletedFalse(Pageable pageable);
    Page<Product> findByCategoryIdAndIsDeletedFalse(Long categoryId, Pageable pageable);
}
