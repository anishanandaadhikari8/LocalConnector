package com.localconnector.community.analytics.service;

import com.localconnector.community.analytics.model.AnomalyAlert;
import com.localconnector.community.analytics.repo.AnomalyAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnomalyService {
    private final AnomalyAlertRepository repository;

    public List<AnomalyAlert> find(String metric, Long circleId, Instant from, Instant to) {
        return repository.findByCircleIdAndMetricKeyAndWindowStartGreaterThanEqualAndWindowEndLessThanEqual(circleId, metric, from, to);
    }

    @Transactional
    public AnomalyAlert createMock(Long circleId, String metricKey, double z, String direction) {
        AnomalyAlert a = AnomalyAlert.builder()
                .circleId(circleId)
                .metricKey(metricKey)
                .windowStart(Instant.now().minusSeconds(3600))
                .windowEnd(Instant.now())
                .zscore(z)
                .direction(direction)
                .contextJson("{\"note\":\"demo\"}")
                .status(AnomalyAlert.Status.OPEN)
                .createdAt(Instant.now())
                .build();
        return repository.save(a);
    }

    @Transactional
    public AnomalyAlert ack(Long id) {
        AnomalyAlert a = repository.findById(id).orElseThrow();
        a.setStatus(AnomalyAlert.Status.ACK);
        return repository.save(a);
    }

    @Scheduled(cron = "0 0 * * * *")
    public void hourlyScan() {
        createMock(1L, "incident_volume", 3.1, "UP");
    }
}