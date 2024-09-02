package com.rs.social_media.repository;

import com.rs.social_media.model.ForgotPassword;
import com.rs.social_media.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Integer> {
    Optional<ForgotPassword> findByUser(User user);

    @Query("select fp from ForgotPassword fp where fp.OTP =?1 and fp.user = ?2")
    Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);
}
