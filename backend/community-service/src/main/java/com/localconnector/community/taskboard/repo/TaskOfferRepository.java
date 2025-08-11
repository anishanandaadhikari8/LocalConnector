package com.localconnector.community.taskboard.repo;

import com.localconnector.community.taskboard.model.TaskOffer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskOfferRepository extends JpaRepository<TaskOffer, Long> {
    List<TaskOffer> findByPostId(Long postId);
}