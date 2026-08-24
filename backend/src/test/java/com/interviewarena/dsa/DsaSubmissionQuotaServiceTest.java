package com.interviewarena.dsa;

import com.interviewarena.interview.exception.QuotaExceededException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DsaSubmissionQuotaServiceTest {

    @Mock private StringRedisTemplate redisTemplate;
    @Mock private ValueOperations<String, String> valueOperations;

    @Test
    void checkAndConsume_allowsSubmissionsUnderTheDailyCap() {
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(valueOperations.increment(org.mockito.ArgumentMatchers.anyString())).thenReturn(5L);

        DsaSubmissionQuotaService service = new DsaSubmissionQuotaService(redisTemplate, 20);

        assertThatCode(() -> service.checkAndConsume(UUID.randomUUID())).doesNotThrowAnyException();
    }

    @Test
    void checkAndConsume_throwsWhenDailyCapExceeded() {
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(valueOperations.increment(org.mockito.ArgumentMatchers.anyString())).thenReturn(21L);

        DsaSubmissionQuotaService service = new DsaSubmissionQuotaService(redisTemplate, 20);

        assertThatThrownBy(() -> service.checkAndConsume(UUID.randomUUID()))
            .isInstanceOf(QuotaExceededException.class);
    }
}
