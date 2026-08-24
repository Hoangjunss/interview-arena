package com.interviewarena.flashcard;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;

class Sm2CalculatorTest {

    private final Sm2Calculator calculator = new Sm2Calculator();

    @Test
    void again_resetsRepetitionsAndIntervalToOneDay() {
        FlashcardReview card = new FlashcardReview();
        card.setRepetitions(3);
        card.setIntervalDays(10);
        card.setEaseFactor(2.5);

        Sm2Calculator.Sm2Result result = calculator.apply(card, ReviewRating.AGAIN);

        assertThat(result.repetitions()).isZero();
        assertThat(result.intervalDays()).isEqualTo(1);
    }

    @Test
    void firstGoodReview_setsIntervalToOneDay() {
        FlashcardReview card = new FlashcardReview();
        card.setRepetitions(0);
        card.setIntervalDays(0);
        card.setEaseFactor(2.5);

        Sm2Calculator.Sm2Result result = calculator.apply(card, ReviewRating.GOOD);

        assertThat(result.repetitions()).isEqualTo(1);
        assertThat(result.intervalDays()).isEqualTo(1);
    }

    @Test
    void secondGoodReview_setsIntervalToSixDays() {
        FlashcardReview card = new FlashcardReview();
        card.setRepetitions(1);
        card.setIntervalDays(1);
        card.setEaseFactor(2.5);

        Sm2Calculator.Sm2Result result = calculator.apply(card, ReviewRating.GOOD);

        assertThat(result.repetitions()).isEqualTo(2);
        assertThat(result.intervalDays()).isEqualTo(6);
    }

    @Test
    void thirdPlusGoodReview_multipliesByEaseFactor() {
        FlashcardReview card = new FlashcardReview();
        card.setRepetitions(2);
        card.setIntervalDays(6);
        card.setEaseFactor(2.5);

        Sm2Calculator.Sm2Result result = calculator.apply(card, ReviewRating.GOOD);

        assertThat(result.repetitions()).isEqualTo(3);
        assertThat(result.intervalDays()).isEqualTo(15); // round(6 * 2.5)
    }

    @Test
    void easeFactor_neverDropsBelowFloor() {
        FlashcardReview card = new FlashcardReview();
        card.setRepetitions(2);
        card.setIntervalDays(6);
        card.setEaseFactor(1.35);

        Sm2Calculator.Sm2Result result = calculator.apply(card, ReviewRating.AGAIN);

        assertThat(result.easeFactor()).isCloseTo(1.3, within(0.001));
    }
}
