package com.interviewarena.interview;

import com.interviewarena.interview.dto.StartInterviewRequest;
import com.interviewarena.interview.llm.LlmClient;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InterviewServiceTest {

    @Mock private InterviewSessionRepository sessionRepository;
    @Mock private InterviewTurnRepository turnRepository;
    @Mock private LlmClient llmClient;
    @Mock private KafkaTemplate<String, InterviewAnswerSubmittedEvent> kafkaTemplate;
    private final InterviewPromptBuilder promptBuilder = new InterviewPromptBuilder(5);

    @Test
    void startSession_createsSessionAndFirstTurnFromLlm() {
        UUID userId = UUID.randomUUID();
        when(llmClient.complete(any())).thenReturn("Câu hỏi đầu tiên?");
        when(sessionRepository.save(any(InterviewSession.class))).thenAnswer(inv -> inv.getArgument(0));
        when(turnRepository.save(any(InterviewTurn.class))).thenAnswer(inv -> inv.getArgument(0));

        InterviewService service = new InterviewService(
            sessionRepository, turnRepository, llmClient, promptBuilder, kafkaTemplate);

        var result = service.startSession(userId, new StartInterviewRequest("frontend", "react", "mid"));

        assertThat(result.status()).isEqualTo("ACTIVE");
        assertThat(result.turns()).hasSize(1);
        assertThat(result.turns().get(0).questionText()).isEqualTo("Câu hỏi đầu tiên?");
    }

    @Test
    void submitAnswer_savesAnswerAndPublishesKafkaEvent() {
        UUID userId = UUID.randomUUID();
        UUID sessionId = UUID.randomUUID();

        InterviewSession session = new InterviewSession();
        session.setUserId(userId);
        session.setStatus(InterviewStatus.ACTIVE);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        InterviewTurn currentTurn = new InterviewTurn();
        currentTurn.setSessionId(sessionId);
        currentTurn.setTurnOrder(1);
        when(turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId)).thenReturn(List.of(currentTurn));
        when(turnRepository.save(any(InterviewTurn.class))).thenAnswer(inv -> inv.getArgument(0));

        InterviewService service = new InterviewService(
            sessionRepository, turnRepository, llmClient, promptBuilder, kafkaTemplate);

        service.submitAnswer(userId, sessionId, "Câu trả lời của tôi");

        assertThat(currentTurn.getAnswerText()).isEqualTo("Câu trả lời của tôi");
        ArgumentCaptor<InterviewAnswerSubmittedEvent> captor = ArgumentCaptor.forClass(InterviewAnswerSubmittedEvent.class);
        verify(kafkaTemplate).send(eq("interview-answer-submitted"), captor.capture());
        assertThat(captor.getValue().sessionId()).isEqualTo(sessionId);
        assertThat(captor.getValue().turnOrder()).isEqualTo(1);
    }

    @Test
    void submitAnswer_throwsWhenSessionBelongsToAnotherUser() {
        UUID ownerId = UUID.randomUUID();
        UUID sessionId = UUID.randomUUID();
        InterviewSession session = new InterviewSession();
        session.setUserId(ownerId);
        session.setStatus(InterviewStatus.ACTIVE);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        InterviewService service = new InterviewService(
            sessionRepository, turnRepository, llmClient, promptBuilder, kafkaTemplate);

        assertThatThrownBy(() -> service.submitAnswer(UUID.randomUUID(), sessionId, "test"))
            .isInstanceOf(IllegalArgumentException.class);
    }
}
