package com.interviewarena.dsa;

import com.interviewarena.dsa.judge.DsaJudgeClient;
import com.interviewarena.dsa.judge.JudgeResult;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DsaServiceTest {

    @Mock private DsaProblemRepository dsaProblemRepository;
    @Mock private DsaSubmissionRepository dsaSubmissionRepository;
    @Mock private DsaContentReader contentReader;
    @Mock private DsaHarnessBuilder harnessBuilder;
    @Mock private DsaJudgeClient judgeClient;
    @Mock private DsaSubmissionQuotaService quotaService;

    private DsaProblem problem() {
        DsaProblem p = new DsaProblem();
        p.setId(UUID.randomUUID());
        p.setSlug("two-sum");
        p.setStatus(DsaProblemStatus.ACTIVE);
        p.setContentPath("two-sum");
        return p;
    }

    private DsaService service() {
        return new DsaService(dsaProblemRepository, dsaSubmissionRepository, contentReader, harnessBuilder, judgeClient, quotaService);
    }

    @Test
    void submit_returnsPassedWhenAllTestCasesMatch() {
        UUID userId = UUID.randomUUID();
        DsaProblem problem = problem();
        when(dsaProblemRepository.findBySlug("two-sum")).thenReturn(Optional.of(problem));
        when(contentReader.readHarness("two-sum", "python")).thenReturn("{{USER_CODE}}");
        when(contentReader.readTestCases("two-sum")).thenReturn(List.of(
            new DsaTestCase("2,7,11,15\n9", "0,1", false),
            new DsaTestCase("3,3\n6", "0,1", true)
        ));
        when(harnessBuilder.build(anyString(), anyString())).thenReturn("full-source");
        when(judgeClient.languageIdFor("python")).thenReturn(71);
        when(judgeClient.runBatch(anyList())).thenReturn(List.of(
            new JudgeResult("0,1\n", 3, "Accepted"),
            new JudgeResult("0,1\n", 3, "Accepted")
        ));

        var result = service().submit(userId, "two-sum", "python", "def two_sum(...): ...");

        assertThat(result.verdict()).isEqualTo("PASSED");
        assertThat(result.passedCount()).isEqualTo(2);
        assertThat(result.totalCount()).isEqualTo(2);
        assertThat(result.failures()).isEmpty();
        verify(quotaService).checkAndConsume(userId);
        verify(dsaSubmissionRepository).save(argThat(s -> s.getVerdict() == DsaVerdict.PASSED));
    }

    @Test
    void submit_reportsVisibleFailureButOmitsHiddenFailureDetails() {
        UUID userId = UUID.randomUUID();
        DsaProblem problem = problem();
        when(dsaProblemRepository.findBySlug("two-sum")).thenReturn(Optional.of(problem));
        when(contentReader.readHarness("two-sum", "python")).thenReturn("{{USER_CODE}}");
        when(contentReader.readTestCases("two-sum")).thenReturn(List.of(
            new DsaTestCase("2,7,11,15\n9", "0,1", false),
            new DsaTestCase("3,3\n6", "0,1", true)
        ));
        when(harnessBuilder.build(anyString(), anyString())).thenReturn("full-source");
        when(judgeClient.languageIdFor("python")).thenReturn(71);
        when(judgeClient.runBatch(anyList())).thenReturn(List.of(
            new JudgeResult("1,0\n", 3, "Accepted"),
            new JudgeResult("wrong\n", 3, "Accepted")
        ));

        var result = service().submit(userId, "two-sum", "python", "def two_sum(...): ...");

        assertThat(result.verdict()).isEqualTo("FAILED");
        assertThat(result.passedCount()).isEqualTo(0);
        assertThat(result.totalCount()).isEqualTo(2);
        assertThat(result.failures()).hasSize(1);
        assertThat(result.failures().get(0).input()).isEqualTo("2,7,11,15\n9");
    }
}
