package com.interviewarena.interview;

import java.util.List;

public record ScoringResult(int finalScore, List<TurnFeedback> turnFeedback) {
    public record TurnFeedback(int turnOrder, String feedback) {}
}
