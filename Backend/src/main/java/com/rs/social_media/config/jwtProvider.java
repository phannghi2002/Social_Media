package com.rs.social_media.config;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import javax.crypto.SecretKey;
import java.util.Date;

import static io.jsonwebtoken.Jwts.*;

public class jwtProvider {
    //khong chi dinh khoa thuoc dang nao nen no phu thuoc vao do dai cua SECRET_KEY
    private static final SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    //phai co email de tao jwt, tuy bai toan nhung ta nen chon truong nao do nguoi dung nhap vao va la gia tri duy nhat de luu trong phan body
    public static String generateToken(Authentication auth) {
        String jwt = Jwts.builder().setIssuer("Code with Phan Nghi").setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + 86400000))
                .claim("email",auth.getName() )
                .signWith(key).compact();

        return jwt;
    }
//co the truyen moi email vao cung duoc ko nhat thiet phai truyen auth chua ca email va password


    //muon tim duoc email thi don gian la o ham generateToken ta da luu email o trong phan payload,
    //chi can truyen jwt de lay noi dung trong phan payload thoi
    public static String getEmailFromJwtToken(String jwt) {
        //Bearer token
        System.out.println(jwt);
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }

        // link check payload and header: https://jwt.io/
        Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        JwsHeader claims2 = parser().setSigningKey(key).build().parseClaimsJws(jwt).getHeader();

        System.out.printf("Header: %s, Claims: %s%n", claims2, claims);

        String email = String.valueOf(claims.get("email"));

        //not exist email then return value is null
        return email;

    }
}
