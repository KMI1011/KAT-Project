package com.socialmedia.backend.repos;

import com.socialmedia.backend.models.UserModels;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<UserModels, Long> {

    Optional<UserModels> findByUsername(String username);

    Optional<UserModels> findByEmail(String email);
}