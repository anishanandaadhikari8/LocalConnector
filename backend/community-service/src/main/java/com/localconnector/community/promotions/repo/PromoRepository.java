package com.localconnector.community.promotions.repo;

import com.localconnector.community.promotions.model.Promo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromoRepository extends JpaRepository<Promo, Long> {
    List<Promo> findByCircleIdAndActiveTrue(Long circleId);
}