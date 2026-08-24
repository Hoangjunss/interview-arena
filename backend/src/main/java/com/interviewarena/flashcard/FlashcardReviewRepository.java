package com.interviewarena.flashcard;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FlashcardReviewRepository extends JpaRepository<FlashcardReview, UUID> {
    Optional<FlashcardReview> findByUserIdAndQuestionId(UUID userId, UUID questionId);

    @EntityGraph(attributePaths = {"question"})
    List<FlashcardReview> findByUserIdAndDueAtLessThanEqual(UUID userId, Instant now);
}
