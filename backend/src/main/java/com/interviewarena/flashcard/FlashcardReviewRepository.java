package com.interviewarena.flashcard;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FlashcardReviewRepository extends JpaRepository<FlashcardReview, UUID> {
    Optional<FlashcardReview> findByUserIdAndQuestionId(UUID userId, UUID questionId);
    List<FlashcardReview> findByUserId(UUID userId);
    long countByUserId(UUID userId);

    @EntityGraph(attributePaths = {"question"})
    List<FlashcardReview> findByUserIdAndDueAtLessThanEqual(UUID userId, Instant now);

    @Query("SELECT r.questionId FROM FlashcardReview r WHERE r.userId = :userId AND r.dueAt <= :now")
    List<UUID> findDueQuestionIds(@Param("userId") UUID userId, @Param("now") Instant now);
}
