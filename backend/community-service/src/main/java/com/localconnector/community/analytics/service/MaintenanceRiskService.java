package com.localconnector.community.analytics.service;

import com.localconnector.community.analytics.model.MaintenanceRisk;
import com.localconnector.community.analytics.repo.MaintenanceRiskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class MaintenanceRiskService {
    private final MaintenanceRiskRepository repository;

    @Transactional
    public MaintenanceRisk computeRisk(Long circleId, Long amenityId) {
        MaintenanceRisk risk = MaintenanceRisk.builder()
                .circleId(circleId)
                .amenityId(amenityId)
                .riskScore(0.42)
                .mtbfDays(37.0)
                .topSignalsJson("{\"noise\":0.3,\"downtime\":0.7}")
                .createdAt(Instant.now())
                .build();
        return repository.save(risk);
    }

    @Scheduled(cron = "0 0 3 * * *")
    public void nightlyRisk() {
        computeRisk(1L, 101L);
    }
}