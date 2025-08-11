package com.localconnector.community.orders.repo;

import com.localconnector.community.orders.model.OrderHeader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderHeaderRepository extends JpaRepository<OrderHeader, Long> {
    List<OrderHeader> findByCircleId(Long circleId);
    List<OrderHeader> findByUserId(String userId);
}