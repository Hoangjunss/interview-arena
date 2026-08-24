package com.interviewarena.subscription;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PlanLimitServiceTest {

    @Mock
    private PlanLimitRepository repository;

    @InjectMocks
    private PlanLimitService service;

    @Test
    void getDailyLimit_returnsLimitWhenPresent() {
        PlanLimit limit = new PlanLimit();
        limit.setPlan(Plan.FREE);
        limit.setFeatureKey("ai_interview");
        limit.setDailyLimit(3);

        when(repository.findByPlanAndFeatureKey(Plan.FREE, "ai_interview"))
            .thenReturn(Optional.of(limit));

        Optional<Integer> dailyLimit = service.getDailyLimit(Plan.FREE, "ai_interview");
        assertThat(dailyLimit).hasValue(3);
    }

    @Test
    void getDailyLimit_returnsEmptyWhenUnlimited() {
        PlanLimit limit = new PlanLimit();
        limit.setPlan(Plan.PRO);
        limit.setFeatureKey("ai_interview");
        limit.setDailyLimit(null);

        when(repository.findByPlanAndFeatureKey(Plan.PRO, "ai_interview"))
            .thenReturn(Optional.of(limit));

        Optional<Integer> dailyLimit = service.getDailyLimit(Plan.PRO, "ai_interview");
        assertThat(dailyLimit).isEmpty();
    }

    @Test
    void getDailyLimit_returnsEmptyWhenRowMissing() {
        when(repository.findByPlanAndFeatureKey(Plan.FREE, "missing_feature"))
            .thenReturn(Optional.empty());

        Optional<Integer> dailyLimit = service.getDailyLimit(Plan.FREE, "missing_feature");
        assertThat(dailyLimit).isEmpty();
    }
}
