package com.localconnector.community.service;

import com.localconnector.community.domain.Announcement;
import com.localconnector.community.repo.AnnouncementRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AnnouncementService {
  private final AnnouncementRepository announcementRepository;

  public AnnouncementService(AnnouncementRepository announcementRepository) {
    this.announcementRepository = announcementRepository;
  }

  public List<Announcement> list() { return announcementRepository.findPinnedThenNewest(); }

  public Announcement create(Announcement a) { return announcementRepository.save(a); }

  public Announcement pin(Long id, boolean pinned) {
    Announcement a = announcementRepository.findById(id).orElseThrow();
    a.setPinned(pinned);
    return announcementRepository.save(a);
  }
}


