package com.localconnector.community.circles.repo;

import com.localconnector.community.circles.model.CircleHierarchy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CircleHierarchyRepository extends JpaRepository<CircleHierarchy, Long> {
    List<CircleHierarchy> findByParentId(Long parentId);
    List<CircleHierarchy> findByChildId(Long childId);
}