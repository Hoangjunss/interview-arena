package com.interviewarena.flashcard;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FlashcardServiceTest {

    @Mock
    private FlashcardReviewRepository repository;
    @Mock
    private com.interviewarena.question.QuestionRepository questionRepository;
    @Mock
    private StringRedisTemplate redisTemplate;
    @Mock
    private ZSetOperations<String, String> zSetOperations;

    @Test
    void reviewCard_persistsSm2StateAndUpdatesRedisDueSet() {
        when(redisTemplate.opsForZSet()).thenReturn(zSetOperations);
        UUID userId = UUID.randomUUID();
        UUID questionId = UUID.randomUUID();

        FlashcardReview existing = new FlashcardReview();
        existing.setUserId(userId);
        existing.setQuestionId(questionId);
        existing.setRepetitions(0);
        existing.setIntervalDays(0);
        existing.setEaseFactor(2.5);

        when(repository.findByUserIdAndQuestionId(userId, questionId)).thenReturn(Optional.of(existing));
        when(repository.save(any(FlashcardReview.class))).thenAnswer(inv -> inv.getArgument(0));

        FlashcardService service = new FlashcardService(repository, questionRepository, new Sm2Calculator(), redisTemplate);
        service.reviewCard(userId, questionId, ReviewRating.GOOD);

        assertThat(existing.getRepetitions()).isEqualTo(1);
        assertThat(existing.getIntervalDays()).isEqualTo(1);
        verify(zSetOperations).add(eq("srs:due:" + userId), eq(questionId.toString()), anyDouble());
    }

    @Test
    void reviewCard_createsNewFlashcardReviewWhenNoneExists() {
        when(redisTemplate.opsForZSet()).thenReturn(zSetOperations);
        UUID userId = UUID.randomUUID();
        UUID questionId = UUID.randomUUID();

        when(repository.findByUserIdAndQuestionId(userId, questionId)).thenReturn(Optional.empty());
        when(repository.save(any(FlashcardReview.class))).thenAnswer(inv -> inv.getArgument(0));

        FlashcardService service = new FlashcardService(repository, questionRepository, new Sm2Calculator(), redisTemplate);
        service.reviewCard(userId, questionId, ReviewRating.EASY);

        verify(repository).save(argThat(review ->
            review.getUserId().equals(userId) && review.getQuestionId().equals(questionId)));
    }
}
