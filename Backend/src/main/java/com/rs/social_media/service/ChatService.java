package com.rs.social_media.service;

import com.rs.social_media.model.Chat;
import com.rs.social_media.model.User;

import java.util.List;

public interface ChatService {
    public Chat createChat(User reqUser, User user2);

    public Chat findChatById(Integer chatId) throws Exception;

    public List<Chat> findUsersChat(Integer userId);
}
