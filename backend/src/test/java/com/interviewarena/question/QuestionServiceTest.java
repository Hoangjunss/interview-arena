package com.interviewarena.question;

import com.interviewarena.question.dto.QuestionDetailResponse;
import com.interviewarena.question.dto.QuestionSummaryResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuestionServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private QuestionContentReader contentReader;

    private Question activeQuestion() {
        Question q = new Question();
        q.setSlug("react-q1");
        q.setPosition("frontend");
        q.setTechnology("react");
        q.setLevel("mid");
        q.setStatus(QuestionStatus.ACTIVE);
        q.setContentPath("frontend/react/react-q1.md");
        return q;
    }

    @Test
    void list_returnsOnlyActiveMatchingQuestions() {
        when(questionRepository.findByStatusAndPositionAndTechnologyAndLevel(
            QuestionStatus.ACTIVE, "frontend", "react", "mid"))
            .thenReturn(List.of(activeQuestion()));

        QuestionService service = new QuestionService(questionRepository, contentReader);
        List<QuestionSummaryResponse> result = service.list("frontend", "react", "mid");

        assertThat(result).hasSize(1);
        assertThat(result.get(0).slug()).isEqualTo("react-q1");
    }

    @Test
    void getDetail_returnsMarkdownBodyForActiveQuestion() {
        Question q = activeQuestion();
        when(questionRepository.findById(any())).thenReturn(Optional.of(q));
        when(contentReader.readBody("frontend/react/react-q1.md")).thenReturn("## Câu hỏi\n...");

        QuestionService service = new QuestionService(questionRepository, contentReader);
        QuestionDetailResponse detail = service.getDetail(UUID.randomUUID());

        assertThat(detail.markdownBody()).isEqualTo("## Câu hỏi\n...");
    }

    @Test
    void getDetail_throwsWhenQuestionIsNotActive() {
        Question q = activeQuestion();
        q.setStatus(QuestionStatus.DRAFT);
        when(questionRepository.findById(any())).thenReturn(Optional.of(q));

        QuestionService service = new QuestionService(questionRepository, contentReader);

        assertThatThrownBy(() -> service.getDetail(UUID.randomUUID()))
            .isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void updateStatus_promotesDraftToActiveAndPersists() {
        Question q = activeQuestion();
        q.setStatus(QuestionStatus.DRAFT);
        when(questionRepository.findById(any())).thenReturn(Optional.of(q));
        when(questionRepository.save(any(Question.class))).thenAnswer(inv -> inv.getArgument(0));

        QuestionService service = new QuestionService(questionRepository, contentReader);
        var result = service.updateStatus(UUID.randomUUID(), QuestionStatus.ACTIVE);

        assertThat(result.slug()).isEqualTo("react-q1");
        assertThat(q.getStatus()).isEqualTo(QuestionStatus.ACTIVE);
    }
}
