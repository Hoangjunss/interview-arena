package com.interviewarena.question.dto;

import java.util.UUID;

public record QuestionDetailResponse(
    UUID id, String slug, String position, String technology, String level, String markdownBody
) {}
