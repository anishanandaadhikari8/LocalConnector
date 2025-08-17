package com.neighborconnect.userservice.mapper;

import com.neighborconnect.shared.dto.UserDto;
import com.neighborconnect.userservice.model.User;

public class UserMapper {
    
    public static UserDto toDto(User user) {
        if (user == null) {
            return null;
        }
        
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setNeighborhood(user.getNeighborhood());
        dto.setCity(user.getCity());
        dto.setState(user.getState());
        dto.setCountry(user.getCountry());
        dto.setPostalCode(user.getPostalCode());
        dto.setPhone(user.getPhone());
        dto.setVerified(user.getVerified());
        dto.setReputation(user.getReputation());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setLastLogin(user.getLastLogin());
        dto.setIsActive(user.getIsActive());
        
        return dto;
    }
    
    public static User toEntity(UserDto dto) {
        if (dto == null) {
            return null;
        }
        
        User user = new User();
        user.setId(dto.getId());
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setAvatarUrl(dto.getAvatarUrl());
        user.setNeighborhood(dto.getNeighborhood());
        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setCountry(dto.getCountry());
        user.setPostalCode(dto.getPostalCode());
        user.setPhone(dto.getPhone());
        user.setVerified(dto.getVerified());
        user.setReputation(dto.getReputation());
        user.setLastLogin(dto.getLastLogin());
        user.setIsActive(dto.getIsActive());
        
        return user;
    }
    
    // Partial update - only updates non-null fields
    public static void updateEntityFromDto(User entity, UserDto dto) {
        // Guard against null values to prevent NullPointerException
        // when either the target entity or the source DTO is missing
        if (entity == null || dto == null) {
            return;
        }
        
        if (dto.getFirstName() != null) {
            entity.setFirstName(dto.getFirstName());
        }
        if (dto.getLastName() != null) {
            entity.setLastName(dto.getLastName());
        }
        if (dto.getAvatarUrl() != null) {
            entity.setAvatarUrl(dto.getAvatarUrl());
        }
        if (dto.getNeighborhood() != null) {
            entity.setNeighborhood(dto.getNeighborhood());
        }
        if (dto.getCity() != null) {
            entity.setCity(dto.getCity());
        }
        if (dto.getState() != null) {
            entity.setState(dto.getState());
        }
        if (dto.getCountry() != null) {
            entity.setCountry(dto.getCountry());
        }
        if (dto.getPostalCode() != null) {
            entity.setPostalCode(dto.getPostalCode());
        }
        if (dto.getPhone() != null) {
            entity.setPhone(dto.getPhone());
        }
    }
}