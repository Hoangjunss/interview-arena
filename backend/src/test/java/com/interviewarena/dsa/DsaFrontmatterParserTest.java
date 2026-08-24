package com.interviewarena.dsa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class DsaFrontmatterParserTest {

    private final DsaFrontmatterParser parser = new DsaFrontmatterParser();

    @Test
    void parse_readsAllRequiredFields(@TempDir Path dir) throws IOException {
        Path file = dir.resolve("problem.md");
        Files.writeString(file, """
            ---
            id: two-sum
            topic: array
            difficulty: easy
            status: ACTIVE
            ---

            ## Đề bài (VI)
            Nội dung.
            """);

        DsaFrontmatter fm = parser.parse(file);

        assertThat(fm.id()).isEqualTo("two-sum");
        assertThat(fm.topic()).isEqualTo("array");
        assertThat(fm.difficulty()).isEqualTo("easy");
        assertThat(fm.status()).isEqualTo("ACTIVE");
    }

    @Test
    void parse_throwsWhenRequiredFieldMissing(@TempDir Path dir) throws IOException {
        Path file = dir.resolve("problem.md");
        Files.writeString(file, """
            ---
            id: two-sum
            topic: array
            ---

            body
            """);

        assertThatThrownBy(() -> parser.parse(file)).isInstanceOf(IllegalArgumentException.class);
    }
}
