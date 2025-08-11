package com.localconnector.community.promotions.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "PROMO")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Promo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "circle_id", nullable = false)
    private Long circleId;

    @Column(name = "merchant_id")
    private Long merchantId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "CLOB")
    private String body;

    @Column(name = "starts_at")
    private Instant startsAt;

    @Column(name = "ends_at")
    private Instant endsAt;

    @Column(nullable = false)
    private boolean active;

    @Column(name = "claim_count")
    private Long claimCount;
}