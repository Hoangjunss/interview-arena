package com.interviewarena.interview;

import com.interviewarena.interview.llm.LlmMessage;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class InterviewPromptBuilderTest {

    private final InterviewPromptBuilder builder = new InterviewPromptBuilder(5);

    private InterviewSession session() {
        InterviewSession s = new InterviewSession();
        s.setPosition("frontend");
        s.setTechnology("react");
        s.setLevel("mid");
        return s;
    }

    private InterviewTurn turn(int order, String question, String answer) {
        InterviewTurn t = new InterviewTurn();
        t.setTurnOrder(order);
        t.setQuestionText(question);
        t.setAnswerText(answer);
        return t;
    }

    @Test
    void buildQuestionPrompt_includesSystemPromptMentioningPositionAndLevel() {
        List<LlmMessage> messages = builder.buildQuestionPrompt(session(), List.of());

        assertThat(messages).isNotEmpty();
        assertThat(messages.get(0).role()).isEqualTo("system");
        assertThat(messages.get(0).content()).contains("frontend").contains("react").contains("mid");
    }

    @Test
    void buildQuestionPrompt_convertsHistoryToAlternatingAssistantUserMessages() {
        List<InterviewTurn> history = List.of(turn(1, "Câu hỏi 1?", "Trả lời 1"));

        List<LlmMessage> messages = builder.buildQuestionPrompt(session(), history);

        assertThat(messages).extracting(LlmMessage::role).contains("assistant", "user");
        assertThat(messages).anyMatch(m -> m.content().equals("Câu hỏi 1?") && m.role().equals("assistant"));
        assertThat(messages).anyMatch(m -> m.content().equals("Trả lời 1") && m.role().equals("user"));
    }

    @Test
    void buildScoringPrompt_instructsStrictJsonOutput() {
        List<InterviewTurn> history = List.of(turn(1, "Câu hỏi 1?", "Trả lời 1"));

        List<LlmMessage> messages = builder.buildScoringPrompt(session(), history);

        String allContent = messages.stream().map(LlmMessage::content).reduce("", String::concat);
        assertThat(allContent).contains("finalScore").contains("turnFeedback").contains("JSON");
    }
}
