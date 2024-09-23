package com.rs.social_media.service;

import com.rs.social_media.model.Post;
import com.rs.social_media.model.User;
import com.rs.social_media.repository.PostRepository;

import com.rs.social_media.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImplementation implements PostService {
    @Autowired
    PostRepository postRepository;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Override
    public Post createNewPost(Post post, Integer userId) throws Exception {
        User user = userService.findUserById(userId);

        Post newPost = new Post();
        newPost.setCaption(post.getCaption());
        newPost.setImage(post.getImage());
        newPost.setCreatAt(LocalDateTime.now());
        newPost.setVideo(post.getVideo());
        newPost.setUser(user);

        return postRepository.save(newPost);
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws Exception{
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(post.getUser().getId()!=user.getId()){
            throw new Exception("you can't delete another users post");
        }
        postRepository.delete(post);
        return "post deleted successfully";
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) {

        return postRepository.findPostByUserId(userId);
    }

    @Override
    public Post findPostById(Integer postId) throws Exception{

        Optional<Post> otp = postRepository.findById(postId);

        if (otp.isEmpty()){
           throw new Exception("Post not found with id " + postId);
       }
       //chu y: chi co Repository moi co phuong thuc get thoi va ko the dung phuong thuc get neu no tra ve mot danh sach(List) ma chi dung khi no tra ve 1 phan tu
        return otp.get();
    }

    @Override
    public List<Post> findAllPost() {
        return postRepository.findAll();
    }

    @Override
    public Post savedPost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(user.getSavePost().contains(post)){
            user.getSavePost().remove(post);
        } else user.getSavePost().add(post);
        userRepository.save(user);
        return post;
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws Exception{
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(post.getLiked().contains(user)){
            post.getLiked().remove(user);
        } else {
            post.getLiked().add(user);
        }

        return postRepository.save(post);

    }
}
