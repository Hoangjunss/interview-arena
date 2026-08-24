package com.interviewarena.flashcard;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class Sm2Calculator {

    private static final double EASE_FLOOR = 1.3;

    public record Sm2Result(int intervalDays, double easeFactor, int repetitions, Instant dueAt) {}

    public Sm2Result apply(FlashcardReview current, ReviewRating rating) {
        double quality = switch (rating) {
            case AGAIN -> 0;
            case HARD -> 3;
            case GOOD -> 4;
            case EASY -> 5;
        };

        if (rating == ReviewRating.AGAIN) {
            int interval = 1;
            double ease = adjustEase(current.getEaseFactor(), quality);
            return new Sm2Result(interval, ease, 0, dueIn(interval));
        }

        double ease = adjustEase(current.getEaseFactor(), quality);
        int repetitions = current.getRepetitions() + 1;
        int interval;
        if (repetitions == 1) {
            interval = 1;
        } else if (repetitions == 2) {
            interval = 6;
        } else {
            interval = (int) Math.round(current.getIntervalDays() * ease);
        }
        return new Sm2Result(interval, ease, repetitions, dueIn(interval));
    }

    private double adjustEase(double currentEase, double quality) {
        double newEase = currentEase + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        return Math.max(EASE_FLOOR, newEase);
    }

    private Instant dueIn(int days) {
        return Instant.now().plus(days, ChronoUnit.DAYS);
    }
}
