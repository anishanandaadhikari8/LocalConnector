package com.localconnector.community.service;

import com.localconnector.community.domain.Role;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtDevService {
  @Value("${app.auth.dev-enabled:false}")
  private boolean devEnabled;

  @Value("${app.jwt.secret:change-me}")
  private String secret;

  public String mintDevToken(Long userId, String name, String unit, Role role) {
    if (!devEnabled) {
      throw new IllegalStateException("Dev mint disabled");
    }
    Map<String, Object> claims = new HashMap<>();
    claims.put("sub", String.valueOf(userId));
    claims.put("name", name);
    claims.put("unit", unit);
    claims.put("role", role.name());
    Instant now = Instant.now();
    Instant exp = now.plus(12, ChronoUnit.HOURS);
    byte[] key = secret.getBytes();
    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(java.util.Date.from(now))
        .setExpiration(java.util.Date.from(exp))
        .signWith(Keys.hmacShaKeyFor(key), SignatureAlgorithm.HS256)
        .compact();
  }
}


