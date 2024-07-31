package com.rs.social_media.repository;

import com.rs.social_media.model.Reels;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReelsRepository extends JpaRepository<Reels, Integer> {
    public List<Reels> findByUserId(Integer userId);

}
