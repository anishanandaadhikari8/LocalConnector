package com.localconnector.community.cross;

import com.localconnector.community.circles.model.CircleEdge;
import com.localconnector.community.circles.repo.CircleEdgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CrossCircleGuard {
    private final CircleEdgeRepository edgeRepository;

    public boolean isAllowed(Long originCircleId, Long targetCircleId, String action) {
        if (originCircleId == null || originCircleId.equals(targetCircleId)) return true;
        return edgeRepository.findByFromCircleIdAndStatus(originCircleId, CircleEdge.Status.ACTIVE)
                .stream()
                .filter(e -> e.getToCircleId().equals(targetCircleId))
                .anyMatch(e -> e.getAllowedActionsJson() != null && e.getAllowedActionsJson().contains(action));
    }
}