package com.interviewarena.question;

import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@Component
public class FrontmatterParser {

    private static final List<String> REQUIRED_FIELDS =
        List.of("id", "position", "technology", "level", "source", "status");

    public QuestionFrontmatter parse(Path file) throws IOException {
        String content = Files.readString(file);
        String[] parts = content.split("(?m)^---\\s*$", 3);
        if (parts.length < 3) {
            throw new IllegalArgumentException("Missing YAML frontmatter delimiters in " + file);
        }
        Yaml yaml = new Yaml();
        Map<String, Object> data = yaml.load(parts[1]);

        for (String field : REQUIRED_FIELDS) {
            if (data == null || !data.containsKey(field) || data.get(field) == null) {
                throw new IllegalArgumentException("Missing required frontmatter field '" + field + "' in " + file);
            }
        }

        return new QuestionFrontmatter(
            data.get("id").toString(),
            data.get("position").toString(),
            data.get("technology").toString(),
            data.get("level").toString(),
            data.get("source").toString(),
            data.get("status").toString()
        );
    }
}
