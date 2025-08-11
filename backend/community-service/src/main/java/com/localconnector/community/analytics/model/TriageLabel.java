package com.localconnector.community.analytics.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "TRIAGE_LABEL")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TriageLabel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long incidentId;
    private String severityPred;
    private String categoryPred;
    private Long duplicateIncidentId;
    private Double confidence;
    private Instant createdAt;
}