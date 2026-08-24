package com.interviewarena.subscription;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SubscriptionServiceTest {

    @Mock
    private SubscriptionRepository repository;

    @Test
    void isPro_returnsFalseWhenNoSubscriptionRow() {
        UUID userId = UUID.randomUUID();
        when(repository.findByUserId(userId)).thenReturn(Optional.empty());
        assertThat(new SubscriptionService(repository).isPro(userId)).isFalse();
    }

    @Test
    void isPro_returnsTrueForActiveProWithFutureExpiry() {
        UUID userId = UUID.randomUUID();
        Subscription sub = new Subscription();
        sub.setPlan(Plan.PRO);
        sub.setExpiresAt(Instant.now().plus(10, ChronoUnit.DAYS));
        when(repository.findByUserId(userId)).thenReturn(Optional.of(sub));
        assertThat(new SubscriptionService(repository).isPro(userId)).isTrue();
    }

    @Test
    void isPro_returnsFalseForExpiredPro() {
        UUID userId = UUID.randomUUID();
        Subscription sub = new Subscription();
        sub.setPlan(Plan.PRO);
        sub.setExpiresAt(Instant.now().minus(1, ChronoUnit.DAYS));
        when(repository.findByUserId(userId)).thenReturn(Optional.of(sub));
        assertThat(new SubscriptionService(repository).isPro(userId)).isFalse();
    }

    @Test
    void isPro_returnsTrueForLifetimeProWithNullExpiry() {
        UUID userId = UUID.randomUUID();
        Subscription sub = new Subscription();
        sub.setPlan(Plan.PRO);
        sub.setExpiresAt(null);
        when(repository.findByUserId(userId)).thenReturn(Optional.of(sub));
        assertThat(new SubscriptionService(repository).isPro(userId)).isTrue();
    }
}
