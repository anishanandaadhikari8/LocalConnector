package com.localconnector.community.domain;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
public class Amenity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String location;
  private Integer capacity;
  private LocalTime openTime;
  private LocalTime closeTime;
  private boolean requiresApproval;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getLocation() { return location; }
  public void setLocation(String location) { this.location = location; }
  public Integer getCapacity() { return capacity; }
  public void setCapacity(Integer capacity) { this.capacity = capacity; }
  public LocalTime getOpenTime() { return openTime; }
  public void setOpenTime(LocalTime openTime) { this.openTime = openTime; }
  public LocalTime getCloseTime() { return closeTime; }
  public void setCloseTime(LocalTime closeTime) { this.closeTime = closeTime; }
  public boolean isRequiresApproval() { return requiresApproval; }
  public void setRequiresApproval(boolean requiresApproval) { this.requiresApproval = requiresApproval; }
}


