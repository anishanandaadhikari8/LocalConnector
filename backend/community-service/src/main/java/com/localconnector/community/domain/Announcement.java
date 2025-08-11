package com.localconnector.community.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
public class Announcement {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  @Lob
  private String body;
  private OffsetDateTime createdAt = OffsetDateTime.now();
  private Long createdByUserId;
  private boolean pinned = false;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getBody() { return body; }
  public void setBody(String body) { this.body = body; }
  public OffsetDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
  public Long getCreatedByUserId() { return createdByUserId; }
  public void setCreatedByUserId(Long createdByUserId) { this.createdByUserId = createdByUserId; }
  public boolean isPinned() { return pinned; }
  public void setPinned(boolean pinned) { this.pinned = pinned; }
}


