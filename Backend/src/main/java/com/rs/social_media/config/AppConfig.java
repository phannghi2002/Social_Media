package com.rs.social_media.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;


@Configuration
@EnableWebSecurity
public class AppConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        //chu y neu duong dan ko can phai xac thuc thi no van phai duoc thuc thi trong bo loc jwtValidator
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(Authorize -> Authorize.requestMatchers("/api/**")
                        .authenticated().anyRequest().permitAll())
                //dung BasicAuthenticationFilter nen dung UserDetailService va UserDetails de xac thuc JWT
                .addFilterBefore(new jwtValidator(), BasicAuthenticationFilter.class)
                .csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(corsConfigurationSource()));


        return http.build();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg = new CorsConfiguration();
                //duong dan nay duoc phep gui yeu cau den server, la duong dan ben frontend
                cfg.setAllowedOrigins(Arrays.asList(
                        "http://localhost:5173/"
                ));
                //cho phep gui yeu cau bang cac phuong thuc nhu get, post, delete, put, ...
                cfg.setAllowedMethods(Collections.singletonList("*"));
                //cho phep xac thuc thong tin cookies, authorization headers
                cfg.setAllowCredentials(true);
                //cho phep Authorization va Origin ...
                cfg.setAllowedHeaders(Collections.singletonList("*"));
                //cho phep Authorization thi an toan va duoc phep hien thi tren trinh duyet
                cfg.setExposedHeaders(Arrays.asList(
                        "Authorization"
                ));
                //cho phep thoi gian yeu cau duoc luu vao bo nho dem: 3600s -> 1h
                cfg.setMaxAge(3600L);

                return cfg;
            }
        };
    }

    //Required to encode password, function below used for anywhere cannot import AppConfig in file AuthController
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
