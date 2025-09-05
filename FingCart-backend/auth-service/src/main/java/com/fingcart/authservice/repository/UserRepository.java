package com.fingcart.authservice.repository;

import com.fingcart.authservice.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    Optional<AppUser> findByUsername(String username);
    Optional<AppUser> findByEmail(String email);
}
