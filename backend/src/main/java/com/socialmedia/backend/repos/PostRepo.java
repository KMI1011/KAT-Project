package com.socialmedia.backend.repos;

import com.socialmedia.backend.models.Posts;
import com.socialmedia.backend.models.UserModels;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface PostRepo extends JpaRepository<Posts, Integer> {

    List<Posts> findAll();

    Optional<Posts> findById(int id);

}