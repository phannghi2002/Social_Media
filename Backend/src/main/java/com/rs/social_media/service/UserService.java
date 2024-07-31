package com.rs.social_media.service;

import com.rs.social_media.exceptions.UserExceptions;
import com.rs.social_media.model.User;

import java.util.List;

public interface UserService {
    public User registerUser(User user);

    public User findUserById(Integer userId) throws UserExceptions;

    public User findUserByEmail(String email);

    public User followUser(Integer userId1, Integer userId2) throws UserExceptions;

    public User updateUser(User user, Integer userId) throws UserExceptions;

    public List<User> searchUser(String query);

    public User findUserByJwt(String jwt);
}
