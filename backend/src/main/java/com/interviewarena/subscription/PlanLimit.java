package com.interviewarena.subscription;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "plan_limits")
public class PlanLimit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Plan plan;

    @Column(name = "feature_key", nullable = false)
    private String featureKey;

    @Column(name = "daily_limit")
    private Integer dailyLimit;

    public UUID getId() { return id; }
    public Plan getPlan() { return plan; }
    public void setPlan(Plan plan) { this.plan = plan; }
    public String getFeatureKey() { return featureKey; }
    public void setFeatureKey(String featureKey) { this.featureKey = featureKey; }
    public Integer getDailyLimit() { return dailyLimit; }
    public void setDailyLimit(Integer dailyLimit) { this.dailyLimit = dailyLimit; }
}
