package com.localconnector.community.circles.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CIRCLE_FEATURE")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CircleFeature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "circle_id", nullable = false)
    private Long circleId;

    @Column(name = "feature_key", nullable = false)
    private String featureKey;

    @Column(nullable = false)
    private boolean enabled;
}