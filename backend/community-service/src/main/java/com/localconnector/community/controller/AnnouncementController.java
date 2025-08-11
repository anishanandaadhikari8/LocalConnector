package com.localconnector.community.controller;

import com.localconnector.community.domain.Announcement;
import com.localconnector.community.service.AnnouncementService;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/announcements")
public class AnnouncementController {
  private final AnnouncementService announcementService;

  public AnnouncementController(AnnouncementService announcementService) {
    this.announcementService = announcementService;
  }

  @GetMapping
  public List<Announcement> list() { return announcementService.list(); }

  public record CreateRequest(@NotBlank String title, @NotBlank String body, Boolean pinned) {}

  @PostMapping
  @PreAuthorize("hasAuthority('ADMIN')")
  public Announcement create(@AuthenticationPrincipal Jwt jwt, @RequestBody CreateRequest req) {
    Long userId = Long.valueOf(jwt.getClaimAsString("sub"));
    Announcement a = new Announcement();
    a.setTitle(req.title());
    a.setBody(req.body());
    a.setPinned(Boolean.TRUE.equals(req.pinned()));
    a.setCreatedByUserId(userId);
    return announcementService.create(a);
  }

  public record PinRequest(Boolean pinned) {}

  @PatchMapping("/{id}/pin")
  @PreAuthorize("hasAuthority('ADMIN')")
  public Announcement pin(@PathVariable Long id, @RequestBody PinRequest req) {
    return announcementService.pin(id, Boolean.TRUE.equals(req.pinned()));
  }
}


