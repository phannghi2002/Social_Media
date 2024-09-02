package com.rs.social_media.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;


@Entity
@Data
public class ForgotPassword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fpid;

    @Column(nullable = false)
    private Integer OTP;

    @Column(nullable = false)
    private Date expirationTime;


    @OneToOne
    @JsonIgnore // Prevents infinite loop during serialization
    private User user;
}
