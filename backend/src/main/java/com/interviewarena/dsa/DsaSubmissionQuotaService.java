package com.interviewarena.dsa;

import com.interviewarena.interview.exception.QuotaExceededException;
import com.interviewarena.subscription.Plan;
import com.interviewarena.subscription.PlanLimitService;
import com.interviewarena.subscription.SubscriptionService;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Service
public class DsaSubmissionQuotaService {

    private final StringRedisTemplate redisTemplate;
    private final SubscriptionService subscriptionService;
    private final PlanLimitService planLimitService;

    public DsaSubmissionQuotaService(
        StringRedisTemplate redisTemplate,
        SubscriptionService subscriptionService,
        PlanLimitService planLimitService
    ) {
        this.redisTemplate = redisTemplate;
        this.subscriptionService = subscriptionService;
        this.planLimitService = planLimitService;
    }

    public void checkAndConsume(UUID userId) {
        Plan plan = subscriptionService.getPlan(userId);
        Optional<Integer> limitOpt = planLimitService.getDailyLimit(plan, "dsa_submission");
        if (limitOpt.isEmpty()) {
            return; // Unlimited
        }
        int limit = limitOpt.get();
        String key = "dsa-quota:" + userId + ":" + LocalDate.now();
        Long count = redisTemplate.opsForValue().increment(key);
        if (count != null && count == 1L) {
            redisTemplate.expire(key, Duration.ofDays(1));
        }
        if (count != null && count > limit) {
            throw new QuotaExceededException(
                "Đã dùng hết " + limit + " lượt nộp bài DSA hôm nay, thử lại vào ngày mai");
        }
    }
}
