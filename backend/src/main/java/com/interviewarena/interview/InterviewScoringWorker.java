package com.interviewarena.interview;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewarena.interview.llm.LlmClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import static com.interviewarena.config.KafkaConfig.INTERVIEW_ANSWER_SUBMITTED_TOPIC;

@Component
public class InterviewScoringWorker {

    private static final Logger log = LoggerFactory.getLogger(InterviewScoringWorker.class);

    private final InterviewSessionRepository sessionRepository;
    private final InterviewTurnRepository turnRepository;
    private final LlmClient llmClient;
    private final InterviewPromptBuilder promptBuilder;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public InterviewScoringWorker(
        InterviewSessionRepository sessionRepository,
        InterviewTurnRepository turnRepository,
        LlmClient llmClient,
        InterviewPromptBuilder promptBuilder
    ) {
        this.sessionRepository = sessionRepository;
        this.turnRepository = turnRepository;
        this.llmClient = llmClient;
        this.promptBuilder = promptBuilder;
    }

    @KafkaListener(topics = INTERVIEW_ANSWER_SUBMITTED_TOPIC)
    public void onAnswerSubmitted(InterviewAnswerSubmittedEvent event) {
        InterviewSession session = sessionRepository.findById(event.sessionId())
            .orElseThrow(() -> new NoSuchElementException("Session not found: " + event.sessionId()));
        List<InterviewTurn> turns = turnRepository.findBySessionIdOrderByTurnOrderAsc(event.sessionId());

        boolean isLastTurn = turns.size() >= promptBuilder.totalQuestions();
        if (!isLastTurn) {
            askFollowUp(session, turns);
        } else {
            scoreSession(session, turns);
        }
    }

    private void askFollowUp(InterviewSession session, List<InterviewTurn> turns) {
        String nextQuestion = llmClient.complete(promptBuilder.buildQuestionPrompt(session, turns));
        InterviewTurn nextTurn = new InterviewTurn();
        nextTurn.setSessionId(session.getId());
        nextTurn.setTurnOrder(turns.get(turns.size() - 1).getTurnOrder() + 1);
        nextTurn.setQuestionText(nextQuestion);
        turnRepository.save(nextTurn);
    }

    private void scoreSession(InterviewSession session, List<InterviewTurn> turns) {
        String rawResponse = llmClient.complete(promptBuilder.buildScoringPrompt(session, turns));
        try {
            ScoringResult result = objectMapper.readValue(rawResponse, ScoringResult.class);
            Map<Integer, String> feedbackByTurn = result.turnFeedback().stream()
                .collect(java.util.stream.Collectors.toMap(ScoringResult.TurnFeedback::turnOrder, ScoringResult.TurnFeedback::feedback));
            for (InterviewTurn turn : turns) {
                turn.setFollowUpFeedback(feedbackByTurn.get(turn.getTurnOrder()));
                turnRepository.save(turn);
            }
            session.setFinalScore(result.finalScore());
            session.setStatus(InterviewStatus.COMPLETED);
            session.setCompletedAt(Instant.now());
        } catch (Exception e) {
            log.error("Failed to parse LLM scoring JSON for session {}: {}", session.getId(), rawResponse, e);
            session.setStatus(InterviewStatus.FAILED);
        }
        sessionRepository.save(session);
    }
}
