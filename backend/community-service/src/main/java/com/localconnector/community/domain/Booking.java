package com.localconnector.community.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
public class Booking {
  public enum Status { PENDING, APPROVED, REJECTED, CANCELED }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  private Amenity amenity;

  private Long userId;
  private OffsetDateTime startAt;
  private OffsetDateTime endAt;

  @Enumerated(EnumType.STRING)
  private Status status;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public Amenity getAmenity() { return amenity; }
  public void setAmenity(Amenity amenity) { this.amenity = amenity; }
  public Long getUserId() { return userId; }
  public void setUserId(Long userId) { this.userId = userId; }
  public OffsetDateTime getStartAt() { return startAt; }
  public void setStartAt(OffsetDateTime startAt) { this.startAt = startAt; }
  public OffsetDateTime getEndAt() { return endAt; }
  public void setEndAt(OffsetDateTime endAt) { this.endAt = endAt; }
  public Status getStatus() { return status; }
  public void setStatus(Status status) { this.status = status; }
}


