package com.interviewarena.question;

import com.interviewarena.question.dto.QuestionDetailResponse;
import com.interviewarena.question.dto.QuestionSummaryResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public List<QuestionSummaryResponse> list(
        @RequestParam String position,
        @RequestParam String technology,
        @RequestParam String level
    ) {
        return questionService.list(position, technology, level);
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
