package com.localconnector.community.circles.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "CIRCLE")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Circle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "owner_user_id", nullable = false)
    private String ownerUserId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(name = "center_lat")
    private Double centerLat;

    @Column(name = "center_lng")
    private Double centerLng;

    @Column(name = "radius_miles")
    private Double radiusMiles;

    @Column(name = "branding_json", columnDefinition = "CLOB")
    private String brandingJson;

    @Column(name = "policies_json", columnDefinition = "CLOB")
    private String policiesJson;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
}