package com.localconnector.community.repo;

import com.localconnector.community.domain.Booking;
import com.localconnector.community.domain.Booking.Status;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookingRepository extends JpaRepository<Booking, Long> {

  @Query("select b from Booking b where b.amenity.id = :amenityId and b.status in :statuses and (:start < b.endAt and :end > b.startAt)")
  List<Booking> findOverlaps(
      @Param("amenityId") Long amenityId,
      @Param("start") OffsetDateTime start,
      @Param("end") OffsetDateTime end,
      @Param("statuses") List<Status> statuses);

  List<Booking> findByUserIdOrderByStartAtDesc(Long userId);
}


