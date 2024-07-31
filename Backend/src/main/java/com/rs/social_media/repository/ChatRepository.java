package com.rs.social_media.repository;

import com.rs.social_media.model.Chat;
import com.rs.social_media.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
    //findByUsersId no la dua tren ten ta da trong thuc the Chat : private List<User> users = new ArrayList<>();
    //cong voi ten viet theo kieu Capitalization + ten cac truong trong User.
    public List<Chat> findByUsersId(Integer userId);

    //kiem tra trong Chat co chua filed users chua ca user va reqUser
    @Query("select c from Chat c Where :user Member of c.users And :reqUser Member of c.users")
    public Chat findChatByUsersID(@Param("user") User user, @Param("reqUser") User reqUser);
}
