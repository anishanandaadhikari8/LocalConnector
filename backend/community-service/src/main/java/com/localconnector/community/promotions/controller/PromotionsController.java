package com.localconnector.community.promotions.controller;

import com.localconnector.community.promotions.model.Promo;
import com.localconnector.community.promotions.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PromotionsController {
    private final PromotionService service;

    @GetMapping("/promos")
    public List<Promo> list(@RequestParam Long circleId) { return service.listActive(circleId); }

    @PostMapping("/promos")
    public Promo create(@RequestBody Promo promo) { return service.create(promo); }

    @PostMapping("/promos/{id}/claim")
    public ResponseEntity<Promo> claim(@PathVariable Long id) { return ResponseEntity.ok(service.claim(id)); }
}