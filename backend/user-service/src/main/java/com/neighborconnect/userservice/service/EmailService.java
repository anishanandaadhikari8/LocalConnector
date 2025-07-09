package com.neighborconnect.userservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    
    private final JavaMailSender mailSender;
    
    @Value("${app.base-url:http://localhost:8081}")
    private String baseUrl;
    
    @Value("${spring.mail.username:noreply@neighborconnect.com}")
    private String fromEmail;
    
    @Async
    public void sendVerificationEmail(String toEmail, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Verify your NeighborConnect account");
            
            String verificationUrl = baseUrl + "/api/v1/users/verify-email?token=" + token;
            
            String emailContent = """
                Welcome to NeighborConnect!
                
                Thank you for joining our community platform. To complete your registration, 
                please verify your email address by clicking the link below:
                
                %s
                
                This link will expire in 24 hours.
                
                If you didn't create an account with NeighborConnect, please ignore this email.
                
                Best regards,
                The NeighborConnect Team
                """.formatted(verificationUrl);
            
            message.setText(emailContent);
            
            mailSender.send(message);
            log.info("Verification email sent to: {}", toEmail);
            
        } catch (Exception e) {
            log.error("Failed to send verification email to {}: {}", toEmail, e.getMessage());
            throw new RuntimeException("Failed to send verification email", e);
        }
    }
    
    @Async
    public void sendPasswordResetEmail(String toEmail, String token) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Reset your NeighborConnect password");
            
            String resetUrl = baseUrl + "/api/v1/users/reset-password?token=" + token;
            
            String emailContent = """
                Password Reset Request
                
                We received a request to reset your NeighborConnect password. 
                If you made this request, click the link below to reset your password:
                
                %s
                
                This link will expire in 1 hour.
                
                If you didn't request a password reset, please ignore this email. 
                Your password will remain unchanged.
                
                Best regards,
                The NeighborConnect Team
                """.formatted(resetUrl);
            
            message.setText(emailContent);
            
            mailSender.send(message);
            log.info("Password reset email sent to: {}", toEmail);
            
        } catch (Exception e) {
            log.error("Failed to send password reset email to {}: {}", toEmail, e.getMessage());
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }
    
    @Async
    public void sendWelcomeEmail(String toEmail, String firstName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Welcome to NeighborConnect!");
            
            String emailContent = """
                Hello %s,
                
                Welcome to NeighborConnect! We're excited to have you join our community.
                
                With NeighborConnect, you can:
                • Connect with neighbors in your area
                • Join community groups and events
                • Share updates and announcements
                • Buy, sell, and trade with trusted neighbors
                • Stay informed about local safety alerts
                • Organize events and activities
                
                Get started by:
                1. Completing your profile
                2. Joining your neighborhood connector
                3. Introducing yourself to the community
                
                If you have any questions, don't hesitate to reach out to our support team.
                
                Happy connecting!
                The NeighborConnect Team
                """.formatted(firstName);
            
            message.setText(emailContent);
            
            mailSender.send(message);
            log.info("Welcome email sent to: {}", toEmail);
            
        } catch (Exception e) {
            log.error("Failed to send welcome email to {}: {}", toEmail, e.getMessage());
        }
    }
    
    @Async
    public void sendNotificationEmail(String toEmail, String subject, String content) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(content);
            
            mailSender.send(message);
            log.info("Notification email sent to: {} with subject: {}", toEmail, subject);
            
        } catch (Exception e) {
            log.error("Failed to send notification email to {}: {}", toEmail, e.getMessage());
        }
    }
}