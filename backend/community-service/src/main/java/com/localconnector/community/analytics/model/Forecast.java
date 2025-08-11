package com.localconnector.community.analytics.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "FORECAST")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Forecast {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long circleId;
    private Long amenityId;
    private LocalDate horizonDate;
    @Column(columnDefinition = "CLOB")
    private String hourlyPredJson;
    private Integer recommendedSlotMins;
    @Column(columnDefinition = "CLOB")
    private String surgeHoursJson;
    private Instant createdAt;
}