package com.rs.social_media.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String gender;

    @ElementCollection// khi trong nay la ta muon tao mot bang rieng chua nhieu nguoi thi dung den no
    private List<Integer> followers = new ArrayList<>();
    @ElementCollection
    private List<Integer> followings = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    private List<Post> savePost = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    private ForgotPassword forgotPassword;



}
