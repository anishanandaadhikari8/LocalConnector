package com.localconnector.community.controller;

import com.localconnector.community.domain.Role;
import com.localconnector.community.service.JwtDevService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
  private final JwtDevService jwtDevService;

  public AuthController(JwtDevService jwtDevService) { this.jwtDevService = jwtDevService; }

  public record DevMintRequest(@NotNull Long userId, @NotBlank String name, @NotBlank String role, String unit) {}

  @PostMapping("/devMint")
  public ResponseEntity<?> devMint(@RequestBody DevMintRequest req) {
    Role r = Role.valueOf(req.role().toUpperCase());
    String token = jwtDevService.mintDevToken(req.userId(), req.name(), req.unit(), r);
    return ResponseEntity.ok(Map.of("token", token));
  }
}


