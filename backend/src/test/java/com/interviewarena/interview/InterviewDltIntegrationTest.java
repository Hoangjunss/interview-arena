package com.interviewarena.interview;

import com.interviewarena.config.KafkaConfig;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.kafka.test.utils.KafkaTestUtils;

import java.time.Duration;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@EmbeddedKafka(
    partitions = 1,
    topics = { KafkaConfig.INTERVIEW_ANSWER_SUBMITTED_TOPIC, KafkaConfig.INTERVIEW_ANSWER_SUBMITTED_DLT },
    bootstrapServersProperty = "spring.kafka.bootstrap-servers"
)
class InterviewDltIntegrationTest {

    @Autowired
    private KafkaTemplate<Object, Object> kafkaTemplate;

    @Autowired
    private ConsumerFactory<Object, Object> consumerFactory;

    @Test
    void failedEvent_isSentToDeadLetterTopicAfterRetries() {
        UUID sessionId = UUID.randomUUID();
        InterviewAnswerSubmittedEvent event = new InterviewAnswerSubmittedEvent(sessionId, 1);

        // Send to input topic
        kafkaTemplate.send(KafkaConfig.INTERVIEW_ANSWER_SUBMITTED_TOPIC, sessionId.toString(), event);

        // Configure a consumer to read from the DLT topic
        Consumer<Object, Object> consumer = consumerFactory.createConsumer("test-dlt-group", "test-dlt");
        consumer.subscribe(java.util.Collections.singletonList(KafkaConfig.INTERVIEW_ANSWER_SUBMITTED_DLT));

        // Wait and poll record from DLT
        ConsumerRecord<Object, Object> record = KafkaTestUtils.getSingleRecord(
            consumer, KafkaConfig.INTERVIEW_ANSWER_SUBMITTED_DLT, Duration.ofMillis(10000));

        assertThat(record).isNotNull();
        assertThat(record.key()).isEqualTo(sessionId.toString());
        consumer.close();
    }
}
