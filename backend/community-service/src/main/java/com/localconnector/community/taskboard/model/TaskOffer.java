package com.localconnector.community.taskboard.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "TASK_OFFER")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskOffer {
    public enum Status { PENDING, ACCEPTED, REJECTED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_id", nullable = false)
    private Long postId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(columnDefinition = "CLOB")
    private String message;

    @Column(name = "price_cents")
    private Long priceCents;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
}