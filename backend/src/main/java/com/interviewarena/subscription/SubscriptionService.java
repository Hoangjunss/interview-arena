package com.interviewarena.subscription;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class SubscriptionService {

    private final SubscriptionRepository repository;

    public SubscriptionService(SubscriptionRepository repository) {
        this.repository = repository;
    }

    public boolean isPro(UUID userId) {
        return repository.findByUserId(userId)
            .filter(s -> s.getPlan() == Plan.PRO)
            .filter(s -> s.getExpiresAt() == null || s.getExpiresAt().isAfter(Instant.now()))
            .isPresent();
    }
}
