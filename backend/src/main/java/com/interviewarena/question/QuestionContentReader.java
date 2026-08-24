package com.interviewarena.question;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class QuestionContentReader {

    private static final Path CONTENT_ROOT = Path.of("..", "content", "questions");

    public String readBody(String relativeContentPath) {
        try {
            String raw = Files.readString(CONTENT_ROOT.resolve(relativeContentPath));
            String[] parts = raw.split("(?m)^---\\s*$", 3);
            return parts.length == 3 ? parts[2].strip() : raw.strip();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
