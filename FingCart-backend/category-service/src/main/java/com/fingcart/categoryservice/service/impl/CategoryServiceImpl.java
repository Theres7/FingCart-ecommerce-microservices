package com.fingcart.categoryservice.service.impl;

import com.fingcart.categoryservice.dto.CategoryRequestDto;
import com.fingcart.categoryservice.dto.CategoryResponseDto;
import com.fingcart.categoryservice.entity.Category;
import com.fingcart.categoryservice.exception.ResourceNotFoundException;
import com.fingcart.categoryservice.mapper.CategoryMapper;
import com.fingcart.categoryservice.repository.CategoryRepository;
import com.fingcart.categoryservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponseDto createCategory(CategoryRequestDto requestDto) {
        if (categoryRepository.existsByNameIgnoreCase(requestDto.getName())) {
            throw new IllegalArgumentException("Category with this name already exists");
        }

        Category category = Category.builder()
                .name(requestDto.getName())
                .description(requestDto.getDescription())
                .build();
        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toDto(savedCategory);
    }

    @Override
    public CategoryResponseDto getCategoryById(String id) {
        Category category = categoryRepository.findById(id)
                .filter(category1 -> !category1.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id "+id));
        return categoryMapper.toDto(category);
    }

    @Override
    public CategoryResponseDto updateCategory(String id, CategoryRequestDto requestDto) {
        Category category = categoryRepository.findById(id)
                .filter(c -> !c.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id "+id));

        category.setName(requestDto.getName());
        category.setDescription(requestDto.getDescription());
        categoryRepository.save(category);
        return categoryMapper.toDto(category);
    }

    @Override
    public Page<CategoryResponseDto> getAllCategories(String keyword, Pageable pageable) {
        Page<Category> categories = (keyword == null) || keyword.isBlank()
                ? categoryRepository.findByIsDeletedFalse(pageable)
                : categoryRepository.findByIsDeletedFalseAndNameContainingIgnoreCase(keyword, pageable);
        return categories.map(categoryMapper::toDto);
    }

    @Override
    public void deleteCategory(String id) {
        Category category = categoryRepository.findById(id)
                .filter(c -> !c.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id "+id));
        category.setDeleted(true);
        categoryRepository.save(category);
    }

}
