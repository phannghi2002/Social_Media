package com.rs.social_media.request;


import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateChatRequest {
    private Integer userId;
}
