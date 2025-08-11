package com.localconnector.community.service;

import com.localconnector.community.domain.Amenity;
import com.localconnector.community.domain.Booking;
import com.localconnector.community.domain.Booking.Status;
import com.localconnector.community.repo.AmenityRepository;
import com.localconnector.community.repo.BookingRepository;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookingService {
  private final BookingRepository bookingRepository;
  private final AmenityRepository amenityRepository;

  public BookingService(BookingRepository bookingRepository, AmenityRepository amenityRepository) {
    this.bookingRepository = bookingRepository;
    this.amenityRepository = amenityRepository;
  }

  public record ConflictInterval(OffsetDateTime startAt, OffsetDateTime endAt) {}

  public static class BookingConflictException extends RuntimeException {
    private final List<ConflictInterval> conflicts;
    public BookingConflictException(List<ConflictInterval> conflicts) {
      super("BOOKING_CONFLICT");
      this.conflicts = conflicts;
    }
    public List<ConflictInterval> getConflicts() { return conflicts; }
  }

  @Transactional
  public Booking createBooking(Long amenityId, Long userId, OffsetDateTime startAt, OffsetDateTime endAt) {
    Amenity amenity = amenityRepository.findById(amenityId).orElseThrow();

    List<Booking> overlaps = bookingRepository.findOverlaps(
        amenityId, startAt, endAt, List.of(Status.PENDING, Status.APPROVED));
    if (!overlaps.isEmpty()) {
      List<ConflictInterval> conflicts = overlaps.stream()
          .map(b -> new ConflictInterval(b.getStartAt(), b.getEndAt()))
          .toList();
      throw new BookingConflictException(conflicts);
    }

    Booking booking = new Booking();
    booking.setAmenity(amenity);
    booking.setUserId(userId);
    booking.setStartAt(startAt);
    booking.setEndAt(endAt);
    booking.setStatus(amenity.isRequiresApproval() ? Status.PENDING : Status.APPROVED);
    return bookingRepository.save(booking);
  }

  public List<Booking> listMine(Long userId) {
    return bookingRepository.findByUserIdOrderByStartAtDesc(userId);
  }

  public Optional<Booking> findById(Long id) { return bookingRepository.findById(id); }

  @Transactional
  public Booking setStatus(Long id, Status status) {
    Booking b = bookingRepository.findById(id).orElseThrow();
    b.setStatus(status);
    return bookingRepository.save(b);
  }

  public List<Booking> listAll() { return bookingRepository.findAll(); }
}


