package com.localconnector.community.analytics.repo;

import com.localconnector.community.analytics.model.TriageLabel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TriageLabelRepository extends JpaRepository<TriageLabel, Long> {
    TriageLabel findFirstByIncidentIdOrderByCreatedAtDesc(Long incidentId);
}