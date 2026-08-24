package com.interviewarena.interview;

import com.interviewarena.interview.dto.InterviewSessionDto;
import com.interviewarena.interview.dto.StartInterviewRequest;
import com.interviewarena.interview.dto.SubmitAnswerRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;
    private final InterviewQuotaService quotaService;

    public InterviewController(InterviewService interviewService, InterviewQuotaService quotaService) {
        this.interviewService = interviewService;
        this.quotaService = quotaService;
    }

    @PostMapping
    public ResponseEntity<InterviewSessionDto> start(@Valid @RequestBody StartInterviewRequest request) {
        UUID userId = currentUserId();
        quotaService.checkAndConsume(userId);
        InterviewSessionDto dto = interviewService.startSession(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PostMapping("/{id}/answers")
    public ResponseEntity<Map<String, String>> submitAnswer(
        @PathVariable UUID id,
        @Valid @RequestBody SubmitAnswerRequest request
    ) {
        interviewService.submitAnswer(currentUserId(), id, request.answerText());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of("status", "PROCESSING"));
    }

    @GetMapping("/{id}")
    public InterviewSessionDto get(@PathVariable UUID id) {
        return interviewService.getSession(currentUserId(), id);
    }

    private UUID currentUserId() {
        return UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
