package com.rs.social_media.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, Integer OTP, Date expirationTime){
        try {
            System.out.println("EMail send successfully 1");
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            System.out.println("EMail send successfully 2");
            helper.setFrom("phannghi2002nk@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject(subject);

            // Format the expiration time
            SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss dd-MM-yyyy");
            String formattedExpirationTime = dateFormat.format(expirationTime);

            // Set the HTML content with OTP and expiration time
            String htmlContent = "<p>OTP to reset password: <h2>" + OTP + "</h2></p>" +
                    "<p>Please use this OTP before: <strong>" + formattedExpirationTime + "</strong></p>";
            helper.setText(htmlContent, true); // true indicates HTML content

            System.out.println("EMail send successfully 3");
            mailSender.send(mimeMessage);
            System.out.println("EMail send successfully 4");
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
