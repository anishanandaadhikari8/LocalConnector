package com.localconnector.community.reservations.repo;

import com.localconnector.community.reservations.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.Instant;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByAmenityIdAndStatusInAndStartAtLessThanAndEndAtGreaterThan(Long amenityId, List<Booking.Status> statuses, Instant end, Instant start);
    List<Booking> findByUserId(String userId);
}