package com.localconnector.community.incidents.service;

import com.localconnector.community.analytics.service.TriageService;
import com.localconnector.community.incidents.model.Incident;
import com.localconnector.community.incidents.repo.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncidentService {
    private final IncidentRepository incidentRepository;
    private final TriageService triageService;

    public List<Incident> list(Long circleId) { return incidentRepository.findByCircleId(circleId); }

    @Transactional
    public Incident report(Long circleId, String userId, String type, String description, Integer severity, String mediaPath) {
        Incident inc = Incident.builder()
                .circleId(circleId).userId(userId).type(type).description(description)
                .severity(severity).status(Incident.Status.OPEN).mediaPath(mediaPath)
                .createdAt(Instant.now()).build();
        Incident saved = incidentRepository.save(inc);
        triageService.triageIncident(saved.getId(), description);
        return saved;
    }

    @Transactional public Incident progress(Long id) { return updateStatus(id, Incident.Status.IN_PROGRESS); }
    @Transactional public Incident resolve(Long id) { return updateStatus(id, Incident.Status.RESOLVED); }

    private Incident updateStatus(Long id, Incident.Status s) {
        Incident i = incidentRepository.findById(id).orElseThrow();
        i.setStatus(s);
        return incidentRepository.save(i);
    }
}