package com.interviewarena.dsa.judge;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.MediaType.APPLICATION_JSON;

class DsaJudgeClientTest {

    @Test
    void runBatch_parsesJudge0ResponseIntoResults() {
        RestClient.Builder builder = RestClient.builder().baseUrl("http://judge0.test");
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        server.expect(requestTo("http://judge0.test/submissions/batch?base64_encoded=false&wait=true"))
            .andExpect(method(POST))
            .andRespond(withSuccess("""
                [
                  {"stdout": "0,1\\n", "status": {"id": 3, "description": "Accepted"}},
                  {"stdout": "1,0\\n", "status": {"id": 3, "description": "Accepted"}}
                ]
                """, APPLICATION_JSON));

        DsaJudgeClient client = new DsaJudgeClient(builder.build());
        List<JudgeResult> results = client.runBatch(List.of(
            new JudgeSubmission("source1", 71, "2,7,11,15\n9"),
            new JudgeSubmission("source2", 71, "3,2,4\n6")
        ));

        assertThat(results).hasSize(2);
        assertThat(results.get(0).stdout()).isEqualTo("0,1\n");
        assertThat(results.get(0).isAccepted()).isTrue();
    }

    @Test
    void languageIdFor_throwsForUnsupportedLanguage() {
        DsaJudgeClient client = new DsaJudgeClient(RestClient.builder().build());
        org.junit.jupiter.api.Assertions.assertThrows(IllegalArgumentException.class,
            () -> client.languageIdFor("ruby"));
    }
}
