package com.neighborconnect.userservice.controller;

import com.neighborconnect.shared.dto.ApiResponse;
import com.neighborconnect.shared.dto.UserDto;
import com.neighborconnect.shared.dto.UserLoginDto;
import com.neighborconnect.shared.dto.UserRegistrationDto;
import com.neighborconnect.userservice.dto.LoginResponseDto;
import com.neighborconnect.userservice.service.AuthService;
import com.neighborconnect.userservice.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "User Management", description = "APIs for user registration, authentication, and profile management")
public class UserController {
    
    private final UserService userService;
    private final AuthService authService;
    
    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<ApiResponse<UserDto>> registerUser(
            @Valid @RequestBody UserRegistrationDto registrationDto) {
        try {
            UserDto user = userService.registerUser(registrationDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(user, "User registered successfully. Please check your email to verify your account."));
        } catch (Exception e) {
            log.error("Registration failed: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Registration failed: " + e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    @Operation(summary = "User login")
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(
            @Valid @RequestBody UserLoginDto loginDto) {
        try {
            LoginResponseDto response = authService.login(loginDto);
            return ResponseEntity.ok(ApiResponse.success(response, "Login successful"));
        } catch (Exception e) {
            log.error("Login failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Login failed: " + e.getMessage()));
        }
    }
    
    @PostMapping("/logout")
    @Operation(summary = "User logout")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<Void>> logout(
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            authService.logout(userDetails.getUsername());
            return ResponseEntity.ok(ApiResponse.success(null, "Logged out successfully"));
        } catch (Exception e) {
            log.error("Logout failed: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Logout failed: " + e.getMessage()));
        }
    }
    
    @GetMapping("/profile")
    @Operation(summary = "Get current user profile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUserProfile(
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            UserDto user = userService.getUserByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return ResponseEntity.ok(ApiResponse.success(user));
        } catch (Exception e) {
            log.error("Failed to get user profile: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to get profile: " + e.getMessage()));
        }
    }
    
    @PutMapping("/profile")
    @Operation(summary = "Update user profile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UserDto updateDto) {
        try {
            UserDto currentUser = userService.getUserByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            UserDto updatedUser = userService.updateUser(currentUser.getId(), updateDto);
            return ResponseEntity.ok(ApiResponse.success(updatedUser, "Profile updated successfully"));
        } catch (Exception e) {
            log.error("Failed to update profile: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to update profile: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(
            @Parameter(description = "User ID") @PathVariable UUID id) {
        try {
            UserDto user = userService.getUserById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return ResponseEntity.ok(ApiResponse.success(user));
        } catch (Exception e) {
            log.error("Failed to get user by ID: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search users")
    public ResponseEntity<ApiResponse<Page<UserDto>>> searchUsers(
            @Parameter(description = "Search query") @RequestParam String query,
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "20") int size) {
        try {
            Page<UserDto> users = userService.searchUsers(query, page, size);
            return ResponseEntity.ok(ApiResponse.success(users));
        } catch (Exception e) {
            log.error("Search failed: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Search failed: " + e.getMessage()));
        }
    }
    
    @GetMapping("/neighborhood/{neighborhood}")
    @Operation(summary = "Get users by neighborhood")
    public ResponseEntity<ApiResponse<List<UserDto>>> getUsersByNeighborhood(
            @Parameter(description = "Neighborhood name") @PathVariable String neighborhood) {
        try {
            List<UserDto> users = userService.getUsersByNeighborhood(neighborhood);
            return ResponseEntity.ok(ApiResponse.success(users));
        } catch (Exception e) {
            log.error("Failed to get users by neighborhood: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to get users: " + e.getMessage()));
        }
    }
    
    @GetMapping("/verify-email")
    @Operation(summary = "Verify email address")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(
            @Parameter(description = "Verification token") @RequestParam String token) {
        try {
            boolean verified = userService.verifyEmail(token);
            if (verified) {
                return ResponseEntity.ok(ApiResponse.success(null, "Email verified successfully"));
            } else {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Invalid or expired verification token"));
            }
        } catch (Exception e) {
            log.error("Email verification failed: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Email verification failed: " + e.getMessage()));
        }
    }
    
    @PostMapping("/{id}/verify")
    @Operation(summary = "Mark user as verified (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> markUserAsVerified(
            @Parameter(description = "User ID") @PathVariable UUID id) {
        try {
            userService.markUserAsVerified(id);
            return ResponseEntity.ok(ApiResponse.success(null, "User marked as verified"));
        } catch (Exception e) {
            log.error("Failed to verify user: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to verify user: " + e.getMessage()));
        }
    }
    
    @PostMapping("/{id}/reputation")
    @Operation(summary = "Update user reputation")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> updateReputation(
            @Parameter(description = "User ID") @PathVariable UUID id,
            @Parameter(description = "Reputation change") @RequestParam int change) {
        try {
            userService.updateReputation(id, change);
            return ResponseEntity.ok(ApiResponse.success(null, "Reputation updated"));
        } catch (Exception e) {
            log.error("Failed to update reputation: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to update reputation: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}/deactivate")
    @Operation(summary = "Deactivate user account (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deactivateUser(
            @Parameter(description = "User ID") @PathVariable UUID id) {
        try {
            userService.deactivateUser(id);
            return ResponseEntity.ok(ApiResponse.success(null, "User account deactivated"));
        } catch (Exception e) {
            log.error("Failed to deactivate user: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to deactivate user: " + e.getMessage()));
        }
    }
    
    @PostMapping("/{id}/reactivate")
    @Operation(summary = "Reactivate user account (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> reactivateUser(
            @Parameter(description = "User ID") @PathVariable UUID id) {
        try {
            userService.reactivateUser(id);
            return ResponseEntity.ok(ApiResponse.success(null, "User account reactivated"));
        } catch (Exception e) {
            log.error("Failed to reactivate user: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to reactivate user: " + e.getMessage()));
        }
    }
    
    @GetMapping("/stats")
    @Operation(summary = "Get user statistics (Admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Object>> getUserStats() {
        try {
            long totalUsers = userService.getTotalUsersCount();
            long verifiedUsers = userService.getVerifiedUsersCount();
            long newUsersLastMonth = userService.getNewUsersLastMonthCount();
            
            var stats = new Object() {
                public final long total = totalUsers;
                public final long verified = verifiedUsers;
                public final long newLastMonth = newUsersLastMonth;
                public final double verificationRate = totalUsers > 0 ? (double) verifiedUsers / totalUsers * 100 : 0;
            };
            
            return ResponseEntity.ok(ApiResponse.success(stats));
        } catch (Exception e) {
            log.error("Failed to get user stats: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to get stats: " + e.getMessage()));
        }
    }
}