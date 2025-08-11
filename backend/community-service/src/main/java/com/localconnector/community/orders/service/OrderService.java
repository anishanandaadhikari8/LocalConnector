package com.localconnector.community.orders.service;

import com.localconnector.community.orders.model.MenuItem;
import com.localconnector.community.orders.model.OrderHeader;
import com.localconnector.community.orders.model.OrderItem;
import com.localconnector.community.orders.repo.MenuItemRepository;
import com.localconnector.community.orders.repo.OrderHeaderRepository;
import com.localconnector.community.orders.repo.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final MenuItemRepository menuItemRepository;
    private final OrderHeaderRepository headerRepository;
    private final OrderItemRepository itemRepository;

    public List<MenuItem> getMenu(Long circleId) { return menuItemRepository.findByCircleIdAndActiveTrue(circleId); }

    @Transactional
    public MenuItem addMenuItem(MenuItem item) { return menuItemRepository.save(item); }

    @Transactional
    public OrderHeader placeOrder(String userId, Long circleId, List<OrderItem> items) {
        long total = items.stream().mapToLong(i -> i.getPriceCents() * i.getQty()).sum();
        OrderHeader header = OrderHeader.builder()
                .circleId(circleId)
                .userId(userId)
                .status(OrderHeader.Status.PLACED)
                .totalCents(total)
                .createdAt(Instant.now())
                .build();
        OrderHeader saved = headerRepository.save(header);
        for (OrderItem i : items) {
            i.setOrderId(saved.getId());
            itemRepository.save(i);
        }
        return saved;
    }

    @Transactional
    public OrderHeader updateStatus(Long orderId, OrderHeader.Status status) {
        OrderHeader header = headerRepository.findById(orderId).orElseThrow();
        header.setStatus(status);
        return headerRepository.save(header);
    }

    public List<OrderItem> getItems(Long orderId) { return itemRepository.findByOrderId(orderId); }
}