package com.interviewarena.dsa.dto;

import java.util.UUID;

public record DsaProblemSummaryResponse(UUID id, String slug, String topic, String difficulty) {}
