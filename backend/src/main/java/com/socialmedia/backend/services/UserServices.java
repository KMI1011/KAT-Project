
package com.socialmedia.backend.services;

import com.socialmedia.backend.models.UserModels;
import com.socialmedia.backend.repos.UserRepo;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServices {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserServices(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // Existing method: save a user
    public UserModels saveUser(UserModels user) {
        return userRepo.save(user);
    }

    // New method: register a user securely
    public UserModels registerUser(UserModels user) {

        if (user.getUsername() == null ||
                user.getUsername().isBlank() ||
                user.getEmail() == null ||
                user.getEmail().isBlank() ||
                user.getPassword() == null ||
                user.getPassword().isBlank()) {
            throw new IllegalArgumentException(
                "Username, email, and password are required"
            );
        }

        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException(
                "Username already exists"
            );
        }

        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException(
                "Email already exists"
            );
        }

        // Never accept a client-supplied ID for registration
        user.setId(null);

        // Hash password before saving
        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

        return userRepo.save(user);
    }

    // New method: verify login credentials
    public boolean validateLogin(String username, String password) {

        if (username == null || password == null) {
            return false;
        }

        Optional<UserModels> existingUser =
            userRepo.findByUsername(username);

        if (existingUser.isEmpty()) {
            return false;
        }

        UserModels storedUser = existingUser.get();

        return passwordEncoder.matches(
            password,
            storedUser.getPassword()
        );
    }

    // Existing methods
    public List<UserModels> getAllUsers() {
        return userRepo.findAll();
    }

    public Optional<UserModels> getUserById(Long id) {
        return userRepo.findById(id);
    }

    public Optional<UserModels> getUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public Optional<UserModels> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
}