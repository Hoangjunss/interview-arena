package com.interviewarena.dsa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface DsaProblemRepository extends JpaRepository<DsaProblem, UUID> {
    Optional<DsaProblem> findBySlug(String slug);

    @Query("SELECT d FROM DsaProblem d WHERE d.status = :status " +
           "AND (:topic IS NULL OR d.topic = :topic) " +
           "AND (:difficulty IS NULL OR d.difficulty = :difficulty)")
    Page<DsaProblem> search(
        @Param("status") DsaProblemStatus status,
        @Param("topic") String topic,
        @Param("difficulty") String difficulty,
        Pageable pageable
    );
}
