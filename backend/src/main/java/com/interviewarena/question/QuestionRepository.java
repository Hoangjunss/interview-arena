package com.interviewarena.question;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, UUID> {
    Optional<Question> findBySlug(String slug);
    List<Question> findByStatus(QuestionStatus status);
    List<Question> findByStatusAndPositionAndTechnologyAndLevel(
        QuestionStatus status, String position, String technology, String level);

    Page<Question> findByStatusAndPositionAndTechnologyAndLevel(
        QuestionStatus status, String position, String technology, String level, Pageable pageable);

    @Query("SELECT q.id FROM Question q WHERE q.status = 'ACTIVE' AND NOT EXISTS " +
           "(SELECT 1 FROM FlashcardReview r WHERE r.questionId = q.id AND r.userId = :userId)")
    List<UUID> findNeverReviewedQuestionIds(@Param("userId") UUID userId);
}
