package com.localconnector.community.circles.controller;

import com.localconnector.community.circles.model.CircleEdge;
import com.localconnector.community.circles.service.EdgeService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/circles")
@RequiredArgsConstructor
public class EdgeController {
    private final EdgeService edgeService;

    @PostMapping("/edges")
    public ResponseEntity<CircleEdge> propose(@RequestBody ProposeEdgeRequest req) {
        return ResponseEntity.ok(edgeService.proposeEdge(req.fromCircleId, req.toCircleId, req.allowedActionsJson));
    }

    @PatchMapping("/edges/{id}")
    public ResponseEntity<CircleEdge> update(@PathVariable Long id, @RequestBody UpdateEdgeRequest req) {
        return ResponseEntity.ok(edgeService.updateStatus(id, req.status));
    }

    @Data
    public static class ProposeEdgeRequest {
        public Long fromCircleId;
        public Long toCircleId;
        public String allowedActionsJson;
    }

    @Data
    public static class UpdateEdgeRequest {
        public CircleEdge.Status status;
    }
}