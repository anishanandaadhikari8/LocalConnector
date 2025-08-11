package com.localconnector.community.circles.service;

import com.localconnector.community.circles.model.Circle;
import com.localconnector.community.circles.model.CircleFeature;
import com.localconnector.community.circles.model.CircleHierarchy;
import com.localconnector.community.circles.repo.CircleFeatureRepository;
import com.localconnector.community.circles.repo.CircleHierarchyRepository;
import com.localconnector.community.circles.repo.CircleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CircleService {
    private final CircleRepository circleRepository;
    private final CircleFeatureRepository featureRepository;
    private final CircleHierarchyRepository hierarchyRepository;

    @Transactional
    public Circle createCircle(String ownerUserId, String name, String type, Double radiusMiles, String brandingJson, String policiesJson, List<String> features) {
        Circle circle = Circle.builder()
                .ownerUserId(ownerUserId)
                .name(name)
                .type(type)
                .radiusMiles(radiusMiles)
                .brandingJson(brandingJson)
                .policiesJson(policiesJson)
                .createdAt(Instant.now())
                .build();
        Circle saved = circleRepository.save(circle);
        if (features != null) {
            for (String f : features) {
                CircleFeature cf = CircleFeature.builder().circleId(saved.getId()).featureKey(f).enabled(true).build();
                featureRepository.save(cf);
            }
        }
        return saved;
    }

    public List<Circle> getMine(String userId) {
        return circleRepository.findByOwnerUserId(userId);
    }

    public List<CircleFeature> getFeatures(Long circleId) {
        return featureRepository.findByCircleId(circleId);
    }

    public Circle getById(Long id) {
        return circleRepository.findById(id).orElse(null);
    }

    @Transactional
    public CircleFeature setFeature(Long circleId, String featureKey, boolean enabled) {
        List<CircleFeature> list = featureRepository.findByCircleId(circleId);
        for (CircleFeature cf : list) {
            if (cf.getFeatureKey().equalsIgnoreCase(featureKey)) {
                cf.setEnabled(enabled);
                return featureRepository.save(cf);
            }
        }
        CircleFeature cf = CircleFeature.builder().circleId(circleId).featureKey(featureKey).enabled(enabled).build();
        return featureRepository.save(cf);
    }

    @Transactional
    public Circle createChild(Long parentId, String ownerUserId, String name, String type) {
        Circle child = Circle.builder()
                .ownerUserId(ownerUserId)
                .name(name)
                .type(type)
                .createdAt(Instant.now())
                .build();
        Circle saved = circleRepository.save(child);
        hierarchyRepository.save(CircleHierarchy.builder().parentId(parentId).childId(saved.getId()).build());
        return saved;
    }
}