package com.localconnector.community.circles.repo;

import com.localconnector.community.circles.model.Circle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CircleRepository extends JpaRepository<Circle, Long> {
    List<Circle> findByOwnerUserId(String ownerUserId);
}