package com.neighborconnect.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {
    private UUID id;
    private String email;
    private String username;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private String neighborhood;
    private String city;
    private String state;
    private String country;
    private String postalCode;
    private String phone;
    private Boolean verified;
    private Integer reputation;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    private Boolean isActive;
}