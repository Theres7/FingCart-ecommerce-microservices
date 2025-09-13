package com.fingcart.categoryservice.repository;

import com.fingcart.categoryservice.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {

    boolean existsByNameIgnoreCase(String name);

    Page<Category> findByIsDeletedFalse(Pageable pageable);

    Page<Category> findByIsDeletedFalseAndNameContainingIgnoreCase(String keyword, Pageable pageable);
}
