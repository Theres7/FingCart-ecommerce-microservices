package com.fingcart.categoryservice.repository;

import com.fingcart.categoryservice.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByNameIgnoreCase(String name);

    Page<Category> findByIsDeletedFalse(Pageable pageable);

    Page<Category> findByIsDeletedFalseAndNameContainingIgnoreCase(String keyword, Pageable pageable);
}
