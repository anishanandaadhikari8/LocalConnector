package com.neighborconnect.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ConnectorDto {
    private UUID id;
    private String name;
    private String description;
    private String type; // Apartment, Marketplace, Safety, Event, Roommate, Dating
    private String imageUrl;
    private UUID createdBy;
    private String address;
    private Integer geoRadius;
    private Boolean isPublic;
    private Boolean verifiedRequired;
    private Integer memberCount;
    private Integer postCount;
    private String rules;
    private Map<String, Object> settings;
    private List<String> modulesEnabled;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isActive;
    private UserDto creator;
    private Boolean isMember;
    private Boolean isAdmin;
}