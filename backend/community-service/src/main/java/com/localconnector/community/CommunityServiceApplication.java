package com.localconnector.community;

import com.localconnector.community.domain.Amenity;
import com.localconnector.community.domain.Announcement;
import com.localconnector.community.repo.AmenityRepository;
import com.localconnector.community.repo.AnnouncementRepository;
import java.time.LocalTime;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CommunityServiceApplication {
  public static void main(String[] args) {
    SpringApplication.run(CommunityServiceApplication.class, args);
  }

  @Bean
  CommandLineRunner seed(AmenityRepository amenityRepo, AnnouncementRepository annRepo) {
    return args -> {
      if (amenityRepo.count() == 0) {
        Amenity a = new Amenity();
        a.setName("Clubhouse");
        a.setLocation("Ground Floor");
        a.setCapacity(30);
        a.setOpenTime(LocalTime.of(8, 0));
        a.setCloseTime(LocalTime.of(22, 0));
        a.setRequiresApproval(true);
        amenityRepo.save(a);

        Amenity b = new Amenity();
        b.setName("Gym");
        b.setLocation("Basement");
        b.setCapacity(15);
        b.setOpenTime(LocalTime.of(6, 0));
        b.setCloseTime(LocalTime.of(23, 0));
        b.setRequiresApproval(false);
        amenityRepo.save(b);
      }
      if (annRepo.count() == 0) {
        Announcement an = new Announcement();
        an.setTitle("Welcome to LocalConnector");
        an.setBody("Be respectful and enjoy the amenities!");
        an.setPinned(true);
        an.setCreatedByUserId(1L);
        annRepo.save(an);
      }
    };
  }
}


