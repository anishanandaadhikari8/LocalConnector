package com.localconnector.community.analytics.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "ANOMALY_ALERT")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnomalyAlert {
    public enum Status { OPEN, ACK, CLOSED }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long circleId;
    private String metricKey;
    private Instant windowStart;
    private Instant windowEnd;
    private Double zscore;
    private String direction;
    @Column(columnDefinition = "CLOB")
    private String contextJson;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Instant createdAt;
}