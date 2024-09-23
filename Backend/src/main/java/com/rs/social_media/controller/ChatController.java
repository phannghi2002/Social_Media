package com.rs.social_media.controller;

import com.rs.social_media.model.Chat;
import com.rs.social_media.model.User;
import com.rs.social_media.request.CreateChatRequest;
import com.rs.social_media.service.ChatService;
import com.rs.social_media.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatController {
    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/chats")
    public Chat createChat(@RequestHeader("Authorization") String jwt,@RequestBody CreateChatRequest req) throws Exception {
        System.out.print("Deo chay that nhi 1");
        User reqUser = userService.findUserByJwt(jwt);
        User user2 = userService.findUserById(req.getUserId());
        Chat chat = chatService.createChat(reqUser, user2);
        System.out.print("Deo chay that nhi 2");
        return chat;
    }


    @GetMapping("/api/chats")
    public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt){
        User user = userService.findUserByJwt(jwt);

        List<Chat> chats = chatService.findUsersChat(user.getId());
        return chats;
    }
}
