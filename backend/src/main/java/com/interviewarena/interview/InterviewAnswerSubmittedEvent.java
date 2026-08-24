package com.interviewarena.interview;

import java.util.UUID;

public record InterviewAnswerSubmittedEvent(UUID sessionId, int turnOrder) {}
