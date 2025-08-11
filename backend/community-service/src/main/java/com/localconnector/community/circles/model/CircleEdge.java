package com.localconnector.community.circles.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "CIRCLE_EDGE")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CircleEdge {
    public enum Status { PENDING, ACTIVE, REVOKED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "from_circle_id", nullable = false)
    private Long fromCircleId;

    @Column(name = "to_circle_id", nullable = false)
    private Long toCircleId;

    @Column(name = "allowed_actions_json", columnDefinition = "CLOB")
    private String allowedActionsJson;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;
}