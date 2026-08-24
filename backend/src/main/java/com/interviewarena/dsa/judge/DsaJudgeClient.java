package com.interviewarena.dsa.judge;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class DsaJudgeClient {

    private static final Map<String, Integer> LANGUAGE_IDS = Map.of(
        "java", 62,
        "python", 71,
        "javascript", 63,
        "cpp", 54
    );

    private final RestClient restClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public DsaJudgeClient(RestClient restClient) {
        this.restClient = restClient;
    }

    public int languageIdFor(String language) {
        Integer id = LANGUAGE_IDS.get(language);
        if (id == null) {
            throw new IllegalArgumentException("Unsupported DSA language: " + language);
        }
        return id;
    }

    public List<JudgeResult> runBatch(List<JudgeSubmission> submissions) {
        List<Map<String, Object>> payload = submissions.stream()
            .map(s -> Map.<String, Object>of(
                "source_code", s.sourceCode(),
                "language_id", s.languageId(),
                "stdin", s.stdin(),
                "cpu_time_limit", 2,
                "memory_limit", 128000
            ))
            .collect(Collectors.toList());

        String response = restClient.post()
            .uri("/submissions/batch?base64_encoded=false&wait=true")
            .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
            .body(Map.of("submissions", payload))
            .retrieve()
            .body(String.class);

        try {
            JsonNode root = objectMapper.readTree(response);
            List<JudgeResult> results = new ArrayList<>();
            for (JsonNode node : root) {
                String stdout = node.path("stdout").isMissingNode() || node.path("stdout").isNull()
                    ? "" : node.path("stdout").asText();
                int statusId = node.path("status").path("id").asInt();
                String statusDescription = node.path("status").path("description").asText();
                results.add(new JudgeResult(stdout, statusId, statusDescription));
            }
            return results;
        } catch (Exception e) {
            throw new IllegalStateException("Unexpected Judge0 response shape: " + response, e);
        }
    }
}
