package com.localconnector.community.reservations.service;

import com.localconnector.community.reservations.model.Amenity;
import com.localconnector.community.reservations.model.Booking;
import com.localconnector.community.reservations.repo.AmenityRepository;
import com.localconnector.community.reservations.repo.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final AmenityRepository amenityRepository;
    private final BookingRepository bookingRepository;

    public List<Amenity> listAmenities(Long circleId) { return amenityRepository.findByCircleId(circleId); }

    @Transactional
    public Booking createBooking(Long circleId, Long amenityId, String userId, Instant startAt, Instant endAt) {
        Amenity amenity = amenityRepository.findById(amenityId).orElseThrow();
        // conflict detection against PENDING/APPROVED
        List<Booking> conflicts = bookingRepository.findByAmenityIdAndStatusInAndStartAtLessThanAndEndAtGreaterThan(
                amenityId,
                List.of(Booking.Status.PENDING, Booking.Status.APPROVED),
                endAt,
                startAt
        );
        if (!conflicts.isEmpty()) {
            // naive: still allow creation as PENDING, representing waitlist scenario externally
        }
        Booking.Status initial = amenity.isApprovalRequired() ? Booking.Status.PENDING : Booking.Status.APPROVED;
        Booking b = Booking.builder()
                .circleId(circleId)
                .amenityId(amenityId)
                .userId(userId)
                .startAt(startAt)
                .endAt(endAt)
                .status(initial)
                .createdAt(Instant.now())
                .build();
        return bookingRepository.save(b);
    }

    @Transactional public Booking approve(Long id) { return setStatus(id, Booking.Status.APPROVED); }
    @Transactional public Booking reject(Long id) { return setStatus(id, Booking.Status.REJECTED); }
    @Transactional public Booking cancel(Long id) { return setStatus(id, Booking.Status.CANCELED); }

    private Booking setStatus(Long id, Booking.Status s) {
        Booking b = bookingRepository.findById(id).orElseThrow();
        b.setStatus(s);
        return bookingRepository.save(b);
    }
}