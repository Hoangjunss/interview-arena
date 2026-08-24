package com.interviewarena.flashcard;

import com.interviewarena.flashcard.dto.DueCardResponse;
import com.interviewarena.question.Question;
import com.interviewarena.question.QuestionRepository;
import com.interviewarena.question.QuestionStatus;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class FlashcardService {

    private final FlashcardReviewRepository repository;
    private final QuestionRepository questionRepository;
    private final Sm2Calculator sm2Calculator;
    private final StringRedisTemplate redisTemplate;

    public FlashcardService(
        FlashcardReviewRepository repository,
        QuestionRepository questionRepository,
        Sm2Calculator sm2Calculator,
        StringRedisTemplate redisTemplate
    ) {
        this.repository = repository;
        this.questionRepository = questionRepository;
        this.sm2Calculator = sm2Calculator;
        this.redisTemplate = redisTemplate;
    }

    public void reviewCard(UUID userId, UUID questionId, ReviewRating rating) {
        FlashcardReview review = repository.findByUserIdAndQuestionId(userId, questionId)
            .orElseGet(() -> {
                FlashcardReview created = new FlashcardReview();
                created.setUserId(userId);
                created.setQuestionId(questionId);
                return created;
            });

        Sm2Calculator.Sm2Result result = sm2Calculator.apply(review, rating);
        review.setIntervalDays(result.intervalDays());
        review.setEaseFactor(result.easeFactor());
        review.setRepetitions(result.repetitions());
        review.setDueAt(result.dueAt());
        review.setLastReviewedAt(Instant.now());
        repository.save(review);

        redisTemplate.opsForZSet().add(
            "srs:due:" + userId, questionId.toString(), (double) result.dueAt().getEpochSecond());
    }

    public List<DueCardResponse> dueCards(UUID userId) {
        List<Question> activeQuestions = questionRepository.findByStatus(QuestionStatus.ACTIVE);
        List<FlashcardReview> reviews = repository.findByUserId(userId);

        Map<UUID, FlashcardReview> reviewMap = reviews.stream()
            .collect(Collectors.toMap(FlashcardReview::getQuestionId, Function.identity()));

        Instant now = Instant.now();

        return activeQuestions.stream()
            .filter(q -> {
                FlashcardReview r = reviewMap.get(q.getId());
                return r == null || !r.getDueAt().isAfter(now);
            })
            .map(q -> new DueCardResponse(q.getId(), q.getSlug()))
            .toList();
    }
}
