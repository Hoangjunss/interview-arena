package com.interviewarena.interview;

import com.interviewarena.interview.llm.LlmClient;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InterviewScoringWorkerTest {

    @Mock private InterviewSessionRepository sessionRepository;
    @Mock private InterviewTurnRepository turnRepository;
    @Mock private LlmClient llmClient;
    private final InterviewPromptBuilder promptBuilder = new InterviewPromptBuilder(2);

    private InterviewSession activeSession(UUID id) {
        InterviewSession s = new InterviewSession();
        s.setId(id);
        s.setPosition("frontend");
        s.setTechnology("react");
        s.setLevel("mid");
        s.setStatus(InterviewStatus.ACTIVE);
        return s;
    }

    private InterviewTurn answeredTurn(UUID sessionId, int order) {
        InterviewTurn t = new InterviewTurn();
        t.setSessionId(sessionId);
        t.setTurnOrder(order);
        t.setQuestionText("Q" + order);
        t.setAnswerText("A" + order);
        return t;
    }

    @Test
    void onAnswerSubmitted_createsFollowUpTurnWhenQuestionsRemain() {
        UUID sessionId = UUID.randomUUID();
        InterviewSession session = activeSession(sessionId);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));
        when(turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId))
            .thenReturn(List.of(answeredTurn(sessionId, 1)));
        when(llmClient.complete(any())).thenReturn("Câu hỏi 2?");
        when(turnRepository.save(any(InterviewTurn.class))).thenAnswer(inv -> inv.getArgument(0));

        InterviewScoringWorker worker = new InterviewScoringWorker(
            sessionRepository, turnRepository, llmClient, promptBuilder);
        worker.onAnswerSubmitted(new InterviewAnswerSubmittedEvent(sessionId, 1));

        verify(turnRepository).save(argThat(t -> t.getTurnOrder() == 2 && t.getQuestionText().equals("Câu hỏi 2?")));
        verify(sessionRepository, never()).save(argThat(s -> s.getStatus() == InterviewStatus.COMPLETED));
    }

    @Test
    void onAnswerSubmitted_completesSessionWithScoreOnLastTurn() {
        UUID sessionId = UUID.randomUUID();
        InterviewSession session = activeSession(sessionId);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));
        InterviewTurn turn1 = answeredTurn(sessionId, 1);
        InterviewTurn turn2 = answeredTurn(sessionId, 2);
        when(turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId)).thenReturn(List.of(turn1, turn2));
        when(llmClient.complete(any())).thenReturn("""
            {"finalScore": 82, "turnFeedback": [
              {"turnOrder": 1, "feedback": "Tốt"},
              {"turnOrder": 2, "feedback": "Khá tốt"}
            ]}
            """);

        InterviewScoringWorker worker = new InterviewScoringWorker(
            sessionRepository, turnRepository, llmClient, promptBuilder);
        worker.onAnswerSubmitted(new InterviewAnswerSubmittedEvent(sessionId, 2));

        assertThat(session.getStatus()).isEqualTo(InterviewStatus.COMPLETED);
        assertThat(session.getFinalScore()).isEqualTo(82);
        assertThat(turn1.getFollowUpFeedback()).isEqualTo("Tốt");
        assertThat(turn2.getFollowUpFeedback()).isEqualTo("Khá tốt");
        verify(sessionRepository).save(session);
    }

    @Test
    void onAnswerSubmitted_marksSessionFailedWhenScoringJsonIsMalformed() {
        UUID sessionId = UUID.randomUUID();
        InterviewSession session = activeSession(sessionId);
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));
        InterviewTurn turn1 = answeredTurn(sessionId, 1);
        InterviewTurn turn2 = answeredTurn(sessionId, 2);
        when(turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId)).thenReturn(List.of(turn1, turn2));
        when(llmClient.complete(any())).thenReturn("not valid json at all");

        InterviewScoringWorker worker = new InterviewScoringWorker(
            sessionRepository, turnRepository, llmClient, promptBuilder);
        worker.onAnswerSubmitted(new InterviewAnswerSubmittedEvent(sessionId, 2));

        assertThat(session.getStatus()).isEqualTo(InterviewStatus.FAILED);
        verify(sessionRepository).save(session);
    }
}
