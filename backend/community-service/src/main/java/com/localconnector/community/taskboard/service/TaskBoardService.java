package com.localconnector.community.taskboard.service;

import com.localconnector.community.taskboard.model.TaskOffer;
import com.localconnector.community.taskboard.model.TaskPost;
import com.localconnector.community.taskboard.repo.TaskOfferRepository;
import com.localconnector.community.taskboard.repo.TaskPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskBoardService {
    private final TaskPostRepository postRepository;
    private final TaskOfferRepository offerRepository;

    @Transactional
    public TaskPost createPost(Long circleId, String authorUserId, TaskPost.Type type, String title, String body, Instant startAt, Instant endAt, Long priceCents) {
        TaskPost post = TaskPost.builder()
                .circleId(circleId)
                .authorUserId(authorUserId)
                .type(type)
                .title(title)
                .body(body)
                .startAt(startAt)
                .endAt(endAt)
                .priceCents(priceCents)
                .status(TaskPost.Status.OPEN)
                .createdAt(Instant.now())
                .build();
        return postRepository.save(post);
    }

    public List<TaskPost> listPosts(Long circleId, TaskPost.Type type, TaskPost.Status status) {
        if (type != null) return postRepository.findByCircleIdAndType(circleId, type);
        if (status != null) return postRepository.findByCircleIdAndStatus(circleId, status);
        return postRepository.findByCircleId(circleId);
    }

    @Transactional
    public TaskOffer createOffer(Long postId, String userId, String message, Long priceCents) {
        TaskOffer offer = TaskOffer.builder()
                .postId(postId)
                .userId(userId)
                .message(message)
                .priceCents(priceCents)
                .status(TaskOffer.Status.PENDING)
                .createdAt(Instant.now())
                .build();
        return offerRepository.save(offer);
    }

    @Transactional
    public TaskOffer updateOfferStatus(Long offerId, TaskOffer.Status status) {
        TaskOffer offer = offerRepository.findById(offerId).orElseThrow();
        offer.setStatus(status);
        return offerRepository.save(offer);
    }

    @Transactional
    public TaskPost completePost(Long postId) {
        TaskPost post = postRepository.findById(postId).orElseThrow();
        post.setStatus(TaskPost.Status.COMPLETED);
        return postRepository.save(post);
    }

    public List<TaskOffer> listOffers(Long postId) {
        return offerRepository.findByPostId(postId);
    }
}