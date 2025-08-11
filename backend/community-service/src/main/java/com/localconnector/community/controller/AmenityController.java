package com.localconnector.community.controller;

import com.localconnector.community.domain.Amenity;
import com.localconnector.community.repo.AmenityRepository;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/amenities")
public class AmenityController {
  private final AmenityRepository amenityRepository;
  public AmenityController(AmenityRepository amenityRepository) { this.amenityRepository = amenityRepository; }

  @GetMapping
  public List<Amenity> list() { return amenityRepository.findAll(); }

  @GetMapping("/{id}")
  public Amenity get(@PathVariable Long id) { return amenityRepository.findById(id).orElseThrow(); }

  @PostMapping
  @PreAuthorize("hasAuthority('ADMIN')")
  public Amenity create(@RequestBody Amenity a) { return amenityRepository.save(a); }
}


