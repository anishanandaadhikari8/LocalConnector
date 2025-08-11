package com.localconnector.community.taskboard.repo;

import com.localconnector.community.taskboard.model.TaskPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskPostRepository extends JpaRepository<TaskPost, Long> {
    List<TaskPost> findByCircleId(Long circleId);
    List<TaskPost> findByCircleIdAndType(Long circleId, TaskPost.Type type);
    List<TaskPost> findByCircleIdAndStatus(Long circleId, TaskPost.Status status);
}