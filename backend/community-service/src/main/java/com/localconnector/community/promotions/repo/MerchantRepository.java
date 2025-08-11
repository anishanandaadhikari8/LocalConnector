package com.localconnector.community.promotions.repo;

import com.localconnector.community.promotions.model.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MerchantRepository extends JpaRepository<Merchant, Long> {}