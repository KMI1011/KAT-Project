package com.socialmedia.backend.services;

import com.socialmedia.backend.models.Posts;
import com.socialmedia.backend.models.UserModels;
import com.socialmedia.backend.repos.PostRepo;
import com.socialmedia.backend.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    public Posts savePost(Posts post){
        return postRepo.save(post);
    }

    public List<Posts> getAllPosts(){
        return postRepo.findAll();
    }

    public Optional<Posts> getPostById(int id){
        return postRepo.findById(id);
    }
}
