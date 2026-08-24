package com.interviewarena.dsa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.io.TempDir;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DsaContentIngestServiceTest {

    @Mock private DsaProblemRepository dsaProblemRepository;
    private final DsaFrontmatterParser parser = new DsaFrontmatterParser();

    @Test
    void ingestDirectory_upsertsProblemFromFrontmatter(@TempDir Path root) throws IOException {
        Path problemDir = root.resolve("two-sum");
        Files.createDirectories(problemDir);
        Files.writeString(problemDir.resolve("problem.md"), """
            ---
            id: two-sum
            topic: array
            difficulty: easy
            status: ACTIVE
            ---

            ## Đề bài (VI)
            Nội dung.
            """);
        when(dsaProblemRepository.findBySlug("two-sum")).thenReturn(Optional.empty());

        DsaContentIngestService service = new DsaContentIngestService(dsaProblemRepository, parser);
        var result = service.ingestDirectory(root);

        assertThat(result.upserted()).isEqualTo(1);
        assertThat(result.errors()).isEmpty();
        verify(dsaProblemRepository).save(argThat(p ->
            p.getSlug().equals("two-sum") &&
            p.getTopic().equals("array") &&
            p.getDifficulty().equals("easy") &&
            p.getStatus() == DsaProblemStatus.ACTIVE &&
            p.getContentPath().equals("two-sum")
        ));
    }

    @Test
    void ingestDirectory_recordsErrorForMissingFrontmatter(@TempDir Path root) throws IOException {
        Path problemDir = root.resolve("broken");
        Files.createDirectories(problemDir);
        Files.writeString(problemDir.resolve("problem.md"), "no frontmatter here");

        DsaContentIngestService service = new DsaContentIngestService(dsaProblemRepository, parser);
        var result = service.ingestDirectory(root);

        assertThat(result.upserted()).isZero();
        assertThat(result.errors()).hasSize(1);
    }
}
