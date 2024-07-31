package com.rs.social_media.service;

import com.rs.social_media.model.User;
import com.rs.social_media.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;





import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername (String username) throws UsernameNotFoundException {
     User user = userRepository.findByEmail(username);

     if(user ==null) {
         throw new UsernameNotFoundException("User not found with email " + username);
     }
     //neu nguoi dung duoc tim thay thi return ve UserDetails la object chua email, mat
     //khau va authorities: o day la roles (quyen cua nguoi dung)
        List<GrantedAuthority> authorities = new ArrayList<>();
     System.out.println("thuc hien ham nay truoc");
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(), authorities);
    }
}
