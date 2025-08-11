package com.localconnector.community.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
public class Incident {
  public enum Status { OPEN, IN_PROGRESS, RESOLVED }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long reporterUserId;
  private String type; // SECURITY | MAINTENANCE | OTHER
  @Lob
  private String description;
  private String locationHint;
  private OffsetDateTime reportedAt = OffsetDateTime.now();
  private Integer severity;

  @Enumerated(EnumType.STRING)
  private Status status = Status.OPEN;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public Long getReporterUserId() { return reporterUserId; }
  public void setReporterUserId(Long reporterUserId) { this.reporterUserId = reporterUserId; }
  public String getType() { return type; }
  public void setType(String type) { this.type = type; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public String getLocationHint() { return locationHint; }
  public void setLocationHint(String locationHint) { this.locationHint = locationHint; }
  public OffsetDateTime getReportedAt() { return reportedAt; }
  public void setReportedAt(OffsetDateTime reportedAt) { this.reportedAt = reportedAt; }
  public Integer getSeverity() { return severity; }
  public void setSeverity(Integer severity) { this.severity = severity; }
  public Status getStatus() { return status; }
  public void setStatus(Status status) { this.status = status; }
}


