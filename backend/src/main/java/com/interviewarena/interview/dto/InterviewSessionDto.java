package com.interviewarena.interview.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record InterviewSessionDto(
    UUID id,
    String position,
    String technology,
    String level,
    String status,
    Integer finalScore,
    Instant startedAt,
    Instant completedAt,
    List<InterviewTurnDto> turns
) {}
