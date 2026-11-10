
package com.socialmedia.backend.controllers;

import com.socialmedia.backend.models.UserModels;
import com.socialmedia.backend.services.UserServices;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserControllers {

    private final UserServices userService;

    public UserControllers(UserServices userService) {
        this.userService = userService;
    }

    // SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserModels user) {

        UserModels savedUser = userService.saveUser(user);

        return ResponseEntity.status(201)
                .body("Signup successful");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserModels user) {

        Optional<UserModels> existingUser =
                userService.getUserByUsername(user.getUsername());

        if (existingUser.isEmpty()) {
            return ResponseEntity.status(401)
                    .body("Invalid username or password");
        }

        UserModels storedUser = existingUser.get();

        if (!storedUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401)
                    .body("Invalid username or password");
        }

        return ResponseEntity.ok("Login successful");
    }

    @PostMapping
    public ResponseEntity<UserModels> createUser(@RequestBody UserModels user) {
        UserModels savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserModels>> getUsers() {
        List<UserModels> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserModels> getUserById(@PathVariable Long id) {
        Optional<UserModels> user = userService.getUserById(id);

        return user
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserModels> getUserByUsername(@PathVariable String username) {
        Optional<UserModels> user = userService.getUserByUsername(username);

        return user
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserModels> getUserByEmail(@PathVariable String email) {
        Optional<UserModels> user = userService.getUserByEmail(email);

        return user
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}