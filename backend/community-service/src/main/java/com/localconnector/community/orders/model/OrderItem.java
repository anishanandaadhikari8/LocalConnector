package com.localconnector.community.orders.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ORDER_ITEM")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "menu_item_id", nullable = false)
    private Long menuItemId;

    @Column(nullable = false)
    private Integer qty;

    @Column(name = "price_cents", nullable = false)
    private Long priceCents;
}