package com.interviewarena.auth;

import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class JwtServiceTest {

    private final JwtService jwtService = new JwtService(
        "test-secret-key-must-be-at-least-256-bits-long-for-hs256!!", 60);

    @Test
    void generateAndExtract_roundTripsUserId() {
        UUID userId = UUID.randomUUID();

        String token = jwtService.generateToken(userId, "dev@example.com");
        UUID extracted = jwtService.extractUserId(token);

        assertThat(extracted).isEqualTo(userId);
    }

    @Test
    void extractUserId_throwsOnGarbageToken() {
        assertThatThrownBy(() -> jwtService.extractUserId("not-a-real-token"))
            .isInstanceOf(JwtException.class);
    }
}
