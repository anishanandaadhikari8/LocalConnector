package com.neighborconnect.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostDto {
    private UUID id;
    private UUID connectorId;
    private String type; // announcement, alert, marketplace, lost-found, general
    private String title;
    private String content;
    private String imageUrl;
    private List<String> images;
    private UserDto author;
    private Integer likesCount;
    private Integer commentsCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isActive;
    private Boolean liked;
    
    // Marketplace specific fields
    private BigDecimal price;
    private String category;
    private String condition;
    private String status; // available, sold, reserved
    
    // Alert specific fields
    private String severity; // low, medium, high, critical
    private String alertType; // safety, emergency, warning
    
    // Lost & Found specific fields
    private String itemType;
    private String lastSeenLocation;
    private String contactInfo;
}