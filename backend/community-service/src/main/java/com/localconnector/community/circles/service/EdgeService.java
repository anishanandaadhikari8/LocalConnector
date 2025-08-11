package com.localconnector.community.circles.service;

import com.localconnector.community.circles.model.CircleEdge;
import com.localconnector.community.circles.repo.CircleEdgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EdgeService {
    private final CircleEdgeRepository edgeRepository;

    @Transactional
    public CircleEdge proposeEdge(Long fromCircleId, Long toCircleId, String allowedActionsJson) {
        CircleEdge edge = CircleEdge.builder()
                .fromCircleId(fromCircleId)
                .toCircleId(toCircleId)
                .allowedActionsJson(allowedActionsJson)
                .status(CircleEdge.Status.PENDING)
                .build();
        return edgeRepository.save(edge);
    }

    @Transactional
    public CircleEdge updateStatus(Long edgeId, CircleEdge.Status status) {
        CircleEdge edge = edgeRepository.findById(edgeId).orElseThrow();
        edge.setStatus(status);
        return edgeRepository.save(edge);
    }
}