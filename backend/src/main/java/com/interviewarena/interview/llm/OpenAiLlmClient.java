package com.interviewarena.interview.llm;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class OpenAiLlmClient implements LlmClient {

    private final RestClient restClient;
    private final String apiKey;
    private final String model;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public OpenAiLlmClient(RestClient restClient, String apiKey, String model) {
        this.restClient = restClient;
        this.apiKey = apiKey;
        this.model = model;
    }

    @Override
    public String complete(List<LlmMessage> messages) {
        Map<String, Object> body = Map.of(
            "model", model,
            "messages", messages.stream()
                .map(m -> Map.of("role", m.role(), "content", m.content()))
                .collect(Collectors.toList())
        );

        String response = restClient.post()
            .uri("/chat/completions")
            .header("Authorization", "Bearer " + apiKey)
            .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
            .body(body)
            .retrieve()
            .body(String.class);

        try {
            JsonNode root = objectMapper.readTree(response);
            return root.path("choices").get(0).path("message").path("content").asText();
        } catch (Exception e) {
            throw new IllegalStateException("Unexpected LLM response shape: " + response, e);
        }
    }
}
