package com.interviewarena.billing;

import com.interviewarena.subscription.Plan;
import java.time.Instant;

public class SubscriptionDto {
    private Plan plan;
    private Instant currentPeriodEnd;
    private boolean cancelAtPeriodEnd;

    public SubscriptionDto(Plan plan, Instant currentPeriodEnd, boolean cancelAtPeriodEnd) {
        this.plan = plan;
        this.currentPeriodEnd = currentPeriodEnd;
        this.cancelAtPeriodEnd = cancelAtPeriodEnd;
    }

    public Plan getPlan() { return plan; }
    public Instant getCurrentPeriodEnd() { return currentPeriodEnd; }
    public boolean isCancelAtPeriodEnd() { return cancelAtPeriodEnd; }
}
