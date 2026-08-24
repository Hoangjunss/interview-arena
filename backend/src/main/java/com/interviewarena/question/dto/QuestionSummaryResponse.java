package com.interviewarena.question.dto;

import java.util.UUID;

public record QuestionSummaryResponse(UUID id, String slug, String position, String technology, String level) {}
