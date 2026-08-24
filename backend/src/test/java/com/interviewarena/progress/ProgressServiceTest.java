package com.interviewarena.progress;

import com.interviewarena.flashcard.FlashcardReviewRepository;
import com.interviewarena.interview.InterviewSession;
import com.interviewarena.interview.InterviewSessionRepository;
import com.interviewarena.interview.InterviewStatus;
import com.interviewarena.quiz.QuizAttempt;
import com.interviewarena.quiz.QuizAttemptRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProgressServiceTest {

    @Mock private InterviewSessionRepository interviewSessionRepository;
    @Mock private QuizAttemptRepository quizAttemptRepository;
    @Mock private FlashcardReviewRepository flashcardReviewRepository;

    private InterviewSession completedSession(int score) {
        InterviewSession s = new InterviewSession();
        s.setStatus(InterviewStatus.COMPLETED);
        s.setFinalScore(score);
        return s;
    }

    private QuizAttempt attempt(boolean correct) {
        QuizAttempt a = new QuizAttempt();
        a.setCorrect(correct);
        return a;
    }

    @Test
    void getProgress_aggregatesAcrossAllThreeActivityTypes() {
        UUID userId = UUID.randomUUID();
        when(interviewSessionRepository.findByUserIdAndStatus(userId, InterviewStatus.COMPLETED))
            .thenReturn(List.of(completedSession(80), completedSession(90)));
        when(quizAttemptRepository.findByUserId(userId))
            .thenReturn(List.of(attempt(true), attempt(true), attempt(false), attempt(true)));
        when(flashcardReviewRepository.countByUserId(userId)).thenReturn(12L);

        ProgressService service = new ProgressService(interviewSessionRepository, quizAttemptRepository, flashcardReviewRepository);
        var result = service.getProgress(userId);

        assertThat(result.completedInterviews()).isEqualTo(2);
        assertThat(result.averageInterviewScore()).isEqualTo(85.0);
        assertThat(result.quizAccuracyPercent()).isEqualTo(75.0);
        assertThat(result.cardsReviewedTotal()).isEqualTo(12L);
    }

    @Test
    void getProgress_handlesNoActivityYetWithoutDivisionByZero() {
        UUID userId = UUID.randomUUID();
        when(interviewSessionRepository.findByUserIdAndStatus(userId, InterviewStatus.COMPLETED)).thenReturn(List.of());
        when(quizAttemptRepository.findByUserId(userId)).thenReturn(List.of());
        when(flashcardReviewRepository.countByUserId(userId)).thenReturn(0L);

        ProgressService service = new ProgressService(interviewSessionRepository, quizAttemptRepository, flashcardReviewRepository);
        var result = service.getProgress(userId);

        assertThat(result.completedInterviews()).isZero();
        assertThat(result.averageInterviewScore()).isEqualTo(0.0);
        assertThat(result.quizAccuracyPercent()).isEqualTo(0.0);
    }
}
