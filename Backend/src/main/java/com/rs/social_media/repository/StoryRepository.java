package com.rs.social_media.repository;

import com.rs.social_media.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Integer> {
    public List<Story> findByUserId(Integer userId);


}
