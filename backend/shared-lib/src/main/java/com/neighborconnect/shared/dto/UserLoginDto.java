package com.neighborconnect.shared.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserLoginDto {
    
    @NotBlank(message = "Email or username is required")
    private String emailOrUsername;
    
    @NotBlank(message = "Password is required")
    private String password;
    
    private Boolean rememberMe = false;
}