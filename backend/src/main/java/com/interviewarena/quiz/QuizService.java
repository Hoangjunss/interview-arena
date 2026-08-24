package com.interviewarena.quiz;

import com.interviewarena.question.QuestionContentReader;
import com.interviewarena.question.QuestionRepository;
import com.interviewarena.quiz.dto.QuizResultResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class QuizService {

    private final QuestionRepository questionRepository;
    private final QuestionContentReader contentReader;
    private final QuizContentParser quizContentParser;
    private final QuizAttemptRepository quizAttemptRepository;

    public QuizService(
        QuestionRepository questionRepository,
        QuestionContentReader contentReader,
        QuizContentParser quizContentParser,
        QuizAttemptRepository quizAttemptRepository
    ) {
        this.questionRepository = questionRepository;
        this.contentReader = contentReader;
        this.quizContentParser = quizContentParser;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    public QuizResultResponse submitAnswer(UUID userId, UUID questionId, int selectedIndex) {
        var question = questionRepository.findById(questionId)
            .orElseThrow(() -> new NoSuchElementException("Question not found: " + questionId));
        String body = contentReader.readBody(question.getContentPath());
        List<QuizOption> options = quizContentParser.parse(body);

        int correctIndex = -1;
        for (int i = 0; i < options.size(); i++) {
            if (options.get(i).correct()) {
                correctIndex = i;
                break;
            }
        }
        boolean correct = selectedIndex == correctIndex;

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUserId(userId);
        attempt.setQuestionId(questionId);
        attempt.setSelectedIndex(selectedIndex);
        attempt.setCorrect(correct);
        quizAttemptRepository.save(attempt);

        return new QuizResultResponse(correct, correctIndex);
    }
}
