package com.interviewarena.interview;

import com.interviewarena.interview.exception.QuotaExceededException;
import com.interviewarena.subscription.SubscriptionService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class InterviewQuotaService {

    private final StringRedisTemplate redisTemplate;
    private final SubscriptionService subscriptionService;
    private final int freeDailyQuota;

    public InterviewQuotaService(
        StringRedisTemplate redisTemplate,
        SubscriptionService subscriptionService,
        @Value("${app.interview.free-daily-quota:3}") int freeDailyQuota
    ) {
        this.redisTemplate = redisTemplate;
        this.subscriptionService = subscriptionService;
        this.freeDailyQuota = freeDailyQuota;
    }

    public void checkAndConsume(UUID userId) {
        if (subscriptionService.isPro(userId)) {
            return;
        }
        String key = "interview-quota:" + userId + ":" + LocalDate.now();
        Long count = redisTemplate.opsForValue().increment(key);
        if (count != null && count == 1L) {
            redisTemplate.expire(key, Duration.ofDays(1));
        }
        if (count != null && count > freeDailyQuota) {
            throw new QuotaExceededException(
                "Đã dùng hết " + freeDailyQuota + " lượt phỏng vấn AI miễn phí hôm nay");
        }
    }
}
