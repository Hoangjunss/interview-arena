package com.interviewarena.config;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ProductionSafetyConfigTest {

    @Test
    void validateSafety_throwsWhenDefaultSecretIsUsed() {
        String defaultSecret = "dev-only-secret-do-not-use-in-prod-please-change-to-something-longer";
        ProductionSafetyConfig config = new ProductionSafetyConfig(defaultSecret, "valid-key");

        assertThatThrownBy(config::validateSafety)
            .isInstanceOf(IllegalStateException.class)
            .hasMessageContaining("FATAL: JWT_SECRET retains the default development value");
    }

    @Test
    void validateSafety_throwsWhenLlmKeyIsBlank() {
        ProductionSafetyConfig config = new ProductionSafetyConfig("custom-secret-long-enough-for-security", "");

        assertThatThrownBy(config::validateSafety)
            .isInstanceOf(IllegalStateException.class)
            .hasMessageContaining("FATAL: LLM_API_KEY must not be blank");
    }

    @Test
    void validateSafety_doesNotThrowWhenConfigIsValid() {
        ProductionSafetyConfig config = new ProductionSafetyConfig("custom-secret-long-enough-for-security", "valid-key");

        assertThatCode(config::validateSafety).doesNotThrowAnyException();
    }
}
