package com.interviewarena.dsa.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SubmitDsaCodeRequest(
    @NotBlank String language,
    @NotBlank @Size(max = 20000) String code
) {}
