package com.localconnector.community.controller;

import com.localconnector.community.domain.Booking;
import com.localconnector.community.domain.Booking.Status;
import com.localconnector.community.service.BookingService;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {
  private final BookingService bookingService;
  public BookingController(BookingService bookingService) { this.bookingService = bookingService; }

  public record CreateBookingRequest(@NotNull Long amenityId, @NotNull OffsetDateTime startAt, @NotNull OffsetDateTime endAt) {}

  @GetMapping("/mine")
  public List<Booking> mine(@AuthenticationPrincipal Jwt jwt) {
    Long userId = Long.valueOf(jwt.getClaimAsString("sub"));
    return bookingService.listMine(userId);
  }

  @GetMapping
  @PreAuthorize("hasAuthority('ADMIN')")
  public List<Booking> all() { return bookingService.listAll(); }

  @PostMapping
  public ResponseEntity<?> create(@AuthenticationPrincipal Jwt jwt, @RequestBody CreateBookingRequest req) {
    Long userId = Long.valueOf(jwt.getClaimAsString("sub"));
    try {
      Booking b = bookingService.createBooking(req.amenityId(), userId, req.startAt(), req.endAt());
      return ResponseEntity.status(201).body(b);
    } catch (BookingService.BookingConflictException e) {
      Map<String, Object> body = new HashMap<>();
      body.put("code", "BOOKING_CONFLICT");
      body.put("details", e.getConflicts());
      return ResponseEntity.status(409).body(body);
    }
  }

  public record SetStatusRequest(@NotNull Status status) {}

  @PatchMapping("/{id}/status")
  @PreAuthorize("hasAuthority('ADMIN')")
  public Booking setStatus(@PathVariable Long id, @RequestBody SetStatusRequest req) {
    return bookingService.setStatus(id, req.status());
  }
}


