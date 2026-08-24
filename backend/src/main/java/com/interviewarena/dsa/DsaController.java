package com.interviewarena.dsa;

import com.interviewarena.dsa.dto.DsaProblemDetailResponse;
import com.interviewarena.dsa.dto.DsaProblemSummaryResponse;
import com.interviewarena.dsa.dto.DsaSubmissionResultResponse;
import com.interviewarena.dsa.dto.SubmitDsaCodeRequest;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/dsa")
public class DsaController {

    private final DsaService dsaService;

    public DsaController(DsaService dsaService) {
        this.dsaService = dsaService;
    }

    @GetMapping
    public Page<DsaProblemSummaryResponse> list(
        @RequestParam(required = false) String topic,
        @RequestParam(required = false) String difficulty,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        return dsaService.list(topic, difficulty, PageRequest.of(page, size));
    }

    @GetMapping("/{slug}")
    public DsaProblemDetailResponse detail(@PathVariable String slug) {
        return dsaService.getDetail(slug);
    }

    @PostMapping("/{slug}/submit")
    public DsaSubmissionResultResponse submit(@PathVariable String slug, @Valid @RequestBody SubmitDsaCodeRequest request) {
        UUID userId = UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getName());
        return dsaService.submit(userId, slug, request.language(), request.code());
    }
}
