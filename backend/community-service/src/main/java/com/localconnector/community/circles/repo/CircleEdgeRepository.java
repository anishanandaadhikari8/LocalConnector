package com.localconnector.community.circles.repo;

import com.localconnector.community.circles.model.CircleEdge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CircleEdgeRepository extends JpaRepository<CircleEdge, Long> {
    List<CircleEdge> findByFromCircleIdAndStatus(Long fromCircleId, CircleEdge.Status status);
    List<CircleEdge> findByToCircleIdAndStatus(Long toCircleId, CircleEdge.Status status);
}