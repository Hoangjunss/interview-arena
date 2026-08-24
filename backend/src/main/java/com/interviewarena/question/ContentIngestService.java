package com.interviewarena.question;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class ContentIngestService {

    private final QuestionRepository questionRepository;
    private final FrontmatterParser frontmatterParser;

    public ContentIngestService(QuestionRepository questionRepository, FrontmatterParser frontmatterParser) {
        this.questionRepository = questionRepository;
        this.frontmatterParser = frontmatterParser;
    }

    public record IngestResult(int upserted, List<String> errors) {}

    public IngestResult ingestDirectory(Path root) {
        List<String> errors = new ArrayList<>();
        int upserted = 0;

        List<Path> files;
        try (Stream<Path> walk = Files.walk(root)) {
            files = walk.filter(p -> p.toString().endsWith(".md")).toList();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }

        for (Path file : files) {
            try {
                QuestionFrontmatter fm = frontmatterParser.parse(file);
                upsert(fm, root.relativize(file).toString());
                upserted++;
            } catch (Exception e) {
                errors.add(file + ": " + e.getMessage());
            }
        }
        return new IngestResult(upserted, errors);
    }

    private void upsert(QuestionFrontmatter fm, String relativePath) {
        Optional<Question> existing = questionRepository.findBySlug(fm.id());
        Question question = existing.orElseGet(Question::new);
        question.setSlug(fm.id());
        question.setPosition(fm.position());
        question.setTechnology(fm.technology());
        question.setLevel(fm.level());
        question.setSource(fm.source());
        // Normalize slashes to forward slashes for cross-platform compatibility
        question.setContentPath(relativePath.replace('\\', '/'));
        question.setSyncedAt(Instant.now());
        if (existing.isEmpty()) {
            question.setStatus(QuestionStatus.valueOf(fm.status()));
        }
        // status is intentionally left untouched on updates — only the
        // status endpoint (Task 5) may promote DRAFT -> ACTIVE.
        questionRepository.save(question);
    }
}
