package com.localconnector.community.incidents.repo;

import com.localconnector.community.incidents.model.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByCircleId(Long circleId);
}