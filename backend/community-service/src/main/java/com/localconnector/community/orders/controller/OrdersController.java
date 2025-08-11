package com.localconnector.community.orders.controller;

import com.localconnector.community.orders.model.MenuItem;
import com.localconnector.community.orders.model.OrderHeader;
import com.localconnector.community.orders.model.OrderItem;
import com.localconnector.community.orders.service.OrderService;
import com.localconnector.community.cross.CrossCircleGuard;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class OrdersController {
    private final OrderService service;
    private final CrossCircleGuard guard;

    @GetMapping("/menu-items")
    public List<MenuItem> listMenu(@RequestParam Long circleId) { return service.getMenu(circleId); }

    @PostMapping("/menu-items")
    public MenuItem addMenu(@RequestBody MenuItem item) { return service.addMenuItem(item); }

    @PostMapping("/orders")
    public ResponseEntity<OrderHeader> place(@AuthenticationPrincipal UserDetails user, @RequestBody PlaceOrderRequest req) {
        if (!guard.isAllowed(req.originCircleId, req.circleId, "PLACE_ORDER")) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(service.placeOrder(user.getUsername(), req.circleId, req.items));
    }

    @PatchMapping("/orders/{id}")
    public ResponseEntity<OrderHeader> update(@PathVariable Long id, @RequestBody UpdateOrderRequest req) {
        return ResponseEntity.ok(service.updateStatus(id, req.status));
    }

    @GetMapping("/orders/{id}/items")
    public List<OrderItem> items(@PathVariable Long id) { return service.getItems(id); }

    @Data
    public static class PlaceOrderRequest { public Long circleId; public Long originCircleId; public List<OrderItem> items; }
    @Data
    public static class UpdateOrderRequest { public OrderHeader.Status status; }
}