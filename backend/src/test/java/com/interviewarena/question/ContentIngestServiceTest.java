package com.interviewarena.question;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContentIngestServiceTest {

    private void writeQuestion(Path dir, String id, String status) throws IOException {
        Files.createDirectories(dir);
        String md = """
            ---
            id: %s
            position: frontend
            technology: react
            level: mid
            source: MANUAL
            status: %s
            ---

            ## Câu hỏi (VI)
            Nội dung mẫu.
            """.formatted(id, status);
        Files.writeString(dir.resolve(id + ".md"), md);
    }

    @Test
    void ingestDirectory_insertsNewQuestionWithFrontmatterStatus(@TempDir Path tempDir) throws IOException {
        Path questionsDir = tempDir.resolve("frontend/react");
        writeQuestion(questionsDir, "new-question", "DRAFT");

        QuestionRepository repository = mock(QuestionRepository.class);
        when(repository.findBySlug("new-question")).thenReturn(Optional.empty());

        ContentIngestService service = new ContentIngestService(repository, new FrontmatterParser());
        ContentIngestService.IngestResult result = service.ingestDirectory(tempDir);

        assertThat(result.errors()).isEmpty();
        assertThat(result.upserted()).isEqualTo(1);

        ArgumentCaptor<Question> captor = ArgumentCaptor.forClass(Question.class);
        verify(repository).save(captor.capture());
        assertThat(captor.getValue().getStatus()).isEqualTo(QuestionStatus.DRAFT);
    }

    @Test
    void ingestDirectory_neverDowngradesExistingActiveStatusFromFrontmatter(@TempDir Path tempDir) throws IOException {
        Path questionsDir = tempDir.resolve("frontend/react");
        writeQuestion(questionsDir, "existing-question", "DRAFT");

        Question existing = new Question();
        existing.setSlug("existing-question");
        existing.setStatus(QuestionStatus.ACTIVE);

        QuestionRepository repository = mock(QuestionRepository.class);
        when(repository.findBySlug("existing-question")).thenReturn(Optional.of(existing));

        ContentIngestService service = new ContentIngestService(repository, new FrontmatterParser());
        service.ingestDirectory(tempDir);

        ArgumentCaptor<Question> captor = ArgumentCaptor.forClass(Question.class);
        verify(repository).save(captor.capture());
        assertThat(captor.getValue().getStatus()).isEqualTo(QuestionStatus.ACTIVE);
    }

    @Test
    void ingestDirectory_collectsErrorInsteadOfThrowingOnBadFile(@TempDir Path tempDir) throws IOException {
        Path badDir = tempDir.resolve("frontend/react");
        Files.createDirectories(badDir);
        Files.writeString(badDir.resolve("broken.md"), "not frontmatter at all");

        ContentIngestService service = new ContentIngestService(mock(QuestionRepository.class), new FrontmatterParser());
        ContentIngestService.IngestResult result = service.ingestDirectory(tempDir);

        assertThat(result.errors()).hasSize(1);
        assertThat(result.upserted()).isZero();
    }
}
