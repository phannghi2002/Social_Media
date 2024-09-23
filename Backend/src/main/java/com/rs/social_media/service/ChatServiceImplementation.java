package com.rs.social_media.service;

import com.rs.social_media.model.Chat;
import com.rs.social_media.model.User;
import com.rs.social_media.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImplementation implements ChatService{

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public Chat createChat(User reqUser, User user2) {
        Chat isExist = chatRepository.findChatByUsersID(user2, reqUser);


        if(isExist!=null){
            System.out.print("cuoc hoi thoai nay da ton tai");
            return isExist;
        }

        Chat chat = new Chat();
        chat.getUsers().add(user2);
        chat.getUsers().add(reqUser);
//        chat.setChat_name("cuc cut");
//        chat.setChat_image(chat.getChat_image());
        chat.setTimestamp(LocalDateTime.now());


        return chatRepository.save(chat);
    }

//    @Override
//    public Chat createChat(User reqUser, User user2, Chat req) {
//        Chat isExist = chatRepository.findChatByUsersID(user2, reqUser);
//
//        Chat chat = new Chat();
//        chat.getUsers().add(user2);
//        chat.getUsers().add(reqUser);
//        chat.setChat_name(req.getChat_name());
//        chat.setChat_image(req.getChat_image());
//        chat.setTimestamp(LocalDateTime.now());
//
//        if(isExist!=null){
//            return isExist;
//        }
//
//
//        return chatRepository.save(chat);
//    }

    @Override
    public Chat findChatById(Integer chatId) throws Exception {
        Optional<Chat> opt = chatRepository.findById(chatId);

        if(opt.isEmpty()){
            throw new Exception("chat not found with id - " + chatId);
        }
        return opt.get();
    }

    @Override
    public List<Chat> findUsersChat(Integer userId) {
        return chatRepository.findByUsersId(userId);
    }
}
