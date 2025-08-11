package com.localconnector.community.repo;

import com.localconnector.community.domain.Incident;
import com.localconnector.community.domain.Incident.Status;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
  List<Incident> findByReporterUserIdOrderByReportedAtDesc(Long reporterUserId);
  List<Incident> findByStatusOrderByReportedAtDesc(Status status);
}


