package com.interviewarena.dsa;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Component
public class DsaContentReader {

    private final Path contentRoot;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public DsaContentReader() {
        this(Path.of("..", "content", "dsa"));
    }

    public DsaContentReader(Path contentRoot) {
        this.contentRoot = contentRoot;
    }

    public String readBody(String relativeContentPath) {
        try {
            String raw = Files.readString(contentRoot.resolve(relativeContentPath).resolve("problem.md"));
            String[] parts = raw.split("(?m)^---\\s*$", 3);
            return parts.length == 3 ? parts[2].strip() : raw.strip();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    public String readStarterCode(String relativeContentPath, String language) {
        return readFile(relativeContentPath, "starter", language + ".txt");
    }

    public String readHarness(String relativeContentPath, String language) {
        return readFile(relativeContentPath, "harness", language + ".template");
    }

    public List<DsaTestCase> readTestCases(String relativeContentPath) {
        try {
            byte[] json = Files.readAllBytes(contentRoot.resolve(relativeContentPath).resolve("testcases.json"));
            return objectMapper.readValue(json, objectMapper.getTypeFactory()
                .constructCollectionType(List.class, DsaTestCase.class));
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private String readFile(String relativeContentPath, String subdir, String fileName) {
        try {
            return Files.readString(contentRoot.resolve(relativeContentPath).resolve(subdir).resolve(fileName)).strip();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
