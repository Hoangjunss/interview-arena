package com.interviewarena.quiz;

import com.interviewarena.question.Question;
import com.interviewarena.question.QuestionContentReader;
import com.interviewarena.question.QuestionRepository;
import com.interviewarena.question.QuestionStatus;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QuizServiceTest {

    @Mock private QuestionRepository questionRepository;
    @Mock private QuestionContentReader contentReader;
    @Mock private QuizAttemptRepository quizAttemptRepository;
    private final QuizContentParser parser = new QuizContentParser();

    private Question question() {
        Question q = new Question();
        q.setStatus(QuestionStatus.ACTIVE);
        q.setContentPath("frontend/react/react-quiz-jsx-keys.md");
        return q;
    }

    @Test
    void submitAnswer_recordsCorrectAttemptWhenSelectedIndexMatches() {
        UUID userId = UUID.randomUUID();
        UUID questionId = UUID.randomUUID();
        when(questionRepository.findById(questionId)).thenReturn(Optional.of(question()));
        when(contentReader.readBody(any())).thenReturn("""
            ## Đáp án trắc nghiệm
            - [ ] Sai
            - [x] Đúng
            """);

        QuizService service = new QuizService(questionRepository, contentReader, parser, quizAttemptRepository);
        var result = service.submitAnswer(userId, questionId, 1);

        assertThat(result.correct()).isTrue();
        assertThat(result.correctIndex()).isEqualTo(1);
        verify(quizAttemptRepository).save(argThat(a -> a.isCorrect() && a.getSelectedIndex() == 1));
    }

    @Test
    void submitAnswer_recordsIncorrectAttemptWhenSelectedIndexWrong() {
        UUID userId = UUID.randomUUID();
        UUID questionId = UUID.randomUUID();
        when(questionRepository.findById(questionId)).thenReturn(Optional.of(question()));
        when(contentReader.readBody(any())).thenReturn("""
            ## Đáp án trắc nghiệm
            - [ ] Sai
            - [x] Đúng
            """);

        QuizService service = new QuizService(questionRepository, contentReader, parser, quizAttemptRepository);
        var result = service.submitAnswer(userId, questionId, 0);

        assertThat(result.correct()).isFalse();
        verify(quizAttemptRepository).save(argThat(a -> !a.isCorrect()));
    }
}
