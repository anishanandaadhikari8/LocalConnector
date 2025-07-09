package com.neighborconnect.userservice.service;

import com.neighborconnect.shared.dto.UserLoginDto;
import com.neighborconnect.shared.util.JwtUtil;
import com.neighborconnect.userservice.dto.LoginResponseDto;
import com.neighborconnect.userservice.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {
    
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    public LoginResponseDto login(UserLoginDto loginDto) {
        log.info("Login attempt for: {}", loginDto.getEmailOrUsername());
        
        // Find user by email or username
        Optional<User> userOptional = userService.findUserByEmailOrUsername(loginDto.getEmailOrUsername());
        
        if (userOptional.isEmpty()) {
            log.warn("Login failed - user not found: {}", loginDto.getEmailOrUsername());
            throw new RuntimeException("Invalid credentials");
        }
        
        User user = userOptional.get();
        
        // Check if user is active
        if (!user.getIsActive()) {
            log.warn("Login failed - user account is deactivated: {}", user.getEmail());
            throw new RuntimeException("Account is deactivated");
        }
        
        // Verify password
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPasswordHash())) {
            log.warn("Login failed - invalid password for user: {}", user.getEmail());
            throw new RuntimeException("Invalid credentials");
        }
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUsername(), user.getId(), "USER");
        
        // Update last login time
        userService.updateLastLogin(user.getId());
        
        log.info("User logged in successfully: {}", user.getEmail());
        
        return LoginResponseDto.builder()
                .token(token)
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .verified(user.getVerified())
                .emailVerified(user.getEmailVerified())
                .build();
    }
    
    public boolean validateToken(String token) {
        try {
            return jwtUtil.isTokenValid(token);
        } catch (Exception e) {
            log.error("Token validation failed: {}", e.getMessage());
            return false;
        }
    }
    
    public String extractUsernameFromToken(String token) {
        try {
            return jwtUtil.extractUsername(token);
        } catch (Exception e) {
            log.error("Failed to extract username from token: {}", e.getMessage());
            throw new RuntimeException("Invalid token");
        }
    }
    
    public boolean refreshToken(String oldToken) {
        try {
            String username = jwtUtil.extractUsername(oldToken);
            Optional<User> userOptional = userService.findUserByEmailOrUsername(username);
            
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                if (user.getIsActive()) {
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            log.error("Token refresh failed: {}", e.getMessage());
            return false;
        }
    }
    
    public void logout(String username) {
        log.info("User logged out: {}", username);
        // In a production environment, you might want to:
        // 1. Add the token to a blacklist stored in Redis
        // 2. Clear any cached user sessions
        // 3. Log the logout event for auditing
    }
}