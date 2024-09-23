package com.rs.social_media.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String content;
    private String image;

    @ManyToOne
    private User user;

    @JsonIgnore
    @ManyToOne
    private Chat chat;

    private LocalDateTime timestamp;

}
