package com.localconnector.community.analytics.service;

import com.localconnector.community.analytics.model.TriageLabel;
import com.localconnector.community.analytics.repo.TriageLabelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class TriageService {
    private final TriageLabelRepository triageLabelRepository;

    @Transactional
    public TriageLabel triageIncident(Long incidentId, String text) {
        String category = text != null && text.toLowerCase().contains("security") ? "SECURITY" : "MAINTENANCE";
        String severity = text != null && text.toLowerCase().contains("urgent") ? "SEV_4" : "SEV_2";
        TriageLabel label = TriageLabel.builder()
                .incidentId(incidentId)
                .categoryPred(category)
                .severityPred(severity)
                .confidence(0.85)
                .createdAt(Instant.now())
                .build();
        return triageLabelRepository.save(label);
    }

    @Scheduled(cron = "0 0 * * * *")
    public void hourlyTriageScan() {
        // mock background triage
    }
}