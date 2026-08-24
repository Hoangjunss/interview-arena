package com.interviewarena.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.testcontainers.containers.PostgreSQLContainer;

import java.time.Instant;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

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
    private UserRepository userRepository;

    @org.junit.jupiter.api.BeforeEach
    void setUp() {
        userRepository.deleteAllInBatch();
    }

    @Test
    void findByEmail_returnsSavedUser() {
        User user = new User();
        user.setEmail("dev@example.com");
        user.setPasswordHash("hashed");
        user.setDisplayName("Dev User");
        user.setCreatedAt(Instant.now());
        userRepository.save(user);

        Optional<User> found = userRepository.findByEmail("dev@example.com");

        assertThat(found).isPresent();
        assertThat(found.get().getDisplayName()).isEqualTo("Dev User");
    }

    @Test
    void findByEmail_returnsEmptyWhenNotFound() {
        Optional<User> found = userRepository.findByEmail("nobody@example.com");

        assertThat(found).isEmpty();
    }
}
