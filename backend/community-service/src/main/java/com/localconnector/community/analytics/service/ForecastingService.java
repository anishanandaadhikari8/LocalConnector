package com.localconnector.community.analytics.service;

import com.localconnector.community.analytics.model.Forecast;
import com.localconnector.community.analytics.repo.ForecastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ForecastingService {
    private final ForecastRepository forecastRepository;

    @Transactional
    public Forecast generateForecast(Long circleId, Long amenityId, int days) {
        String hourly = "{\"0\":2,\"1\":1,\"6\":5,\"18\":12,\"19\":10}"; // mock distribution
        String surge = "[18,19]";
        Forecast f = Forecast.builder()
                .circleId(circleId)
                .amenityId(amenityId)
                .horizonDate(LocalDate.now().plusDays(days))
                .hourlyPredJson(hourly)
                .recommendedSlotMins(60)
                .surgeHoursJson(surge)
                .createdAt(Instant.now())
                .build();
        return forecastRepository.save(f);
    }

    @Scheduled(cron = "0 0 2 * * *")
    public void nightlyForecasts() {
        // Mock: generate for a couple of amenities
        generateForecast(1L, 101L, 7);
        generateForecast(1L, 102L, 7);
    }
}