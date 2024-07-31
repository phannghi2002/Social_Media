package com.rs.social_media.controller;

import com.rs.social_media.exceptions.UserExceptions;
import com.rs.social_media.model.User;
import com.rs.social_media.repository.UserRepository;
import com.rs.social_media.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @GetMapping("/api/users")
    public List<User> getUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

//    @GetMapping("/api/users/{userId}")
//    public User getUserById(@PathVariable("userId") Integer id) throws UserExceptions {
//        User user = userService.findUserById(id);
//        return user;
//    }

    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable("userId") Integer id) throws UserExceptions {
        User user = userService.findUserById(id);
        return user;
    }

    //method this same get information from jwt
//    @GetMapping("/api/usersDetail")
//    public User getUserById(@RequestHeader("Authorization") String jwt) throws UserExceptions {
//        User reqUser = userService.findUserByJwt(jwt);
//
//        return reqUser;
//    }



    @PutMapping("/api/users")
    public User updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User user) throws UserExceptions {
        User reqUser = userService.findUserByJwt(jwt);

        User updatedUser = userService.updateUser(user, reqUser.getId());

        return updatedUser;
    }

    @PutMapping("/api/users/follow/{userId2}")
    public User followUserHandler(@RequestHeader("Authorization") String jwt, @PathVariable Integer userId2) throws UserExceptions {

        User reqUser = userService.findUserByJwt(jwt);
        User user = userService.followUser(reqUser.getId(), userId2);
        return user;
    }

    @GetMapping("/api/users/search")
    public List<User> searchUser(@RequestParam("query9") String query4) {
        List<User> users = userService.searchUser(query4);

        return users;
    }

    @DeleteMapping("/api/users/{userId}")
    public String deleteUser(@PathVariable("userId") Integer userId) throws UserExceptions {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new UserExceptions("User not exit with id " + userId);
        }
        userRepository.delete(user.get());
        return "user deleted successfully " + userId;
    }

    @GetMapping("/api/users/profile")
    public User getUserFromToken(@RequestHeader("Authorization") String jwt) {

        User user = userService.findUserByJwt(jwt);
        //setPassword là null để tránh người dùng có thể xem được mk, đây chỉ xem
        //thôi nhé tại vì ta ko dung method save trong userRepository nên ko
        // password trong database bi chuyển thành null
        user.setPassword(null);


        return user;
    }
}
