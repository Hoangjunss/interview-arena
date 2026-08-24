package com.interviewarena.question;

import com.interviewarena.question.dto.QuestionDetailResponse;
import com.interviewarena.question.dto.QuestionSummaryResponse;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Page<QuestionSummaryResponse> list(String position, String technology, String level, Pageable pageable) {
        return questionRepository
            .findByStatusAndPositionAndTechnologyAndLevel(QuestionStatus.ACTIVE, position, technology, level, pageable)
            .map(q -> new QuestionSummaryResponse(q.getId(), q.getSlug(), q.getPosition(), q.getTechnology(), q.getLevel()));
    }

    public QuestionDetailResponse getDetail(UUID id) {
        Question q = questionRepository.findById(id)
            .filter(question -> question.getStatus() == QuestionStatus.ACTIVE)
            .orElseThrow(() -> new NoSuchElementException("Question not found: " + id));
        String body = contentReader.readBody(q.getContentPath());
        return new QuestionDetailResponse(q.getId(), q.getSlug(), q.getPosition(), q.getTechnology(), q.getLevel(), body);
    }

    public QuestionSummaryResponse updateStatus(UUID id, QuestionStatus status) {
        Question q = questionRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Question not found: " + id));
        q.setStatus(status);
        questionRepository.save(q);
        return new QuestionSummaryResponse(q.getId(), q.getSlug(), q.getPosition(), q.getTechnology(), q.getLevel());
    }
}
