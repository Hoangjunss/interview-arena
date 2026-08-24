package com.interviewarena.flashcard;

import com.interviewarena.flashcard.dto.DueCardResponse;
import com.interviewarena.flashcard.dto.ReviewCardRequest;
import jakarta.validation.Valid;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/flashcards")
public class FlashcardController {

    private final FlashcardService flashcardService;

    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @GetMapping("/due")
    public List<DueCardResponse> due() {
        return flashcardService.dueCards(currentUserId());
    }

    @PostMapping("/{questionId}/review")
    public void review(@PathVariable UUID questionId, @Valid @RequestBody ReviewCardRequest request) {
        UUID userId = currentUserId();
        flashcardService.reviewCard(userId, questionId, request.rating());
    }

    private UUID currentUserId() {
        return UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
