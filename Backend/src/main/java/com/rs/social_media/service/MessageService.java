package com.rs.social_media.service;

import com.rs.social_media.model.Chat;
import com.rs.social_media.model.Message;
import com.rs.social_media.model.User;

import java.util.List;

public interface MessageService {
    public Message createMessage(User user, Integer chatId, Message  req) throws Exception;

    public List<Message> findChatsMessages(Integer chatId) throws Exception;


}
