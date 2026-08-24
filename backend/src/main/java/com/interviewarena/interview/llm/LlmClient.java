package com.interviewarena.interview.llm;

import java.util.List;

public interface LlmClient {
    String complete(List<LlmMessage> messages);
}
