package com.localconnector.community.circles.controller;

import com.localconnector.community.circles.model.Membership;
import com.localconnector.community.circles.service.MembershipService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/circles")
@RequiredArgsConstructor
public class MembershipController {
    private final MembershipService membershipService;

    @PostMapping("/{id}/members")
    public ResponseEntity<Membership> add(@PathVariable Long id, @RequestBody AddMemberRequest req) {
        return ResponseEntity.ok(membershipService.addMember(id, req.userId, req.role, req.verified, req.unit));
    }

    @GetMapping("/{id}/members")
    public List<Membership> list(@PathVariable Long id) {
        return membershipService.getMembers(id);
    }

    @Data
    public static class AddMemberRequest {
        public String userId;
        public String role;
        public boolean verified;
        public String unit;
    }
}