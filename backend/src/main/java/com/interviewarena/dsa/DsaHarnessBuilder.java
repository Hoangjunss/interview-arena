package com.interviewarena.dsa;

import org.springframework.stereotype.Component;

@Component
public class DsaHarnessBuilder {

    private static final String PLACEHOLDER = "{{USER_CODE}}";

    public String build(String harnessTemplate, String userCode) {
        int index = harnessTemplate.indexOf(PLACEHOLDER);
        if (index < 0) {
            throw new IllegalArgumentException("Harness template does not contain " + PLACEHOLDER);
        }
        return harnessTemplate.substring(0, index) + userCode + harnessTemplate.substring(index + PLACEHOLDER.length());
    }
}
