package com.interviewarena.flashcard;

import com.interviewarena.flashcard.dto.DueCardResponse;
import com.interviewarena.question.Question;
import com.interviewarena.question.QuestionRepository;
import com.interviewarena.question.QuestionStatus;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

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
        Instant now = Instant.now();
        Set<UUID> dueIds = new java.util.HashSet<>();

        // 1. Fetch never-reviewed card IDs from DB
        List<UUID> neverReviewedIds = questionRepository.findNeverReviewedQuestionIds(userId);
        dueIds.addAll(neverReviewedIds);

        // 2. Try fetching due reviewed cards from Redis
        boolean redisSuccess = false;
        try {
            String redisKey = "srs:due:" + userId;
            Set<String> memberIds = redisTemplate.opsForZSet().rangeByScore(redisKey, 0, now.getEpochSecond());
            if (memberIds != null) {
                for (String id : memberIds) {
                    dueIds.add(UUID.fromString(id));
                }
                redisSuccess = true;
            }
        } catch (Exception e) {
            System.err.println("Redis error in dueCards, falling back to DB: " + e.getMessage());
        }

        // 3. Fallback to DB if Redis query failed
        if (!redisSuccess) {
            List<UUID> dueReviewedIds = repository.findDueQuestionIds(userId, now);
            dueIds.addAll(dueReviewedIds);
        }

        if (dueIds.isEmpty()) {
            return List.of();
        }

        // 4. Batch fetch details from DB
        List<Question> questions = questionRepository.findAllById(dueIds);

        return questions.stream()
            .filter(q -> q.getStatus() == QuestionStatus.ACTIVE)
            .map(q -> new DueCardResponse(q.getId(), q.getSlug()))
            .toList();
    }
}
