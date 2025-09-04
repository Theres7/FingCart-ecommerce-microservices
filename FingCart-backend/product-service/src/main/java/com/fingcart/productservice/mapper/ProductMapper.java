package com.fingcart.productservice.mapper;

import com.fingcart.productservice.dto.ProductResponseDto;
import com.fingcart.productservice.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductResponseDto toDto(Product product);
}
