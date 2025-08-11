package com.localconnector.community.incidents.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "INCIDENT")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Incident {
    public enum Status { OPEN, IN_PROGRESS, RESOLVED }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long circleId;
    private String userId;
    private String type;
    @Column(columnDefinition = "CLOB")
    private String description;
    private Integer severity;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String mediaPath;
    private Instant createdAt;
}