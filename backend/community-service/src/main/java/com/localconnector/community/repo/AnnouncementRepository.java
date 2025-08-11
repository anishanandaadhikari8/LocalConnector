package com.localconnector.community.repo;

import com.localconnector.community.domain.Announcement;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
  @Query("select a from Announcement a order by a.pinned desc, a.createdAt desc")
  List<Announcement> findPinnedThenNewest();
}


