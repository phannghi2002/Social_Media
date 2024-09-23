package com.rs.social_media.exceptions;

import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetails {
    private String message;
    private String error;
    private LocalDateTime timestamp;

}
