package com.localconnector.community.analytics.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "MAINTENANCE_RISK")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceRisk {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long circleId;
    private Long amenityId;
    private Double riskScore;
    private Double mtbfDays;
    @Column(columnDefinition = "CLOB")
    private String topSignalsJson;
    private Instant createdAt;
}