package com.interviewarena.quiz;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class QuizContentParser {

    private static final Pattern SECTION = Pattern.compile(
        "## Đáp án trắc nghiệm\\s*\\n((?:- \\[[ x]] .*\\n?)+)");
    private static final Pattern OPTION_LINE = Pattern.compile("- \\[( |x)] (.*)");

    public List<QuizOption> parse(String markdownBody) {
        Matcher sectionMatcher = SECTION.matcher(markdownBody);
        if (!sectionMatcher.find()) {
            throw new IllegalArgumentException("No '## Đáp án trắc nghiệm' section found");
        }
        List<QuizOption> options = new ArrayList<>();
        for (String line : sectionMatcher.group(1).split("\\n")) {
            if (line.isBlank()) continue;
            Matcher optionMatcher = OPTION_LINE.matcher(line.trim());
            if (optionMatcher.matches()) {
                boolean correct = optionMatcher.group(1).equals("x");
                options.add(new QuizOption(optionMatcher.group(2).trim(), correct));
            }
        }
        return options;
    }
}
