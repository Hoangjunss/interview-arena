package com.interviewarena.interview;

import com.interviewarena.interview.dto.InterviewSessionDto;
import com.interviewarena.interview.dto.InterviewTurnDto;
import com.interviewarena.interview.dto.StartInterviewRequest;
import com.interviewarena.interview.dto.SubmitAnswerRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class InterviewControllerTest {

    @Mock private InterviewService interviewService;
    @Mock private InterviewQuotaService quotaService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private MockMvc mockMvc() {
        return MockMvcBuilders.standaloneSetup(new InterviewController(interviewService, quotaService)).build();
    }

    private void authenticateAs(UUID userId) {
        SecurityContextHolder.getContext().setAuthentication(
            new UsernamePasswordAuthenticationToken(userId.toString(), null, List.of()));
    }

    @Test
    void startInterview_returns201WithSessionDto() throws Exception {
        UUID userId = UUID.randomUUID();
        authenticateAs(userId);
        when(interviewService.startSession(any(), any())).thenReturn(
            new InterviewSessionDto(UUID.randomUUID(), "frontend", "react", "mid", "ACTIVE", null, null, null, List.of(new InterviewTurnDto(null, 1, "Q1", null, null, null, null))));

        mockMvc().perform(post("/api/interviews")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(new StartInterviewRequest("frontend", "react", "mid"))))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.status").value("ACTIVE"));
    }

    @Test
    void submitAnswer_returns202Processing() throws Exception {
        UUID userId = UUID.randomUUID();
        UUID sessionId = UUID.randomUUID();
        authenticateAs(userId);

        mockMvc().perform(post("/api/interviews/" + sessionId + "/answers")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(new SubmitAnswerRequest("my answer"))))
            .andExpect(status().isAccepted())
            .andExpect(jsonPath("$.status").value("PROCESSING"));
    }

    @Test
    void getSession_returns200WithCurrentState() throws Exception {
        UUID userId = UUID.randomUUID();
        UUID sessionId = UUID.randomUUID();
        authenticateAs(userId);
        when(interviewService.getSession(any(), any())).thenReturn(
            new InterviewSessionDto(sessionId, "frontend", "react", "mid", "COMPLETED", 82, null, null, List.of()));

        mockMvc().perform(get("/api/interviews/" + sessionId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.finalScore").value(82));
    }
}
