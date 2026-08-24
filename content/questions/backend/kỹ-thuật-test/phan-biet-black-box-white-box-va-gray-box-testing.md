---
id: phan-biet-black-box-white-box-va-gray-box-testing
position: backend
technology: kỹ-thuật-test
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Black-box, White-box và Gray-box testing?

## Question (EN)
What is the difference between Black-box, White-box, and Gray-box testing?

## Đáp án chi tiết (VI)
Khác nhau ở **mức độ biết về cấu trúc bên trong** khi thiết kế test:\
\
- **Black-box** — dựa trên **đặc tả/hành vi**, không cần biết code chạy ra sao. Kỹ thuật: equivalence partitioning, boundary value analysis, decision table. Trả lời \\"đầu vào này thì đầu ra đúng chưa\\".\
- **White-box** — dựa trên **cấu trúc code bên trong**. Đo bằng statement/branch coverage, kiểm luồng thực thi, nhánh, điều kiện. Trả lời \\"mọi đường đi trong code đã được chạy chưa\\".\
- **Gray-box** — **kết hợp**: biết một phần nội bộ (schema DB, kiến trúc, thuật toán) nhưng vẫn test qua giao diện như black-box. Hữu ích cho test tích hợp và bảo mật.

## Detailed Answer (EN)
They differ by **how much you know about the internal structure** when designing tests:\
\
- **Black-box** — based on the **spec/behavior**, no knowledge of how the code runs. Techniques: equivalence partitioning, boundary value analysis, decision tables. Answers \\"given this input, is the output correct?\\".\
- **White-box** — based on the **internal code structure**. Measured by statement/branch coverage, exercising execution paths, branches, conditions. Answers \\"has every path in the code been exercised?\\".\
- **Gray-box** — a **mix**: you know part of the internals (DB schema, architecture, algorithm) but still test through the interface like black-box. Useful for integration and security testing.
