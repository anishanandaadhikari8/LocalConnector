package com.localconnector.community.analytics.repo;

import com.localconnector.community.analytics.model.Forecast;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ForecastRepository extends JpaRepository<Forecast, Long> {
    List<Forecast> findByAmenityIdAndHorizonDateBetween(Long amenityId, LocalDate from, LocalDate to);
}