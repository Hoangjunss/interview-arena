package com.interviewarena.dsa;

import com.interviewarena.dsa.judge.DsaJudgeClient;
import com.interviewarena.dsa.judge.JudgeResult;
import com.interviewarena.dsa.judge.JudgeSubmission;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.web.client.RestClient;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@EnabledIfEnvironmentVariable(named = "RUN_JUDGE0_INTEGRATION_TESTS", matches = "true")
class DsaJudge0IntegrationTest {

    private final DsaJudgeClient judgeClient = new DsaJudgeClient(
        RestClient.builder().baseUrl("http://localhost:2358").build());
    private final DsaHarnessBuilder harnessBuilder = new DsaHarnessBuilder();
    private final Path problemDir = Path.of("..", "content", "dsa", "two-sum");

    private String harnessFor(String language) throws Exception {
        return Files.readString(problemDir.resolve("harness").resolve(language + ".template"));
    }

    @Test
    void javaSolutionPassesTwoSumSampleCase() throws Exception {
        String userCode = """
            public int[] twoSum(int[] nums, int target) {
                java.util.Map<Integer, Integer> seen = new java.util.HashMap<>();
                for (int i = 0; i < nums.length; i++) {
                    int complement = target - nums[i];
                    if (seen.containsKey(complement)) {
                        return new int[]{seen.get(complement), i};
                    }
                    seen.put(nums[i], i);
                }
                return new int[]{};
            }
            """;
        String source = harnessBuilder.build(harnessFor("java"), userCode);
        List<JudgeResult> results = judgeClient.runBatch(List.of(
            new JudgeSubmission(source, judgeClient.languageIdFor("java"), "2,7,11,15\n9")));

        assertThat(results.get(0).isAccepted()).isTrue();
        assertThat(results.get(0).stdout().trim()).isEqualTo("0,1");
    }

    @Test
    void pythonSolutionPassesTwoSumSampleCase() throws Exception {
        String userCode = """
            def two_sum(nums, target):
                seen = {}
                for i, n in enumerate(nums):
                    complement = target - n
                    if complement in seen:
                        return [seen[complement], i]
                    seen[n] = i
                return []
            """;
        String source = harnessBuilder.build(harnessFor("python"), userCode);
        List<JudgeResult> results = judgeClient.runBatch(List.of(
            new JudgeSubmission(source, judgeClient.languageIdFor("python"), "2,7,11,15\n9")));

        assertThat(results.get(0).isAccepted()).isTrue();
        assertThat(results.get(0).stdout().trim()).isEqualTo("0,1");
    }

    @Test
    void javascriptSolutionPassesTwoSumSampleCase() throws Exception {
        String userCode = """
            function twoSum(nums, target) {
                const seen = {}
                for (let i = 0; i < nums.length; i++) {
                    const complement = target - nums[i]
                    if (complement in seen) {
                        return [seen[complement], i]
                    }
                    seen[nums[i]] = i
                }
                return []
            }
            """;
        String source = harnessBuilder.build(harnessFor("javascript"), userCode);
        List<JudgeResult> results = judgeClient.runBatch(List.of(
            new JudgeSubmission(source, judgeClient.languageIdFor("javascript"), "2,7,11,15\n9")));

        assertThat(results.get(0).isAccepted()).isTrue();
        assertThat(results.get(0).stdout().trim()).isEqualTo("0,1");
    }

    @Test
    void cppSolutionPassesTwoSumSampleCase() throws Exception {
        String userCode = """
            vector<int> twoSum(vector<int>& nums, int target) {
                unordered_map<int, int> seen;
                for (int i = 0; i < (int)nums.size(); i++) {
                    int complement = target - nums[i];
                    if (seen.count(complement)) {
                        return {seen[complement], i};
                    }
                    seen[nums[i]] = i;
                }
                return {};
            }
            """;
        String source = harnessBuilder.build(harnessFor("cpp"), userCode);
        List<JudgeResult> results = judgeClient.runBatch(List.of(
            new JudgeSubmission(source, judgeClient.languageIdFor("cpp"), "2,7,11,15\n9")));

        assertThat(results.get(0).isAccepted()).isTrue();
        assertThat(results.get(0).stdout().trim()).isEqualTo("0,1");
    }
}
