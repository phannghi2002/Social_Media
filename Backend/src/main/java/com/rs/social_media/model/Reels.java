package com.rs.social_media.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
// chu y @Data chi chua @RequiredArgsConstructor(la constructor chua truong la final (truong final la truong
// chi duoc gan gia tri mot lan va khong the thay doi, no chua tat ca cac tham so la final chu khong chua tung
// constructor chua tham so rieng le) va khong duoc chua gia tri null)
// chu khong chua annotation @NoArgsConstructor va @AllArgsConstructor
// Tom lai @Data chua @Getter, @Setter, @ToString, @EqualsAndHashCode, and @RequiredArgsConstructor

public class Reels {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String title;
    private String video;

    @ManyToOne
    private User user;

}
