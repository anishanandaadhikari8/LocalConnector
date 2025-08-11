package com.localconnector.community.circles.controller;

import com.localconnector.community.circles.model.Circle;
import com.localconnector.community.circles.model.CircleFeature;
import com.localconnector.community.circles.service.CircleService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/circles")
@RequiredArgsConstructor
public class CircleController {
    private final CircleService circleService;

    @PostMapping
    public ResponseEntity<Circle> create(@AuthenticationPrincipal UserDetails user, @RequestBody CreateCircleRequest req) {
        Circle c = circleService.createCircle(user.getUsername(), req.name, req.type, req.radius, req.brandingJson, req.policiesJson, req.features);
        return ResponseEntity.ok(c);
    }

    @GetMapping("/mine")
    public List<Circle> mine(@AuthenticationPrincipal UserDetails user) {
        return circleService.getMine(user.getUsername());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CircleDetailsResponse> get(@PathVariable Long id) {
        Circle c = circleService.getMine("").stream().filter(x -> x.getId().equals(id)).findFirst().orElse(null);
        // Fallback simplistic fetch
        // In a real implementation, add proper getById method in service
        if (c == null) return ResponseEntity.notFound().build();
        List<CircleFeature> features = circleService.getFeatures(id);
        CircleDetailsResponse res = new CircleDetailsResponse();
        res.circle = c;
        res.features = features;
        res.policiesJson = c.getPoliciesJson();
        return ResponseEntity.ok(res);
    }

    @PostMapping("/{id}/features")
    public ResponseEntity<CircleFeature> setFeature(@PathVariable Long id, @RequestBody FeatureToggleRequest req) {
        return ResponseEntity.ok(circleService.setFeature(id, req.featureKey, req.enabled));
    }

    @PostMapping("/{id}/children")
    public ResponseEntity<Circle> createChild(@PathVariable Long id, @AuthenticationPrincipal UserDetails user, @RequestBody CreateChildRequest req) {
        return ResponseEntity.ok(circleService.createChild(id, user.getUsername(), req.name, req.type));
    }

    @Data
    public static class CreateCircleRequest {
        public String name;
        public String type;
        public Double radius;
        public String brandingJson;
        public String policiesJson;
        public List<String> features;
    }

    @Data
    public static class FeatureToggleRequest {
        public String featureKey;
        public boolean enabled;
    }

    @Data
    public static class CreateChildRequest {
        public String name;
        public String type;
    }

    @Data
    public static class CircleDetailsResponse {
        public Circle circle;
        public List<CircleFeature> features;
        public String policiesJson;
    }
}