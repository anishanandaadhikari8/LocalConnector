package com.localconnector.community.promotions.service;

import com.localconnector.community.promotions.model.Promo;
import com.localconnector.community.promotions.repo.PromoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PromotionService {
    private final PromoRepository promoRepository;

    public List<Promo> listActive(Long circleId) { return promoRepository.findByCircleIdAndActiveTrue(circleId); }

    @Transactional
    public Promo create(Promo promo) { return promoRepository.save(promo); }

    @Transactional
    public Promo claim(Long promoId) {
        Promo p = promoRepository.findById(promoId).orElseThrow();
        if (p.getClaimCount() == null) p.setClaimCount(0L);
        p.setClaimCount(p.getClaimCount() + 1);
        return promoRepository.save(p);
    }
}