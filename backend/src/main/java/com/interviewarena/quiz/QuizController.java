package com.interviewarena.quiz;

import com.interviewarena.quiz.dto.QuizResultResponse;
import com.interviewarena.quiz.dto.SubmitAnswerRequest;
import jakarta.validation.Valid;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/{questionId}/submit")
    public QuizResultResponse submit(@PathVariable UUID questionId, @Valid @RequestBody SubmitAnswerRequest request) {
        UUID userId = UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
        return quizService.submitAnswer(userId, questionId, request.selectedIndex());
    }
}
