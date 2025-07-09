package com.neighborconnect.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreateConnectorDto {
    
    @NotBlank(message = "Connector name is required")
    @Size(max = 200, message = "Name cannot exceed 200 characters")
    private String name;
    
    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;
    
    @NotBlank(message = "Connector type is required")
    private String type; // Apartment, Marketplace, Safety, Event, Roommate, Dating
    
    private String imageUrl;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    @NotNull(message = "Geo radius is required")
    private Integer geoRadius; // in meters
    
    private Boolean isPublic = true;
    private Boolean verifiedRequired = false;
    
    @Size(max = 2000, message = "Rules cannot exceed 2000 characters")
    private String rules;
    
    private List<String> modulesEnabled; // posts, chat, bills, events, marketplace, safety, directory, roommate, dating
}