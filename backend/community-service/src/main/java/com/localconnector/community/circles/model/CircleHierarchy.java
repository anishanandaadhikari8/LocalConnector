package com.localconnector.community.circles.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "CIRCLE_HIERARCHY")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CircleHierarchy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "parent_id", nullable = false)
    private Long parentId;

    @Column(name = "child_id", nullable = false)
    private Long childId;
}