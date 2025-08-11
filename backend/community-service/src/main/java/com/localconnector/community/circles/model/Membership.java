package com.localconnector.community.circles.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "MEMBERSHIP")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "circle_id", nullable = false)
    private Long circleId;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private boolean verified;

    @Column
    private String unit;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
}