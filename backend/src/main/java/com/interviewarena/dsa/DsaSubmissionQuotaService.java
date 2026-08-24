package com.interviewarena.dsa;

import com.interviewarena.interview.exception.QuotaExceededException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class DsaSubmissionQuotaService {

    private final StringRedisTemplate redisTemplate;
    private final int freeDailyQuota;

    public DsaSubmissionQuotaService(
        StringRedisTemplate redisTemplate,
        @Value("${app.dsa.free-daily-quota:20}") int freeDailyQuota
    ) {
        this.redisTemplate = redisTemplate;
        this.freeDailyQuota = freeDailyQuota;
    }

    public void checkAndConsume(UUID userId) {
        String key = "dsa-quota:" + userId + ":" + LocalDate.now();
        Long count = redisTemplate.opsForValue().increment(key);
        if (count != null && count == 1L) {
            redisTemplate.expire(key, Duration.ofDays(1));
        }
        if (count != null && count > freeDailyQuota) {
            throw new QuotaExceededException(
                "Đã dùng hết " + freeDailyQuota + " lượt nộp bài DSA hôm nay, thử lại vào ngày mai");
        }
    }
}
