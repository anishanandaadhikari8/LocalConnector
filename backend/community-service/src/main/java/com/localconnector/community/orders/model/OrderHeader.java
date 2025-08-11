package com.localconnector.community.orders.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "ORDER_HEADER")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderHeader {
    public enum Status { PLACED, CONFIRMED, READY, DELIVERED, CANCELED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "circle_id", nullable = false)
    private Long circleId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "total_cents", nullable = false)
    private Long totalCents;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
}