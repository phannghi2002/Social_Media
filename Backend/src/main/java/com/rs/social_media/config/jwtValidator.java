package com.rs.social_media.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class jwtValidator extends OncePerRequestFilter {


    //ham nay lay jwt tu Authorization trong Postman de lay email roi check trong CSDL
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = request.getHeader(JwtConstant.JWT_HEADER);
        if (jwt != null) {
            try {
                System.out.println("day la xac thuc "+jwt);
                String email = jwtProvider.getEmailFromJwtToken(jwt);

                List<GrantedAuthority> authorities = new ArrayList<>();

                //if email value is null then line code below will occur error
                Authentication authentication = new UsernamePasswordAuthenticationToken(email,null, authorities);
                System.out.println("dung ham nay nhe "+authentication);
                //luu no vao bao gom thong tin xac thuc, trong suot vong doi khi nguoi dung request thi ung dung se truy cap
                //trong nay va truy xuat thong tin cung nhu quyen cho tung nguoi dung de truy cap vao cac request khac nhau
                SecurityContextHolder.getContext().setAuthentication(authentication);


            } catch (Exception e) {
                throw new BadCredentialsException("Invalid token ...");
            }
        }
//tiep tuc chuoi bo loc, chuyen yeu cau va phan hoi den bo loc tiep theo
        filterChain.doFilter(request, response);
    }
}
