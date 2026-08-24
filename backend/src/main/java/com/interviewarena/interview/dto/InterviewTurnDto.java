package com.interviewarena.interview.dto;

import java.time.Instant;
import java.util.UUID;

public record InterviewTurnDto(
    UUID id,
    int turnOrder,
    String questionText,
    String answerText,
    String followUpFeedback,
    Instant askedAt,
    Instant answeredAt
) {}
