package com.rs.social_media.service;

import com.rs.social_media.model.Story;
import com.rs.social_media.model.User;

import java.util.List;

public interface StoryService {
    public Story createStory (Story story, User user);

    public List<Story> findStoryByUserId(Integer userId) throws Exception;


}
