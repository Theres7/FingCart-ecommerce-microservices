package com.fingcart.cartservice.service.impl;

import com.fingcart.cartservice.client.ProductClient;
import com.fingcart.cartservice.dto.CartItemResponseDto;
import com.fingcart.cartservice.dto.CartResponseDto;
import com.fingcart.cartservice.dto.ProductResponseDto;
import com.fingcart.cartservice.entity.Cart;
import com.fingcart.cartservice.entity.CartItem;
import com.fingcart.cartservice.exception.CartNotFoundException;
import com.fingcart.cartservice.exception.ProductNotFoundException;
import com.fingcart.cartservice.mapper.CartMapper;
import com.fingcart.cartservice.repository.CartRepository;
import com.fingcart.cartservice.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartMapper cartMapper;
    private final ProductClient productClient;

    @Override
    public CartResponseDto createCart() {
        Cart cart = new Cart();
        cartRepository.save(cart);
        return cartMapper.toDto(cart);
    }

    @Override
    public CartItemResponseDto addItemToCart(UUID cartId, Long productId){
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart not found"));

        ProductResponseDto product = getProductById(productId);
        if(product == null ){
            throw new ProductNotFoundException("Product not found");
        }

        CartItem cartItem = cart.addItem(product.getId());
        cartItem.setPrice(product.getPrice());
        cartRepository.save(cart);
        return cartMapper.toDto(cartItem);
    }

    @Override
    public CartResponseDto getCartById(UUID cartId){
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart not found"));
        return cartMapper.toDto(cart);
    }

    @Override
    public CartItemResponseDto updateCartItem(UUID cartId, Long productId, Integer quantity){
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart not found"));

        CartItem cartItem = cart.getItem(productId);
        if(cartItem == null){
            throw new ProductNotFoundException("Product not found");
        }
        cartItem.setQuantity(quantity);
        cartRepository.save(cart);

        return cartMapper.toDto(cartItem);
    }

    @Override
    public void removeItem(UUID cartId, Long productId){
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart not found"));
        CartItem cartItem = cart.getItem(productId);

        if(cartItem == null){
            throw new ProductNotFoundException("Product not found");
        }
        cart.removeItem(cartItem.getProductId());
        cartRepository.save(cart);
    }

    @Override
    public void clearCart(UUID cartId){
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart not found"));
        cart.clear();
        cartRepository.save(cart);
    }

    private ProductResponseDto getProductById(Long productId){
        return productClient.getProductById(productId);
    }
}
