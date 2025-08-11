package com.localconnector.community.incidents.controller;

import com.localconnector.community.incidents.model.Incident;
import com.localconnector.community.incidents.service.IncidentService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class IncidentsController {
    private final IncidentService service;

    @GetMapping("/incidents") public List<Incident> list(@RequestParam Long circleId) { return service.list(circleId); }

    @PostMapping("/incidents")
    public ResponseEntity<Incident> report(@AuthenticationPrincipal UserDetails user, @RequestBody ReportRequest req) {
        return ResponseEntity.ok(service.report(req.circleId, user.getUsername(), req.type, req.description, req.severity, req.mediaPath));
    }

    @PatchMapping("/incidents/{id}/progress") public Incident progress(@PathVariable Long id) { return service.progress(id); }
    @PatchMapping("/incidents/{id}/resolve") public Incident resolve(@PathVariable Long id) { return service.resolve(id); }

    @Data
    public static class ReportRequest { public Long circleId; public String type; public String description; public Integer severity; public String mediaPath; }
}