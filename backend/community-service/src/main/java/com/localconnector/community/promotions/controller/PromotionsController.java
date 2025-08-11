package com.localconnector.community.promotions.controller;

import com.localconnector.community.promotions.model.Promo;
import com.localconnector.community.promotions.service.PromotionService;
import com.localconnector.community.cross.CrossCircleGuard;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PromotionsController {
    private final PromotionService service;
    private final CrossCircleGuard guard;

    @GetMapping("/promos")
    public ResponseEntity<List<Promo>> list(@RequestParam Long circleId, @RequestParam(required=false) Long originCircleId) {
        if (!guard.isAllowed(originCircleId, circleId, "VIEW_PROMOS")) return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        return ResponseEntity.ok(service.listActive(circleId));
    }

    @PostMapping("/promos")
    public Promo create(@RequestBody Promo promo) { return service.create(promo); }

    @PostMapping("/promos/{id}/claim")
    public ResponseEntity<Promo> claim(@PathVariable Long id) { return ResponseEntity.ok(service.claim(id)); }
}