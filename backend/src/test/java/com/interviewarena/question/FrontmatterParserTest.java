package com.interviewarena.question;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class FrontmatterParserTest {

    @Test
    void parse_extractsAllFields(@TempDir Path tempDir) throws IOException {
        String md = """
            ---
            id: react-hooks-usestate-vs-usereducer
            position: frontend
            technology: react
            level: mid
            tags: [hooks, state-management]
            source: MANUAL
            status: ACTIVE
            created_at: 2026-08-24
            ---

            ## Câu hỏi (VI)
            Nội dung...
            """;
        Path file = tempDir.resolve("sample.md");
        Files.writeString(file, md);

        QuestionFrontmatter fm = new FrontmatterParser().parse(file);

        assertThat(fm.id()).isEqualTo("react-hooks-usestate-vs-usereducer");
        assertThat(fm.position()).isEqualTo("frontend");
        assertThat(fm.technology()).isEqualTo("react");
        assertThat(fm.level()).isEqualTo("mid");
        assertThat(fm.source()).isEqualTo("MANUAL");
        assertThat(fm.status()).isEqualTo("ACTIVE");
    }

    @Test
    void parse_throwsWhenRequiredFieldMissing(@TempDir Path tempDir) throws IOException {
        String md = """
            ---
            id: broken-question
            position: frontend
            ---

            body
            """;
        Path file = tempDir.resolve("broken.md");
        Files.writeString(file, md);

        assertThatThrownBy(() -> new FrontmatterParser().parse(file))
            .isInstanceOf(IllegalArgumentException.class);
    }
}
