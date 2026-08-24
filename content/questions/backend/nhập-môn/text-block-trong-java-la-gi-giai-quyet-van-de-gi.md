---
id: text-block-trong-java-la-gi-giai-quyet-van-de-gi
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Text block (`\\"\\"\\"...\\"\\"\\"`) trong Java là gì, giải quyết vấn đề gì?

## Question (EN)
What are text blocks (`\\"\\"\\"...\\"\\"\\"`) in Java and what problem do they solve?

## Đáp án chi tiết (VI)
Text block (Java 15 — JEP 378) là chuỗi nhiều dòng bọc trong `\\"\\"\\"`, viết JSON/SQL/HTML mà không phải nối `+` và escape `\\\
` thủ công. Kết quả vẫn là `String` thông thường, không phải kiểu mới.\
\
```java\
// Trước Java 15\
String json = \\"{\\\
  \\\\\\"name\\\\\\": \\\\\\"Alice\\\\\\"\\\
}\\";\
\
// Java 15+\
String json = \\"\\"\\"\
        {\
          \\"name\\": \\"Alice\\"\
        }\
        \\"\\"\\";\
```\
\
Compiler tự cắt indent chung của cả khối (dựa vào dòng ít space nhất). Hai escape đặc biệt: `\\\\` cuối dòng = nối dòng tiếp (không xuống dòng), `\\\\s` = giữ trailing space. Dùng tốt cho SQL nhúng, JSON test, HTML email, regex phức tạp. Có biến thì kết hợp `String.formatted(...)`.

## Detailed Answer (EN)
Text blocks (Java 15 — JEP 378) are multi-line strings wrapped in `\\"\\"\\"`, letting you write JSON/SQL/HTML without messy `+` concatenation and `\\\
` escaping. The result is still a regular `String`, not a new type.\
\
```java\
// Before Java 15\
String json = \\"{\\\
  \\\\\\"name\\\\\\": \\\\\\"Alice\\\\\\"\\\
}\\";\
\
// Java 15+\
String json = \\"\\"\\"\
        {\
          \\"name\\": \\"Alice\\"\
        }\
        \\"\\"\\";\
```\
\
The compiler strips the common indentation (based on the least-indented line). Two special escapes: `\\\\` at end of line = join next line (no newline), `\\\\s` = keep trailing space. Great for embedded SQL, test JSON, HTML email, complex regex. With variables, combine with `String.formatted(...)`.
