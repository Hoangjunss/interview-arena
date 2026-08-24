package com.interviewarena.dsa;

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

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DsaSubmissionQuotaServiceTest {

    @Mock private StringRedisTemplate redisTemplate;
    @Mock private ValueOperations<String, String> valueOperations;
    @Mock private SubscriptionService subscriptionService;
    @Mock private PlanLimitService planLimitService;

    @Test
    void checkAndConsume_allowsProUsersUnconditionally() {
        UUID userId = UUID.randomUUID();
        when(subscriptionService.getPlan(userId)).thenReturn(Plan.PRO);
        when(planLimitService.getDailyLimit(Plan.PRO, "dsa_submission")).thenReturn(Optional.empty());

        DsaSubmissionQuotaService service = new DsaSubmissionQuotaService(redisTemplate, subscriptionService, planLimitService);

        assertThatCode(() -> service.checkAndConsume(userId)).doesNotThrowAnyException();
        verifyNoInteractions(redisTemplate);
    }

    @Test
    void checkAndConsume_allowsSubmissionsUnderTheDailyCap() {
        UUID userId = UUID.randomUUID();
        when(subscriptionService.getPlan(userId)).thenReturn(Plan.FREE);
        when(planLimitService.getDailyLimit(Plan.FREE, "dsa_submission")).thenReturn(Optional.of(20));
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(valueOperations.increment(anyString())).thenReturn(5L);

        DsaSubmissionQuotaService service = new DsaSubmissionQuotaService(redisTemplate, subscriptionService, planLimitService);

        assertThatCode(() -> service.checkAndConsume(userId)).doesNotThrowAnyException();
    }

    @Test
    void checkAndConsume_throwsWhenDailyCapExceeded() {
        UUID userId = UUID.randomUUID();
        when(subscriptionService.getPlan(userId)).thenReturn(Plan.FREE);
        when(planLimitService.getDailyLimit(Plan.FREE, "dsa_submission")).thenReturn(Optional.of(20));
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(valueOperations.increment(anyString())).thenReturn(21L);

        DsaSubmissionQuotaService service = new DsaSubmissionQuotaService(redisTemplate, subscriptionService, planLimitService);

        assertThatThrownBy(() -> service.checkAndConsume(userId))
            .isInstanceOf(QuotaExceededException.class);
    }
}
