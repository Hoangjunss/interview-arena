package com.interviewarena.interview;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InterviewSessionRepository extends JpaRepository<InterviewSession, UUID> {
}
