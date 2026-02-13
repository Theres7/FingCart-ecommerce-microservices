package com.fingcart.authservice.service.impl;

import com.fingcart.authservice.entity.AppUser;

import com.fingcart.authservice.repository.UserRepository;
import lombok.*;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Getter
@Setter
@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepository.findByUsername(username).orElseThrow(()
                ->  new UsernameNotFoundException("User with username "+username+ " not found")
        );

        return new User(
                user.getUsername(),
                user.getPassword(),
                Collections.emptyList()
        );
    }
}
