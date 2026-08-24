package com.interviewarena.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    public static final String INTERVIEW_ANSWER_SUBMITTED_TOPIC = "interview-answer-submitted";

    @Bean
    public NewTopic interviewAnswerSubmittedTopic() {
        return TopicBuilder.name(INTERVIEW_ANSWER_SUBMITTED_TOPIC)
            .partitions(3)
            .replicas(1)
            .build();
    }
}
