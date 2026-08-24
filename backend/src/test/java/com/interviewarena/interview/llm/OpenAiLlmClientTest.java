package com.interviewarena.interview.llm;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.*;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

class OpenAiLlmClientTest {

    @Test
    void complete_extractsMessageContentFromChatCompletionResponse() {
        RestClient.Builder builder = RestClient.builder().baseUrl("https://fake-llm.test/v1");
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        RestClient restClient = builder.build();

        server.expect(requestTo("https://fake-llm.test/v1/chat/completions"))
            .andExpect(method(org.springframework.http.HttpMethod.POST))
            .andExpect(header("Authorization", "Bearer test-key"))
            .andRespond(withSuccess("""
                {"choices":[{"message":{"role":"assistant","content":"Câu hỏi tiếp theo?"}}]}
                """, MediaType.APPLICATION_JSON));

        OpenAiLlmClient client = new OpenAiLlmClient(restClient, "test-key", "gpt-4o-mini");

        String result = client.complete(List.of(new LlmMessage("user", "Xin chào")));

        assertThat(result).isEqualTo("Câu hỏi tiếp theo?");
        server.verify();
    }
}
