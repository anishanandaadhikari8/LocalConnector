package com.localconnector.community.analytics.repo;

import com.localconnector.community.analytics.model.AnomalyAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface AnomalyAlertRepository extends JpaRepository<AnomalyAlert, Long> {
    List<AnomalyAlert> findByCircleIdAndMetricKeyAndWindowStartGreaterThanEqualAndWindowEndLessThanEqual(Long circleId, String metricKey, Instant from, Instant to);
}