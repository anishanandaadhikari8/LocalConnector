package com.localconnector.community.analytics.repo;

import com.localconnector.community.analytics.model.MaintenanceRisk;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceRiskRepository extends JpaRepository<MaintenanceRisk, Long> {
    List<MaintenanceRisk> findByCircleIdAndAmenityId(Long circleId, Long amenityId);
}