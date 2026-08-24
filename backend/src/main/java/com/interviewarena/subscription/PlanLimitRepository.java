package com.interviewarena.subscription;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface PlanLimitRepository extends JpaRepository<PlanLimit, UUID> {
    Optional<PlanLimit> findByPlanAndFeatureKey(Plan plan, String featureKey);
}
