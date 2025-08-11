package com.localconnector.community.circles.repo;

import com.localconnector.community.circles.model.CircleFeature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CircleFeatureRepository extends JpaRepository<CircleFeature, Long> {
    List<CircleFeature> findByCircleId(Long circleId);
}