package com.localconnector.community.orders.repo;

import com.localconnector.community.orders.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCircleIdAndActiveTrue(Long circleId);
}