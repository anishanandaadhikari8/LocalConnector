package com.localconnector.community.circles.service;

import com.localconnector.community.circles.model.Membership;
import com.localconnector.community.circles.repo.MembershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MembershipService {
    private final MembershipRepository membershipRepository;

    @Transactional
    public Membership addMember(Long circleId, String userId, String role, boolean verified, String unit) {
        Membership m = Membership.builder()
                .circleId(circleId)
                .userId(userId)
                .role(role)
                .verified(verified)
                .unit(unit)
                .createdAt(Instant.now())
                .build();
        return membershipRepository.save(m);
    }

    public List<Membership> getMembers(Long circleId) {
        return membershipRepository.findByCircleId(circleId);
    }
}