package com.interviewarena.flashcard.dto;

import com.interviewarena.flashcard.ReviewRating;
import jakarta.validation.constraints.NotNull;

public record ReviewCardRequest(@NotNull ReviewRating rating) {}
