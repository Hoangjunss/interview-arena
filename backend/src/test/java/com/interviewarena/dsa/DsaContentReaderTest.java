package com.interviewarena.dsa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class DsaContentReaderTest {

    @Test
    void readsBodyStarterHarnessAndTestCases(@TempDir Path root) throws IOException {
        Path problemDir = root.resolve("two-sum");
        Files.createDirectories(problemDir.resolve("starter"));
        Files.createDirectories(problemDir.resolve("harness"));

        Files.writeString(problemDir.resolve("problem.md"), """
            ---
            id: two-sum
            topic: array
            difficulty: easy
            status: ACTIVE
            ---

            ## Đề bài (VI)
            Nội dung đề bài.
            """);
        Files.writeString(problemDir.resolve("starter").resolve("java.txt"), "public int[] twoSum() {}");
        Files.writeString(problemDir.resolve("harness").resolve("java.template"), "{{USER_CODE}}");
        Files.writeString(problemDir.resolve("testcases.json"), """
            [
              {"input": "2,7,11,15\\n9", "expectedOutput": "0,1", "hidden": false},
              {"input": "3,3\\n6", "expectedOutput": "0,1", "hidden": true}
            ]
            """);

        DsaContentReader reader = new DsaContentReader(root);

        assertThat(reader.readBody("two-sum")).contains("Nội dung đề bài.");
        assertThat(reader.readStarterCode("two-sum", "java")).isEqualTo("public int[] twoSum() {}");
        assertThat(reader.readHarness("two-sum", "java")).isEqualTo("{{USER_CODE}}");

        List<DsaTestCase> cases = reader.readTestCases("two-sum");
        assertThat(cases).hasSize(2);
        assertThat(cases.get(0).hidden()).isFalse();
        assertThat(cases.get(1).hidden()).isTrue();
    }
}
