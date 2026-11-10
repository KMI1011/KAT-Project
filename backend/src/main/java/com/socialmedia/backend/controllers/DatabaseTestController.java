package com.socialmedia.backend.controllers;

import java.sql.Connection;

import javax.sql.DataSource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class DatabaseTestController {

    private final DataSource dataSource;

    public DatabaseTestController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping("/database")
    public String testDatabaseConnection() {

        try (Connection connection = dataSource.getConnection()) {

            if (connection.isValid(2)) {
                return "PostgreSQL connection successful!";
            }

            return "PostgreSQL connection failed.";

        } catch (Exception e) {
            return "Database error: " + e.getMessage();
        }
    }
}