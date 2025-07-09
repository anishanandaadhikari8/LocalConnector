package com.neighborconnect.userservice.service;

import com.neighborconnect.shared.dto.UserDto;
import com.neighborconnect.shared.dto.UserRegistrationDto;
import com.neighborconnect.userservice.model.User;
import com.neighborconnect.userservice.repository.UserRepository;
import com.neighborconnect.userservice.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    
    public UserDto registerUser(UserRegistrationDto registrationDto) {
        log.info("Registering new user with email: {}", registrationDto.getEmail());
        
        // Validate email uniqueness
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        // Validate username uniqueness
        if (userRepository.existsByUsername(registrationDto.getUsername())) {
            throw new RuntimeException("Username already taken");
        }
        
        // Create user entity
        User user = new User();
        user.setEmail(registrationDto.getEmail());
        user.setUsername(registrationDto.getUsername());
        user.setPasswordHash(passwordEncoder.encode(registrationDto.getPassword()));
        user.setFirstName(registrationDto.getFirstName());
        user.setLastName(registrationDto.getLastName());
        user.setNeighborhood(registrationDto.getNeighborhood());
        user.setCity(registrationDto.getCity());
        user.setState(registrationDto.getState());
        user.setCountry(registrationDto.getCountry());
        user.setPostalCode(registrationDto.getPostalCode());
        user.setPhone(registrationDto.getPhone());
        
        // Generate verification token
        user.setVerificationToken(UUID.randomUUID().toString());
        
        User savedUser = userRepository.save(user);
        
        // Send verification email
        try {
            emailService.sendVerificationEmail(savedUser.getEmail(), savedUser.getVerificationToken());
        } catch (Exception e) {
            log.error("Failed to send verification email: {}", e.getMessage());
        }
        
        log.info("User registered successfully with ID: {}", savedUser.getId());
        return UserMapper.toDto(savedUser);
    }
    
    @Transactional(readOnly = true)
    public Optional<UserDto> getUserById(UUID id) {
        return userRepository.findById(id)
                .map(UserMapper::toDto);
    }
    
    @Transactional(readOnly = true)
    public Optional<UserDto> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(UserMapper::toDto);
    }
    
    @Transactional(readOnly = true)
    public Optional<UserDto> getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(UserMapper::toDto);
    }
    
    @Transactional(readOnly = true)
    public Optional<User> findUserByEmailOrUsername(String emailOrUsername) {
        return userRepository.findByEmailOrUsername(emailOrUsername, emailOrUsername);
    }
    
    public UserDto updateUser(UUID userId, UserDto updateDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Update fields if provided
        if (updateDto.getFirstName() != null) {
            user.setFirstName(updateDto.getFirstName());
        }
        if (updateDto.getLastName() != null) {
            user.setLastName(updateDto.getLastName());
        }
        if (updateDto.getNeighborhood() != null) {
            user.setNeighborhood(updateDto.getNeighborhood());
        }
        if (updateDto.getCity() != null) {
            user.setCity(updateDto.getCity());
        }
        if (updateDto.getState() != null) {
            user.setState(updateDto.getState());
        }
        if (updateDto.getCountry() != null) {
            user.setCountry(updateDto.getCountry());
        }
        if (updateDto.getPostalCode() != null) {
            user.setPostalCode(updateDto.getPostalCode());
        }
        if (updateDto.getPhone() != null) {
            user.setPhone(updateDto.getPhone());
        }
        if (updateDto.getAvatarUrl() != null) {
            user.setAvatarUrl(updateDto.getAvatarUrl());
        }
        
        User updatedUser = userRepository.save(user);
        log.info("User updated successfully: {}", updatedUser.getId());
        
        return UserMapper.toDto(updatedUser);
    }
    
    public void updateLastLogin(UUID userId) {
        userRepository.findById(userId).ifPresent(user -> {
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
        });
    }
    
    public boolean verifyEmail(String token) {
        Optional<User> userOpt = userRepository.findByVerificationToken(token);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setEmailVerified(true);
            user.setVerificationToken(null);
            userRepository.save(user);
            log.info("Email verified for user: {}", user.getEmail());
            return true;
        }
        return false;
    }
    
    @Transactional(readOnly = true)
    public Page<UserDto> searchUsers(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("username"));
        Page<User> users = userRepository.searchUsers(query, pageable);
        return users.map(UserMapper::toDto);
    }
    
    @Transactional(readOnly = true)
    public List<UserDto> getUsersByNeighborhood(String neighborhood) {
        return userRepository.findByNeighborhood(neighborhood)
                .stream()
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public Page<UserDto> getUsersByCity(String city, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("username"));
        Page<User> users = userRepository.findByCity(city, pageable);
        return users.map(UserMapper::toDto);
    }
    
    public void markUserAsVerified(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerified(true);
        userRepository.save(user);
        log.info("User marked as verified: {}", userId);
    }
    
    public void updateReputation(UUID userId, int reputationChange) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setReputation(Math.max(0, user.getReputation() + reputationChange));
        userRepository.save(user);
        log.info("Reputation updated for user {}: {}", userId, user.getReputation());
    }
    
    public void deactivateUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsActive(false);
        userRepository.save(user);
        log.info("User deactivated: {}", userId);
    }
    
    public void reactivateUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsActive(true);
        userRepository.save(user);
        log.info("User reactivated: {}", userId);
    }
    
    @Transactional(readOnly = true)
    public long getTotalUsersCount() {
        return userRepository.count();
    }
    
    @Transactional(readOnly = true)
    public long getVerifiedUsersCount() {
        return userRepository.countVerifiedUsers();
    }
    
    @Transactional(readOnly = true)
    public long getNewUsersLastMonthCount() {
        return userRepository.countNewUsersLastMonth();
    }
}