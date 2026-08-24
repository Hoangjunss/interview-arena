package com.interviewarena.question;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, UUID> {
    Optional<Question> findBySlug(String slug);
    List<Question> findByStatusAndPositionAndTechnologyAndLevel(
        QuestionStatus status, String position, String technology, String level);
}
