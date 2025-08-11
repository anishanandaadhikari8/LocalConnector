package com.localconnector.community.reservations.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "BOOKING")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    public enum Status { PENDING, APPROVED, REJECTED, CANCELED }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long circleId;
    private Long amenityId;
    private String userId;
    private Instant startAt;
    private Instant endAt;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Instant createdAt;
}