package com.rs.social_media.controller;

import com.rs.social_media.model.ForgotPassword;
import com.rs.social_media.model.User;
import com.rs.social_media.repository.ForgotPasswordRepository;
import com.rs.social_media.repository.UserRepository;
import com.rs.social_media.service.EmailSenderService;
import com.rs.social_media.utils.ChangePassword;
import com.rs.social_media.utils.CreateOTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;

@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;
    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/verifyMail/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email) {
        System.out.println("khong chay vao luon" + email);
        CreateOTP createOTP = new CreateOTP();
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("Not found email " + email);
        }

        // Retrieve the ForgotPassword entry if it exists, or create a new one
        ForgotPassword fp = forgotPasswordRepository.findByUser(user)
                .orElseGet(() -> {
                    ForgotPassword newFP = new ForgotPassword();
                    newFP.setUser(user);
                    return newFP;
                });

        // Set OTP and expiration time
        fp.setOTP(createOTP.generateOTP());
        fp.setExpirationTime(new Date(System.currentTimeMillis() + 3 * 60 * 1000));

        // Save the ForgotPassword record
        forgotPasswordRepository.save(fp);

        // Simplified logging to avoid potential issues
        System.out.println("USEr Forgot: " + user.getEmail() + ", OTP: " + fp.getOTP());


        emailSenderService.sendEmail(email, "Verify OTP", fp.getOTP(), fp.getExpirationTime());
        return ResponseEntity.ok("Email send for verification");
    }

    @PostMapping("/verifyOTP/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("Not found email " + email);
        }

        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user).orElseThrow(() -> new RuntimeException("Invalid OTP for email: " + email));

        if (fp.getExpirationTime().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(fp.getFpid());
            return new ResponseEntity<>("OTP has expired!", HttpStatus.EXPECTATION_FAILED);
        }
        return ResponseEntity.ok("OTP verified!");
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ChangePassword changePassword,
                                                        @PathVariable String email) {
        if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
            return new ResponseEntity<>("Please enter password again!", HttpStatus.EXPECTATION_FAILED);
        }

        String encodedPassword = passwordEncoder.encode(changePassword.password());
        userRepository.updatePassword(email, encodedPassword);

        return ResponseEntity.ok("Password has been changed!");
    }
}
