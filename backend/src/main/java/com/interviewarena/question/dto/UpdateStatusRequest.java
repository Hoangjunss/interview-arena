package com.interviewarena.question.dto;

import jakarta.validation.constraints.NotNull;
import com.interviewarena.question.QuestionStatus;

public record UpdateStatusRequest(@NotNull QuestionStatus status) {}
