package com.interviewarena.interview;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.testcontainers.containers.PostgreSQLContainer;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class InterviewTurnRepositoryTest {

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

    @Autowired private InterviewSessionRepository sessionRepository;
    @Autowired private InterviewTurnRepository turnRepository;
    @Autowired private JdbcTemplate jdbcTemplate;

    private UUID insertUser() {
        UUID id = UUID.randomUUID();
        jdbcTemplate.update(
            "INSERT INTO users (id, email, password_hash, display_name) VALUES (?, ?, 'x', 'x')",
            id, id + "@example.com");
        return id;
    }

    @org.junit.jupiter.api.BeforeEach
    void setUp() {
        turnRepository.deleteAllInBatch();
        sessionRepository.deleteAllInBatch();
        jdbcTemplate.execute("DELETE FROM users");
    }

    @Test
    void findBySessionIdOrderByTurnOrderAsc_returnsTurnsInOrder() {
        InterviewSession session = new InterviewSession();
        session.setUserId(insertUser());
        session.setPosition("frontend");
        session.setTechnology("react");
        session.setLevel("mid");
        session.setStatus(InterviewStatus.ACTIVE);
        session = sessionRepository.save(session);

        InterviewTurn turn2 = newTurn(session.getId(), 2, "Q2");
        InterviewTurn turn1 = newTurn(session.getId(), 1, "Q1");
        turnRepository.save(turn2);
        turnRepository.save(turn1);

        List<InterviewTurn> result = turnRepository.findBySessionIdOrderByTurnOrderAsc(session.getId());

        assertThat(result).extracting(InterviewTurn::getQuestionText).containsExactly("Q1", "Q2");
    }

    private InterviewTurn newTurn(UUID sessionId, int order, String question) {
        InterviewTurn turn = new InterviewTurn();
        turn.setSessionId(sessionId);
        turn.setTurnOrder(order);
        turn.setQuestionText(question);
        return turn;
    }
}
