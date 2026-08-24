package com.interviewarena.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("prod")
public class ProductionSafetyConfig {

    private final String jwtSecret;
    private final String llmApiKey;

    public ProductionSafetyConfig(
        @Value("${app.jwt.secret}") String jwtSecret,
        @Value("${app.llm.api-key}") String llmApiKey
    ) {
        this.jwtSecret = jwtSecret;
        this.llmApiKey = llmApiKey;
    }

    @PostConstruct
    public void validateSafety() {
        String defaultSecret = "dev-only-secret-do-not-use-in-prod-please-change-to-something-longer";
        if (defaultSecret.equals(jwtSecret)) {
            throw new IllegalStateException("FATAL: JWT_SECRET retains the default development value in production profile!");
        }
        if (llmApiKey == null || llmApiKey.isBlank()) {
            throw new IllegalStateException("FATAL: LLM_API_KEY must not be blank in production profile!");
        }
    }
}
