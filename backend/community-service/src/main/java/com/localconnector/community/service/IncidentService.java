package com.localconnector.community.service;

import com.localconnector.community.domain.Incident;
import com.localconnector.community.domain.Incident.Status;
import com.localconnector.community.repo.IncidentRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class IncidentService {
  private final IncidentRepository incidentRepository;

  public IncidentService(IncidentRepository incidentRepository) {
    this.incidentRepository = incidentRepository;
  }

  public Incident report(Incident incident) {
    return incidentRepository.save(incident);
  }

  public List<Incident> listMine(Long userId) {
    return incidentRepository.findByReporterUserIdOrderByReportedAtDesc(userId);
  }

  public List<Incident> listAll() {
    return incidentRepository.findAll();
  }

  public Incident setStatus(Long id, Status status) {
    Incident i = incidentRepository.findById(id).orElseThrow();
    i.setStatus(status);
    return incidentRepository.save(i);
  }
}


