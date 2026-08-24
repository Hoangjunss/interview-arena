package com.interviewarena.question;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.testcontainers.containers.PostgreSQLContainer;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class QuestionRepositoryTest {

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
    private QuestionRepository questionRepository;

    @org.junit.jupiter.api.BeforeEach
    void setUp() {
        questionRepository.deleteAllInBatch();
    }

    private Question sample(String slug, QuestionStatus status) {
        Question q = new Question();
        q.setSlug(slug);
        q.setPosition("frontend");
        q.setTechnology("react");
        q.setLevel("mid");
        q.setSource("MANUAL");
        q.setStatus(status);
        q.setContentPath("content/questions/frontend/react/" + slug + ".md");
        q.setSyncedAt(Instant.now());
        return q;
    }

    @Test
    void findByStatusAndFilters_returnsOnlyMatchingActiveQuestions() {
        questionRepository.save(sample("react-q1", QuestionStatus.ACTIVE));
        questionRepository.save(sample("react-q2", QuestionStatus.DRAFT));

        List<Question> result = questionRepository
            .findByStatusAndPositionAndTechnologyAndLevel(QuestionStatus.ACTIVE, "frontend", "react", "mid");

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getSlug()).isEqualTo("react-q1");
    }

    @Test
    void findBySlug_returnsEmptyWhenMissing() {
        assertThat(questionRepository.findBySlug("does-not-exist")).isEmpty();
    }
}
