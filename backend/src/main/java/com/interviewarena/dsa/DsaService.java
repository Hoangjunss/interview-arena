package com.interviewarena.dsa;

import com.interviewarena.dsa.dto.*;
import com.interviewarena.dsa.judge.DsaJudgeClient;
import com.interviewarena.dsa.judge.JudgeResult;
import com.interviewarena.dsa.judge.JudgeSubmission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class DsaService {

    private static final List<String> LANGUAGES = List.of("java", "python", "javascript", "cpp");

    private final DsaProblemRepository dsaProblemRepository;
    private final DsaSubmissionRepository dsaSubmissionRepository;
    private final DsaContentReader contentReader;
    private final DsaHarnessBuilder harnessBuilder;
    private final DsaJudgeClient judgeClient;
    private final DsaSubmissionQuotaService quotaService;

    public DsaService(
        DsaProblemRepository dsaProblemRepository,
        DsaSubmissionRepository dsaSubmissionRepository,
        DsaContentReader contentReader,
        DsaHarnessBuilder harnessBuilder,
        DsaJudgeClient judgeClient,
        DsaSubmissionQuotaService quotaService
    ) {
        this.dsaProblemRepository = dsaProblemRepository;
        this.dsaSubmissionRepository = dsaSubmissionRepository;
        this.contentReader = contentReader;
        this.harnessBuilder = harnessBuilder;
        this.judgeClient = judgeClient;
        this.quotaService = quotaService;
    }

    public Page<DsaProblemSummaryResponse> list(String topic, String difficulty, Pageable pageable) {
        return dsaProblemRepository.search(DsaProblemStatus.ACTIVE, topic, difficulty, pageable)
            .map(p -> new DsaProblemSummaryResponse(p.getId(), p.getSlug(), p.getTopic(), p.getDifficulty()));
    }

    public DsaProblemDetailResponse getDetail(String slug) {
        DsaProblem problem = findActiveBySlug(slug);
        String body = contentReader.readBody(problem.getContentPath());

        Map<String, String> starterCode = new java.util.LinkedHashMap<>();
        for (String language : LANGUAGES) {
            starterCode.put(language, contentReader.readStarterCode(problem.getContentPath(), language));
        }

        List<DsaSampleTestCase> samples = contentReader.readTestCases(problem.getContentPath()).stream()
            .filter(tc -> !tc.hidden())
            .map(tc -> new DsaSampleTestCase(tc.input(), tc.expectedOutput()))
            .toList();

        return new DsaProblemDetailResponse(problem.getId(), problem.getSlug(), problem.getTopic(),
            problem.getDifficulty(), body, starterCode, samples);
    }

    public DsaSubmissionResultResponse submit(UUID userId, String slug, String language, String code) {
        quotaService.checkAndConsume(userId);
        DsaProblem problem = findActiveBySlug(slug);

        String harnessTemplate = contentReader.readHarness(problem.getContentPath(), language);
        String fullSource = harnessBuilder.build(harnessTemplate, code);
        int languageId = judgeClient.languageIdFor(language);

        List<DsaTestCase> testCases = contentReader.readTestCases(problem.getContentPath());
        List<JudgeSubmission> submissions = testCases.stream()
            .map(tc -> new JudgeSubmission(fullSource, languageId, tc.input()))
            .toList();

        DsaVerdict verdict;
        int passedCount = 0;
        List<DsaTestCaseFailure> failures = new ArrayList<>();

        try {
            List<JudgeResult> results = judgeClient.runBatch(submissions);
            for (int i = 0; i < testCases.size(); i++) {
                DsaTestCase testCase = testCases.get(i);
                JudgeResult result = results.get(i);
                boolean passed = result.isAccepted() && result.stdout().trim().equals(testCase.expectedOutput().trim());
                if (passed) {
                    passedCount++;
                } else if (!testCase.hidden()) {
                    failures.add(new DsaTestCaseFailure(testCase.input(), testCase.expectedOutput(), result.stdout().trim()));
                }
            }
            verdict = passedCount == testCases.size() ? DsaVerdict.PASSED : DsaVerdict.FAILED;
        } catch (ResourceAccessException e) {
            verdict = DsaVerdict.ERROR;
        }

        DsaSubmission submission = new DsaSubmission();
        submission.setUserId(userId);
        submission.setProblemId(problem.getId());
        submission.setLanguage(language);
        submission.setSourceCode(code);
        submission.setVerdict(verdict);
        submission.setPassedCount(passedCount);
        submission.setTotalCount(testCases.size());
        dsaSubmissionRepository.save(submission);

        return new DsaSubmissionResultResponse(verdict.name(), passedCount, testCases.size(), failures);
    }

    private DsaProblem findActiveBySlug(String slug) {
        return dsaProblemRepository.findBySlug(slug)
            .filter(p -> p.getStatus() == DsaProblemStatus.ACTIVE)
            .orElseThrow(() -> new NoSuchElementException("DSA problem not found: " + slug));
    }
}
