package com.interviewarena.dsa.dto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public record DsaProblemDetailResponse(
    UUID id,
    String slug,
    String topic,
    String difficulty,
    String markdownBody,
    Map<String, String> starterCode,
    List<DsaSampleTestCase> samples
) {}
