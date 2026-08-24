package com.interviewarena.dsa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface DsaSubmissionRepository extends JpaRepository<DsaSubmission, UUID> {
    List<DsaSubmission> findByUserId(UUID userId);

    @Query("SELECT COUNT(DISTINCT s.problemId) FROM DsaSubmission s " +
           "WHERE s.userId = :userId AND s.verdict = :verdict")
    long countDistinctProblemIdByUserIdAndVerdict(@Param("userId") UUID userId, @Param("verdict") DsaVerdict verdict);
}
