package com.localconnector.community.orders.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "MENU_ITEM")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "circle_id", nullable = false)
    private Long circleId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "CLOB")
    private String description;

    @Column(name = "price_cents", nullable = false)
    private Long priceCents;

    @Column(nullable = false)
    private boolean active;
}