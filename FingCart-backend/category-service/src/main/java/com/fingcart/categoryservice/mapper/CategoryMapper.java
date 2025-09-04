package com.fingcart.categoryservice.mapper;

import com.fingcart.categoryservice.dto.CategoryResponseDto;
import com.fingcart.categoryservice.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponseDto toDto(Category category);
}
