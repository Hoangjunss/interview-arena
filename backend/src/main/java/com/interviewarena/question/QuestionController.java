package com.interviewarena.question;

import com.interviewarena.question.dto.QuestionDetailResponse;
import com.interviewarena.question.dto.QuestionSummaryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public Page<QuestionSummaryResponse> list(
        @RequestParam String position,
        @RequestParam String technology,
        @RequestParam String level,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return questionService.list(position, technology, level, PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public QuestionDetailResponse detail(@PathVariable UUID id) {
        return questionService.getDetail(id);
    }

    @PatchMapping("/{id}/status")
    public QuestionSummaryResponse updateStatus(
        @PathVariable UUID id,
        @jakarta.validation.Valid @RequestBody com.interviewarena.question.dto.UpdateStatusRequest request
    ) {
        return questionService.updateStatus(id, request.status());
    }
}
