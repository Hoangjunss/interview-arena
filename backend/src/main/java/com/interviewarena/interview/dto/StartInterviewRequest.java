package com.interviewarena.interview.dto;

import jakarta.validation.constraints.NotBlank;

public record StartInterviewRequest(
    @NotBlank String position,
    @NotBlank String technology,
    @NotBlank String level
) {}
