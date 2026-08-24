package com.interviewarena.progress.dto;

public record ProgressResponse(
    int completedInterviews,
    double averageInterviewScore,
    double quizAccuracyPercent,
    long cardsReviewedTotal
) {}
