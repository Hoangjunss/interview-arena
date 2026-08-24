package com.interviewarena.subscription;

import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class PlanLimitService {

    private final PlanLimitRepository repository;

    public PlanLimitService(PlanLimitRepository repository) {
        this.repository = repository;
    }

    public Optional<Integer> getDailyLimit(Plan plan, String featureKey) {
        return repository.findByPlanAndFeatureKey(plan, featureKey)
            .map(PlanLimit::getDailyLimit);
    }
}
