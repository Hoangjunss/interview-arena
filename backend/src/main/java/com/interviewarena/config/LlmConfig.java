package com.interviewarena.config;

import com.interviewarena.interview.llm.LlmClient;
import com.interviewarena.interview.llm.OpenAiLlmClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class LlmConfig {

    @Bean
    public LlmClient llmClient(
        @Value("${app.llm.base-url}") String baseUrl,
        @Value("${app.llm.api-key}") String apiKey,
        @Value("${app.llm.model}") String model
    ) {
        RestClient restClient = RestClient.builder().baseUrl(baseUrl).build();
        return new OpenAiLlmClient(restClient, apiKey, model);
    }
}
