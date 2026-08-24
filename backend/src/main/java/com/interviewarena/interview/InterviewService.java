package com.interviewarena.interview;

import com.interviewarena.config.KafkaConfig;
import com.interviewarena.interview.dto.InterviewSessionDto;
import com.interviewarena.interview.dto.InterviewTurnDto;
import com.interviewarena.interview.dto.StartInterviewRequest;
import com.interviewarena.interview.llm.LlmClient;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class InterviewService {

    private final InterviewSessionRepository sessionRepository;
    private final InterviewTurnRepository turnRepository;
    private final LlmClient llmClient;
    private final InterviewPromptBuilder promptBuilder;
    private final KafkaTemplate<String, InterviewAnswerSubmittedEvent> kafkaTemplate;

    public InterviewService(
        InterviewSessionRepository sessionRepository,
        InterviewTurnRepository turnRepository,
        LlmClient llmClient,
        InterviewPromptBuilder promptBuilder,
        KafkaTemplate<String, InterviewAnswerSubmittedEvent> kafkaTemplate
    ) {
        this.sessionRepository = sessionRepository;
        this.turnRepository = turnRepository;
        this.llmClient = llmClient;
        this.promptBuilder = promptBuilder;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Transactional
    public InterviewSessionDto startSession(UUID userId, StartInterviewRequest request) {
        InterviewSession session = new InterviewSession();
        session.setUserId(userId);
        session.setPosition(request.position());
        session.setTechnology(request.technology());
        session.setLevel(request.level());
        session.setStatus(InterviewStatus.ACTIVE);
        session = sessionRepository.save(session);

        String firstQuestion = llmClient.complete(promptBuilder.buildQuestionPrompt(session, List.of()));

        InterviewTurn firstTurn = new InterviewTurn();
        firstTurn.setSessionId(session.getId());
        firstTurn.setTurnOrder(1);
        firstTurn.setQuestionText(firstQuestion);
        turnRepository.save(firstTurn);

        return toDto(session, List.of(firstTurn));
    }

    @Transactional
    public void submitAnswer(UUID userId, UUID sessionId, String answerText) {
        InterviewSession session = sessionRepository.findById(sessionId)
            .orElseThrow(() -> new NoSuchElementException("Session not found: " + sessionId));

        if (!session.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized session access");
        }

        if (session.getStatus() != InterviewStatus.ACTIVE) {
            throw new IllegalStateException("Session is not active");
        }

        List<InterviewTurn> turns = turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId);
        if (turns.isEmpty()) {
            throw new IllegalStateException("No turns found for active session");
        }

        InterviewTurn latestTurn = turns.get(turns.size() - 1);
        if (latestTurn.getAnswerText() != null) {
            throw new IllegalStateException("Latest turn has already been answered");
        }

        latestTurn.setAnswerText(answerText);
        latestTurn.setAnsweredAt(Instant.now());
        turnRepository.save(latestTurn);

        kafkaTemplate.send(
            KafkaConfig.INTERVIEW_ANSWER_SUBMITTED_TOPIC,
            new InterviewAnswerSubmittedEvent(sessionId, latestTurn.getTurnOrder())
        );
    }

    @Transactional(readOnly = true)
    public InterviewSessionDto getSession(UUID userId, UUID sessionId) {
        InterviewSession session = sessionRepository.findById(sessionId)
            .orElseThrow(() -> new NoSuchElementException("Session not found: " + sessionId));

        if (!session.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized session access");
        }

        List<InterviewTurn> turns = turnRepository.findBySessionIdOrderByTurnOrderAsc(sessionId);
        return toDto(session, turns);
    }

    private InterviewSessionDto toDto(InterviewSession session, List<InterviewTurn> turns) {
        List<InterviewTurnDto> turnDtos = turns.stream()
            .map(t -> new InterviewTurnDto(
                t.getId(),
                t.getTurnOrder(),
                t.getQuestionText(),
                t.getAnswerText(),
                t.getFollowUpFeedback(),
                t.getAskedAt(),
                t.getAnsweredAt()
            ))
            .toList();

        return new InterviewSessionDto(
            session.getId(),
            session.getPosition(),
            session.getTechnology(),
            session.getLevel(),
            session.getStatus().name(),
            session.getFinalScore(),
            session.getStartedAt(),
            session.getCompletedAt(),
            turnDtos
        );
    }
}
