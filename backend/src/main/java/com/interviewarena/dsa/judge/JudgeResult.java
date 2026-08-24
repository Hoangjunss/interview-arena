package com.interviewarena.dsa.judge;

public record JudgeResult(String stdout, int statusId, String statusDescription) {
    public boolean isAccepted() {
        return statusId == 3;
    }
}
