package com.localconnector.community.analytics.controller;

import com.localconnector.community.analytics.model.AnomalyAlert;
import com.localconnector.community.analytics.model.Forecast;
import com.localconnector.community.analytics.model.MaintenanceRisk;
import com.localconnector.community.analytics.model.TriageLabel;
import com.localconnector.community.analytics.service.AnomalyService;
import com.localconnector.community.analytics.service.ForecastingService;
import com.localconnector.community.analytics.service.MaintenanceRiskService;
import com.localconnector.community.analytics.service.TriageService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    private final ForecastingService forecastingService;
    private final TriageService triageService;
    private final MaintenanceRiskService maintenanceRiskService;
    private final AnomalyService anomalyService;

    @GetMapping("/amenities/{amenityId}/forecast")
    public ResponseEntity<Forecast> forecast(@PathVariable Long amenityId, @RequestParam(defaultValue = "14") int days) {
        return ResponseEntity.ok(forecastingService.generateForecast(1L, amenityId, days));
    }

    @GetMapping("/incidents/{incidentId}/triage")
    public ResponseEntity<TriageLabel> triage(@PathVariable Long incidentId, @RequestParam(defaultValue = "incident report") String text) {
        return ResponseEntity.ok(triageService.triageIncident(incidentId, text));
    }

    @GetMapping("/maintenance/risk")
    public ResponseEntity<MaintenanceRisk> risk(@RequestParam Long amenityId) {
        return ResponseEntity.ok(maintenanceRiskService.computeRisk(1L, amenityId));
    }

    @GetMapping("/anomalies")
    public List<AnomalyAlert> anomalies(@RequestParam String metric, @RequestParam Long circleId, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {
        return anomalyService.find(metric, circleId, from, to);
    }

    @PostMapping("/anomalies/{id}/ack")
    public ResponseEntity<AnomalyAlert> ack(@PathVariable Long id) { return ResponseEntity.ok(anomalyService.ack(id)); }

    @GetMapping("/summary/dashboard")
    public ResponseEntity<DashboardSummary> summary() {
        DashboardSummary s = new DashboardSummary();
        s.bookingsPerWeek = 42;
        s.approvalSlaHours = 3.2;
        s.incidentSlaHours = 5.6;
        s.openAlerts = 1;
        return ResponseEntity.ok(s);
    }

    @Data
    public static class DashboardSummary {
        public int bookingsPerWeek;
        public double approvalSlaHours;
        public double incidentSlaHours;
        public int openAlerts;
    }
}