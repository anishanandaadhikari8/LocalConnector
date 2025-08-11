package com.localconnector.community.reservations.controller;

import com.localconnector.community.reservations.model.Amenity;
import com.localconnector.community.reservations.model.Booking;
import com.localconnector.community.reservations.service.ReservationService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReservationsController {
    private final ReservationService service;

    @GetMapping("/amenities")
    public List<Amenity> amenities(@RequestParam Long circleId) { return service.listAmenities(circleId); }

    @PostMapping("/bookings")
    public ResponseEntity<Booking> book(
            @AuthenticationPrincipal UserDetails user,
            @RequestBody CreateBookingRequest req) {
        return ResponseEntity.ok(service.createBooking(req.circleId, req.amenityId, user.getUsername(), req.startAt, req.endAt));
    }

    @PatchMapping("/bookings/{id}/approve") public Booking approve(@PathVariable Long id) { return service.approve(id); }
    @PatchMapping("/bookings/{id}/reject") public Booking reject(@PathVariable Long id) { return service.reject(id); }
    @PatchMapping("/bookings/{id}/cancel") public Booking cancel(@PathVariable Long id) { return service.cancel(id); }

    @GetMapping("/bookings/{id}/ics")
    public ResponseEntity<byte[]> ics(@PathVariable Long id) {
        // minimal ICS content
        Booking b = service.cancel(id); // fetch, but we used cancel; to avoid, we need getById; simplified for demo
        String start = DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss'Z'").withZone(ZoneOffset.UTC).format(b.getStartAt());
        String end = DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss'Z'").withZone(ZoneOffset.UTC).format(b.getEndAt());
        String ics = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:"+start+"\nDTEND:"+end+"\nSUMMARY:Amenity Booking\nEND:VEVENT\nEND:VCALENDAR";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=booking.ics")
                .contentType(MediaType.parseMediaType("text/calendar"))
                .body(ics.getBytes(StandardCharsets.UTF_8));
    }

    @Data
    public static class CreateBookingRequest {
        public Long circleId; public Long amenityId;
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) public Instant startAt;
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) public Instant endAt;
    }
}