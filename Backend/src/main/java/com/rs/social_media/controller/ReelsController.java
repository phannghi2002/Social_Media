package com.rs.social_media.controller;

import com.rs.social_media.model.Reels;
import com.rs.social_media.model.User;
import com.rs.social_media.service.ReelsService;
import com.rs.social_media.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReelsController {
    @Autowired
    private ReelsService reelsService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/reels")
    public Reels createReels(@RequestBody Reels reel, @RequestHeader("Authorization") String jwt) {
        User reqUser = userService.findUserByJwt(jwt);
        Reels createReels = reelsService.createReel(reel, reqUser);

        return createReels;
    }

    @GetMapping("/api/reels")
    public List<Reels> findAllReels() {

        List<Reels> reels = reelsService.findAllReels();

        return reels;
    }

    @GetMapping("/api/reels/user/{userId}")
    public List<Reels> findUsersReels(@PathVariable("userId") Integer userId ) throws Exception{
        List<Reels> reels = reelsService.findUsersReel(userId);
        return reels;
    }
}
