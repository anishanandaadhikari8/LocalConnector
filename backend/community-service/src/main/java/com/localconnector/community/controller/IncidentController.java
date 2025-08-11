package com.localconnector.community.controller;

import com.localconnector.community.domain.Incident;
import com.localconnector.community.domain.Incident.Status;
import com.localconnector.community.service.IncidentService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/incidents")
public class IncidentController {
  private final IncidentService incidentService;
  public IncidentController(IncidentService incidentService) { this.incidentService = incidentService; }

  public record ReportRequest(@NotBlank String type, @NotBlank String description, String locationHint, Integer severity) {}

  @GetMapping
  public List<Incident> list(@AuthenticationPrincipal Jwt jwt) {
    String role = jwt.getClaimAsString("role");
    if ("ADMIN".equals(role) || "SECURITY".equals(role)) {
      return incidentService.listAll();
    }
    Long userId = Long.valueOf(jwt.getClaimAsString("sub"));
    return incidentService.listMine(userId);
  }

  @PostMapping
  public Incident report(@AuthenticationPrincipal Jwt jwt, @RequestBody ReportRequest req) {
    Long userId = Long.valueOf(jwt.getClaimAsString("sub"));
    Incident i = new Incident();
    i.setReporterUserId(userId);
    i.setType(req.type());
    i.setDescription(req.description());
    i.setLocationHint(req.locationHint());
    i.setSeverity(req.severity());
    return incidentService.report(i);
  }

  public record StatusRequest(@NotNull Status status) {}

  @PatchMapping("/{id}/status")
  @PreAuthorize("hasAnyAuthority('ADMIN','SECURITY')")
  public Incident setStatus(@PathVariable Long id, @RequestBody StatusRequest req) {
    return incidentService.setStatus(id, req.status());
  }
}


