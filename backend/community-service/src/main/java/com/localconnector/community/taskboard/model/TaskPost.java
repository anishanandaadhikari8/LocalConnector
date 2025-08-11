package com.localconnector.community.taskboard.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "TASK_POST")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskPost {
    public enum Type { CARPOOL, BABYSIT, ERRAND, SHARE, LEND, BORROW }
    public enum Status { OPEN, ACCEPTED, COMPLETED, CANCELED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "circle_id", nullable = false)
    private Long circleId;

    @Column(name = "author_user_id", nullable = false)
    private String authorUserId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "CLOB")
    private String body;

    @Column(name = "start_at")
    private Instant startAt;

    @Column(name = "end_at")
    private Instant endAt;

    @Column(name = "price_cents")
    private Long priceCents;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
}