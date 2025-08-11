package com.localconnector.community.circles.repo;

import com.localconnector.community.circles.model.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
    List<Membership> findByUserId(String userId);
    List<Membership> findByCircleId(Long circleId);
}