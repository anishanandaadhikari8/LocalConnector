package com.localconnector.community.reservations.repo;

import com.localconnector.community.reservations.model.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AmenityRepository extends JpaRepository<Amenity, Long> {
    List<Amenity> findByCircleId(Long circleId);
}