package com.interviewarena.interview;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "interview_turns")
public class InterviewTurn {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "session_id", nullable = false)
    private UUID sessionId;

    @Column(name = "turn_order", nullable = false)
    private int turnOrder;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "answer_text", columnDefinition = "TEXT")
    private String answerText;

    @Column(name = "follow_up_feedback", columnDefinition = "TEXT")
    private String followUpFeedback;

    @Column(name = "asked_at", nullable = false)
    private Instant askedAt = Instant.now();

    @Column(name = "answered_at")
    private Instant answeredAt;

    public UUID getId() { return id; }
    public UUID getSessionId() { return sessionId; }
    public void setSessionId(UUID sessionId) { this.sessionId = sessionId; }
    public int getTurnOrder() { return turnOrder; }
    public void setTurnOrder(int turnOrder) { this.turnOrder = turnOrder; }
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public String getAnswerText() { return answerText; }
    public void setAnswerText(String answerText) { this.answerText = answerText; }
    public String getFollowUpFeedback() { return followUpFeedback; }
    public void setFollowUpFeedback(String followUpFeedback) { this.followUpFeedback = followUpFeedback; }
    public Instant getAskedAt() { return askedAt; }
    public void setAskedAt(Instant askedAt) { this.askedAt = askedAt; }
    public Instant getAnsweredAt() { return answeredAt; }
    public void setAnsweredAt(Instant answeredAt) { this.answeredAt = answeredAt; }
}
