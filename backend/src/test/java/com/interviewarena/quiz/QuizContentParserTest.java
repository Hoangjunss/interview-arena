package com.interviewarena.quiz;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class QuizContentParserTest {

    private final QuizContentParser parser = new QuizContentParser();

    @Test
    void parse_extractsOptionsAndMarksCorrectOne() {
        String body = """
            ## Câu hỏi (VI)
            Câu hỏi mẫu?

            ## Đáp án trắc nghiệm
            - [ ] Sai 1
            - [x] Đúng
            - [ ] Sai 2

            ## Giải thích (VI)
            Vì lý do X.
            """;

        List<QuizOption> options = parser.parse(body);

        assertThat(options).hasSize(3);
        assertThat(options.get(1).text()).isEqualTo("Đúng");
        assertThat(options.get(1).correct()).isTrue();
        assertThat(options.get(0).correct()).isFalse();
    }

    @Test
    void parse_throwsWhenNoQuizSectionPresent() {
        String body = "## Câu hỏi (VI)\nKhông có phần trắc nghiệm.\n";

        assertThatThrownBy(() -> parser.parse(body)).isInstanceOf(IllegalArgumentException.class);
    }
}
