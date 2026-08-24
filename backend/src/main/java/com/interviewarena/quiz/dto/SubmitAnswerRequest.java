package com.interviewarena.quiz.dto;

import jakarta.validation.constraints.NotNull;

public record SubmitAnswerRequest(@NotNull Integer selectedIndex) {}
