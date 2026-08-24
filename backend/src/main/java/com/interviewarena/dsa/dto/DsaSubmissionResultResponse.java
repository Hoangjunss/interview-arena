package com.interviewarena.dsa.dto;

import java.util.List;

public record DsaSubmissionResultResponse(
    String verdict,
    int passedCount,
    int totalCount,
    List<DsaTestCaseFailure> failures
) {}
