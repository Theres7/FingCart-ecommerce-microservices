package com.fingcart.categoryservice.service;

import com.fingcart.categoryservice.dto.CategoryRequestDto;
import com.fingcart.categoryservice.dto.CategoryResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryService {

    CategoryResponseDto createCategory(CategoryRequestDto requestDto);

    CategoryResponseDto getCategoryById(Long id);

    CategoryResponseDto updateCategory(Long id, CategoryRequestDto requestDto);

    Page<CategoryResponseDto> getAllCategories(String keyword, Pageable pageable);

    void deleteCategory(Long id);

}
