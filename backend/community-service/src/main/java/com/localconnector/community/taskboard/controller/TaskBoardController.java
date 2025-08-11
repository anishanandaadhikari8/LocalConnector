package com.localconnector.community.taskboard.controller;

import com.localconnector.community.taskboard.model.TaskOffer;
import com.localconnector.community.taskboard.model.TaskPost;
import com.localconnector.community.taskboard.service.TaskBoardService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class TaskBoardController {
    private final TaskBoardService service;

    @PostMapping("/task-posts")
    public ResponseEntity<TaskPost> create(@AuthenticationPrincipal UserDetails user, @RequestBody CreatePostRequest req) {
        TaskPost post = service.createPost(req.circleId, user.getUsername(), req.type, req.title, req.body, req.startAt, req.endAt, req.priceCents);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/task-posts")
    public List<TaskPost> list(@RequestParam Long circleId, @RequestParam(required = false) TaskPost.Type type, @RequestParam(required = false) TaskPost.Status status) {
        return service.listPosts(circleId, type, status);
    }

    @PostMapping("/task-posts/{id}/offers")
    public ResponseEntity<TaskOffer> offer(@PathVariable Long id, @AuthenticationPrincipal UserDetails user, @RequestBody CreateOfferRequest req) {
        return ResponseEntity.ok(service.createOffer(id, user.getUsername(), req.message, req.priceCents));
    }

    @PatchMapping("/task-offers/{id}")
    public ResponseEntity<TaskOffer> updateOffer(@PathVariable Long id, @RequestBody UpdateOfferRequest req) {
        return ResponseEntity.ok(service.updateOfferStatus(id, req.status));
    }

    @PostMapping("/task-posts/{id}/complete")
    public ResponseEntity<TaskPost> complete(@PathVariable Long id) {
        return ResponseEntity.ok(service.completePost(id));
    }

    @GetMapping("/task-posts/{id}/offers")
    public List<TaskOffer> listOffers(@PathVariable Long id) {
        return service.listOffers(id);
    }

    @Data
    public static class CreatePostRequest {
        public Long circleId;
        public TaskPost.Type type;
        public String title;
        public String body;
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        public Instant startAt;
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        public Instant endAt;
        public Long priceCents;
    }

    @Data
    public static class CreateOfferRequest {
        public String message;
        public Long priceCents;
    }

    @Data
    public static class UpdateOfferRequest {
        public TaskOffer.Status status;
    }
}