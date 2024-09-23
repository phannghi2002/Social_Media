package com.rs.social_media.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String chat_name;

    private String chat_image;

    @ManyToMany
    private List<User> users = new ArrayList<>();

    private LocalDateTime timestamp;

    //mappedBy nghia la thang chat la thang cha va thang message la thang con
    @OneToMany(mappedBy = "chat")
    private List<Message> messages = new ArrayList<>();
}
