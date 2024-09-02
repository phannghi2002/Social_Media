package com.rs.social_media.controller;

import com.rs.social_media.config.jwtProvider;
import com.rs.social_media.model.User;
import com.rs.social_media.repository.UserRepository;
import com.rs.social_media.request.LoginRequest;
import com.rs.social_media.response.AuthResponse;
import com.rs.social_media.service.CustomerUserDetailsService;
import com.rs.social_media.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerUserDetailsService customerUserDetails;

    // /auth/signup
    @PostMapping("/signup")
    public AuthResponse createUser(@RequestBody User user) throws Exception {
        User isExist = userRepository.findByEmail(user.getEmail());

        if (isExist != null) {
            throw new Exception("This email already used with another account");
        }

        User newUser = new User();

        newUser.setEmail(user.getEmail());
        newUser.setFirstName((user.getFirstName()));
        newUser.setLastName(user.getLastName());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setGender(user.getGender());

        User savedUser = userRepository.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());

        String token = jwtProvider.generateToken(authentication);

//        String token = jwtProvider.generateToken(savedUser.getEmail());

        AuthResponse res = new AuthResponse(token, "Register Success");

        return res;
    }

    // /auth/signin
    @PostMapping("/signin")
    public AuthResponse signin(@RequestBody LoginRequest loginRequest) {
       Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());
       System.out.print("gia tri authentication"+ authentication);
//        String token = jwtProvider.generateToken(authentication.getName());
        String token = jwtProvider.generateToken(authentication);
        AuthResponse res = new AuthResponse(token, "Login Success");

        return res;
    }



    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customerUserDetails.loadUserByUsername(email);
        System.out.println("in userDetails " + userDetails);
        System.out.println("in userDetails " + userDetails.getPassword());
        System.out.println("ten nguoi dung" + userDetails.getUsername());
        System.out.println("ten mat khau ne" + userDetails.getPassword());

        System.out.println("E cu");
        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }


       // matches(CharSequence rawPassword, String encodedPassword)
       // Verify the encoded password obtained from storage matches the submitted raw password after it too is encoded. Ta co password la mat khau nguoi dung nhap
        //khi dang nhap, con userDetails.getPassword() la mat khau da duoc ma hoa trong csdl.No se ma hoa password sau do doi chieu voi mk da ma hoa.
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Password not matched");
        }

        //userDetails contain username, password and value null is set password is null
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
