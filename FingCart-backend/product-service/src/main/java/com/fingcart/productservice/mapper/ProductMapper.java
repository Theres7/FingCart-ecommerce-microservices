package com.fingcart.productservice.mapper;

import com.fingcart.productservice.dto.ProductResponseDto;
import com.fingcart.productservice.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "imageUrl", source = "imageUrl")
    ProductResponseDto toDto(Product product);
}
