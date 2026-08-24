package com.interviewarena.dsa;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class DsaHarnessBuilderTest {

    private final DsaHarnessBuilder builder = new DsaHarnessBuilder();

    @Test
    void build_insertsUserCodeAtPlaceholder() {
        String template = "before\n{{USER_CODE}}\nafter";
        String result = builder.build(template, "int x = 1;");

        assertThat(result).isEqualTo("before\nint x = 1;\nafter");
    }

    @Test
    void build_replacesOnlyThePlaceholderTokenNotLiteralOccurrencesInUserCode() {
        String template = "{{USER_CODE}}";
        String userCode = "// mentions {{USER_CODE}} in a comment";

        String result = builder.build(template, userCode);

        assertThat(result).isEqualTo("// mentions {{USER_CODE}} in a comment");
    }
}
