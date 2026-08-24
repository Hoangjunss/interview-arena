package com.interviewarena.dsa;

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
public class DsaContentIngestService {

    private final DsaProblemRepository dsaProblemRepository;
    private final DsaFrontmatterParser frontmatterParser;

    public DsaContentIngestService(DsaProblemRepository dsaProblemRepository, DsaFrontmatterParser frontmatterParser) {
        this.dsaProblemRepository = dsaProblemRepository;
        this.frontmatterParser = frontmatterParser;
    }

    public record IngestResult(int upserted, List<String> errors) {}

    public IngestResult ingestDirectory(Path root) {
        List<String> errors = new ArrayList<>();
        int upserted = 0;

        List<Path> files;
        try (Stream<Path> walk = Files.walk(root)) {
            files = walk.filter(p -> p.getFileName().toString().equals("problem.md")).toList();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }

        for (Path file : files) {
            try {
                DsaFrontmatter fm = frontmatterParser.parse(file);
                upsert(fm, root.relativize(file.getParent()).toString());
                upserted++;
            } catch (Exception e) {
                errors.add(file + ": " + e.getMessage());
            }
        }
        return new IngestResult(upserted, errors);
    }

    private void upsert(DsaFrontmatter fm, String relativeDir) {
        Optional<DsaProblem> existing = dsaProblemRepository.findBySlug(fm.id());
        DsaProblem problem = existing.orElseGet(DsaProblem::new);
        problem.setSlug(fm.id());
        problem.setTopic(fm.topic());
        problem.setDifficulty(fm.difficulty());
        problem.setContentPath(relativeDir.replace('\\', '/'));
        problem.setSyncedAt(Instant.now());
        if (existing.isEmpty()) {
            problem.setStatus(DsaProblemStatus.valueOf(fm.status()));
        }
        dsaProblemRepository.save(problem);
    }
}
