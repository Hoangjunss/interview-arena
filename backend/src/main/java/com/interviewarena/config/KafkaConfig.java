package com.interviewarena.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.listener.CommonErrorHandler;
import org.springframework.kafka.listener.DeadLetterPublishingRecoverer;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.util.backoff.FixedBackOff;

@Configuration
public class KafkaConfig {

    public static final String INTERVIEW_ANSWER_SUBMITTED_TOPIC = "interview-answer-submitted";
    public static final String INTERVIEW_ANSWER_SUBMITTED_DLT = "interview-answer-submitted.DLT";

    @Bean
    public NewTopic interviewAnswerSubmittedTopic() {
        return TopicBuilder.name(INTERVIEW_ANSWER_SUBMITTED_TOPIC)
            .partitions(3)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic interviewAnswerSubmittedDlt() {
        return TopicBuilder.name(INTERVIEW_ANSWER_SUBMITTED_DLT)
            .partitions(1)
            .replicas(1)
            .build();
    }

    @Bean
    public CommonErrorHandler errorHandler(KafkaTemplate<Object, Object> template) {
        DeadLetterPublishingRecoverer recoverer = new DeadLetterPublishingRecoverer(template);
        // Retry 3 times, with 1 second delay between retries
        return new DefaultErrorHandler(recoverer, new FixedBackOff(1000L, 3L));
    }
}
