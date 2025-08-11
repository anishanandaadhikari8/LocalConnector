package com.localconnector.community.reservations.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "AMENITY")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Amenity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long circleId;
    private String name;
    private String hours;
    private Integer capacity;
    private boolean approvalRequired;
    private Integer slotLengthMins;
    private Integer maxPerWeek;
    private Integer cancellationWindowHours;
}