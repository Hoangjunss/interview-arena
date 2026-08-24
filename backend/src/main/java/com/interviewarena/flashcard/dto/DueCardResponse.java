package com.interviewarena.flashcard.dto;

import java.util.UUID;

public record DueCardResponse(UUID questionId, String slug) {}
