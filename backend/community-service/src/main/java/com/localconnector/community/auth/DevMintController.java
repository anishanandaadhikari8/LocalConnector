package com.localconnector.community.auth;

import com.localconnector.community.security.JwtUtil;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class DevMintController {
    private final JwtUtil jwtUtil;

    @PostMapping("/dev-mint")
    public ResponseEntity<TokenResponse> mint(@RequestBody MintRequest req) {
        String token = jwtUtil.generateToken(req.userId, req.role, req.circleId);
        TokenResponse tr = new TokenResponse();
        tr.token = token;
        return ResponseEntity.ok(tr);
    }

    @Data
    public static class MintRequest { public String userId; public String role; public Long circleId; }
    @Data
    public static class TokenResponse { public String token; }
}