package com.localconnector.community.promotions.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "MERCHANT")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Merchant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "circle_id", nullable = false)
    private Long circleId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean verified;

    @Column(name = "contact_json", columnDefinition = "CLOB")
    private String contactJson;
}