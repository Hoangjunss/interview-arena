package com.interviewarena.flashcard;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.testcontainers.containers.PostgreSQLContainer;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class FlashcardReviewRepositoryTest {

    static {
        if (checkDockerAvailable()) {
            PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");
            postgres.start();
            System.setProperty("spring.datasource.url", postgres.getJdbcUrl());
            System.setProperty("spring.datasource.username", postgres.getUsername());
            System.setProperty("spring.datasource.password", postgres.getPassword());
        } else {
            System.setProperty("spring.datasource.url", "jdbc:postgresql://localhost:5432/interview_arena");
            System.setProperty("spring.datasource.username", "interview_arena");
            System.setProperty("spring.datasource.password", "interview_arena");
        }
    }

    private static boolean checkDockerAvailable() {
        try {
            return org.testcontainers.DockerClientFactory.instance().isDockerAvailable();
        } catch (Throwable t) {
            return false;
        }
    }

    @Autowired
    private FlashcardReviewRepository repository;
    @Autowired
    private org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    private UUID insertUser() {
        UUID id = UUID.randomUUID();
        jdbcTemplate.update(
            "INSERT INTO users (id, email, password_hash, display_name) VALUES (?, ?, 'x', 'x')",
            id, id + "@example.com");
        return id;
    }

    private UUID insertQuestion() {
        UUID id = UUID.randomUUID();
        jdbcTemplate.update(
            "INSERT INTO questions (id, slug, position, technology, level, source, status, content_path) " +
            "VALUES (?, ?, 'frontend', 'react', 'mid', 'MANUAL', 'ACTIVE', 'x.md')",
            id, "slug-" + id);
        return id;
    }

    @org.junit.jupiter.api.BeforeEach
    void setUp() {
        repository.deleteAllInBatch();
        jdbcTemplate.execute("DELETE FROM users");
        jdbcTemplate.execute("DELETE FROM questions");
    }

    @Test
    void findByUserIdAndDueAtLessThanEqual_returnsOnlyDueCards() {
        UUID userId = insertUser();
        UUID dueQuestionId = insertQuestion();
        UUID futureQuestionId = insertQuestion();

        FlashcardReview due = new FlashcardReview();
        due.setUserId(userId);
        due.setQuestionId(dueQuestionId);
        due.setDueAt(Instant.now().minus(1, ChronoUnit.DAYS));
        repository.save(due);

        FlashcardReview future = new FlashcardReview();
        future.setUserId(userId);
        future.setQuestionId(futureQuestionId);
        future.setDueAt(Instant.now().plus(5, ChronoUnit.DAYS));
        repository.save(future);

        List<FlashcardReview> result = repository.findByUserIdAndDueAtLessThanEqual(userId, Instant.now());

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getQuestionId()).isEqualTo(dueQuestionId);
    }
}
