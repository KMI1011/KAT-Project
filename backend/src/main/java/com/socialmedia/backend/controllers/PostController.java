package com.socialmedia.backend.controllers;

import com.socialmedia.backend.models.Posts;
import com.socialmedia.backend.repos.PostRepo;
import com.socialmedia.backend.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepo postRepo;

    private final String directory = "uploads";

    @PostMapping("/posts")
    public ResponseEntity<Posts> savePosts(@RequestBody Posts post) {
         System.out.println(">>> POST /api/posts reached controller <<<");
        Posts savePost = postService.savePost(post);
        return ResponseEntity.ok(savePost);
    }

    @PostMapping("/addPost")
    public ResponseEntity<String> addPost(@RequestParam("userId") int userId,
                                          @RequestParam("title") String title,
                                          @RequestParam("content") String content,
                                          @RequestParam("image") MultipartFile image) {
        // Check if all required fields are provided
        if (content == null || image.isEmpty()) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        // Create uploads directory if it doesn't exist
        File uploadsDir = new File(directory);
        if (!uploadsDir.exists()) {
            if (uploadsDir.mkdirs()) {
                System.out.println("Uploads directory created successfully");
            } else {
                return ResponseEntity.status(500).body("Failed to create uploads directory");
            }
        } else {
            System.out.println("Uploads directory already exists");
        }

        try {
            // Read the image file and encode it as a byte array
            byte[] imageBytes = image.getBytes();

            // Create a new post instance
            Posts newPost = new Posts();
            newPost.setUser_id(userId);
            newPost.setTitle(title);
            newPost.setContent(content);
            newPost.setCreated(LocalDateTime.now()); // Set current time
            newPost.setImage(imageBytes);

            // Save the post to the database
            postRepo.save(newPost);

            // Send a success response
            return ResponseEntity.status(201).body("Post created successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to add post");
        }
    }


    @GetMapping("/posts")
    public ResponseEntity<List<Posts>> getAllPosts(){
        List<Posts> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Optional<Posts>> getPostsById(@PathVariable("id") int id){
        Optional<Posts> userPosts = postService.getPostById(id);
        return ResponseEntity.ok(userPosts);
    }
}
