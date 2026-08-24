package com.interviewarena.interview;

import com.interviewarena.interview.exception.QuotaExceededException;
import com.interviewarena.subscription.Plan;
import com.interviewarena.subscription.PlanLimitService;
import com.interviewarena.subscription.SubscriptionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InterviewQuotaServiceTest {

    @Mock private StringRedisTemplate redisTemplate;
    @Mock private ValueOperations<String, String> valueOperations;
    @Mock private SubscriptionService subscriptionService;
    @Mock private PlanLimitService planLimitService;

    @Test
    void checkAndConsume_allowsProUsersUnconditionally() {
        UUID userId = UUID.randomUUID();
        when(subscriptionService.getPlan(userId)).thenReturn(Plan.PRO);
        when(planLimitService.getDailyLimit(Plan.PRO, "ai_interview")).thenReturn(Optional.empty());

        InterviewQuotaService service = new InterviewQuotaService(redisTemplate, subscriptionService, planLimitService);

        assertThatCode(() -> service.checkAndConsume(userId)).doesNotThrowAnyException();
        verifyNoInteractions(redisTemplate);
    }

    @Test
    void checkAndConsume_allowsFreeUserUnderQuota() {
        UUID userId = UUID.randomUUID();
        when(subscriptionService.getPlan(userId)).thenReturn(Plan.FREE);
        when(planLimitService.getDailyLimit(Plan.FREE, "ai_interview")).thenReturn(Optional.of(3));
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(valueOperations.increment(anyString())).thenReturn(1L);

        InterviewQuotaService service = new InterviewQuotaService(redisTemplate, subscriptionService, planLimitService);

        assertThatCode(() -> service.checkAndConsume(userId)).doesNotThrowAnyException();
        verify(redisTemplate).expire(anyString(), any(java.time.Duration.class));
    }

    @Test
    void checkAndConsume_throwsWhenFreeUserExceedsQuota() {
        UUID userId = UUID.randomUUID();
        when(subscriptionService.getPlan(userId)).thenReturn(Plan.FREE);
        when(planLimitService.getDailyLimit(Plan.FREE, "ai_interview")).thenReturn(Optional.of(3));
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(valueOperations.increment(anyString())).thenReturn(4L);

        InterviewQuotaService service = new InterviewQuotaService(redisTemplate, subscriptionService, planLimitService);

        assertThatThrownBy(() -> service.checkAndConsume(userId)).isInstanceOf(QuotaExceededException.class);
    }
}
