package com.socialmedia.backend.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="posts")
public class Posts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int post_id;

    // Foreign key referencing user.id
    @Column(name = "id", nullable = false)
    private int user_id;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private LocalDateTime created;

    @Column
    private byte[] image;

    public Posts() {
    }

    public Posts(int user_id, String content, byte[] image) {
        this.user_id = user_id;
        this.content = content;
        this.image = image;
    }


    public int getPost_Id() {
        return post_id;
    }

    public void setPost_Id(int post_id) {
        this.post_id = post_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}