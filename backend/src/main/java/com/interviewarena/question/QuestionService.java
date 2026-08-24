package com.interviewarena.question;

import com.interviewarena.question.dto.QuestionDetailResponse;
import com.interviewarena.question.dto.QuestionSummaryResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionContentReader contentReader;

    public QuestionService(QuestionRepository questionRepository, QuestionContentReader contentReader) {
        this.questionRepository = questionRepository;
        this.contentReader = contentReader;
    }

    public List<QuestionSummaryResponse> list(String position, String technology, String level) {
        return questionRepository
            .findByStatusAndPositionAndTechnologyAndLevel(QuestionStatus.ACTIVE, position, technology, level)
            .stream()
            .map(q -> new QuestionSummaryResponse(q.getId(), q.getSlug(), q.getPosition(), q.getTechnology(), q.getLevel()))
            .toList();
    }

    public QuestionDetailResponse getDetail(UUID id) {
        Question q = questionRepository.findById(id)
            .filter(question -> question.getStatus() == QuestionStatus.ACTIVE)
            .orElseThrow(() -> new NoSuchElementException("Question not found: " + id));
        String body = contentReader.readBody(q.getContentPath());
        return new QuestionDetailResponse(q.getId(), q.getSlug(), q.getPosition(), q.getTechnology(), q.getLevel(), body);
    }
}
