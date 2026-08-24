package com.interviewarena.progress;

import com.interviewarena.flashcard.FlashcardReviewRepository;
import com.interviewarena.interview.InterviewSession;
import com.interviewarena.interview.InterviewSessionRepository;
import com.interviewarena.interview.InterviewStatus;
import com.interviewarena.progress.dto.ProgressResponse;
import com.interviewarena.quiz.QuizAttempt;
import com.interviewarena.quiz.QuizAttemptRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProgressService {

    private final InterviewSessionRepository interviewSessionRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final FlashcardReviewRepository flashcardReviewRepository;

    public ProgressService(
        InterviewSessionRepository interviewSessionRepository,
        QuizAttemptRepository quizAttemptRepository,
        FlashcardReviewRepository flashcardReviewRepository
    ) {
        this.interviewSessionRepository = interviewSessionRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.flashcardReviewRepository = flashcardReviewRepository;
    }

    public ProgressResponse getProgress(UUID userId) {
        List<InterviewSession> completed = interviewSessionRepository
            .findByUserIdAndStatus(userId, InterviewStatus.COMPLETED);
        
        double avgScore = completed.stream()
            .filter(s -> s.getFinalScore() != null)
            .mapToInt(InterviewSession::getFinalScore)
            .average()
            .orElse(0.0);

        List<QuizAttempt> attempts = quizAttemptRepository.findByUserId(userId);
        double accuracy = attempts.isEmpty() ? 0.0 :
            100.0 * attempts.stream().filter(QuizAttempt::isCorrect).count() / attempts.size();

        long cardsReviewed = flashcardReviewRepository.countByUserId(userId);

        return new ProgressResponse(completed.size(), avgScore, accuracy, cardsReviewed);
    }
}
