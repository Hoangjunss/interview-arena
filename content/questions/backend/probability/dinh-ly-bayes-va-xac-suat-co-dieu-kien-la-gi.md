---
id: dinh-ly-bayes-va-xac-suat-co-dieu-kien-la-gi
position: backend
technology: probability
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Định lý Bayes và xác suất có điều kiện là gì?

## Question (EN)
What are Bayes' theorem and conditional probability?

## Đáp án chi tiết (VI)
**Xác suất có điều kiện** `P(A|B)` là xác suất của A khi biết B đã xảy ra: `P(A|B) = P(A∩B) / P(B)`.\
\
**Định lý Bayes** cho phép \\"đảo\\" điều kiện, cập nhật niềm tin sau khi thấy bằng chứng:\
\
`P(A|B) = P(B|A) · P(A) / P(B)`\
\
- `P(A)`: **prior** (niềm tin trước).\
- `P(B|A)`: **likelihood** (khả năng thấy bằng chứng nếu A đúng).\
- `P(A|B)`: **posterior** (niềm tin sau khi cập nhật).\
\
**Lưu ý — bỏ quên tỷ lệ nền (base rate):** với một bệnh hiếm, ngay cả xét nghiệm rất chính xác vẫn cho nhiều dương tính giả, vì prior (tỷ lệ mắc) quá thấp. Ví dụ prevalence 1%, độ nhạy 99%, dương-tính-giả 5% → khi test dương, `P(bệnh|dương) ≈ 0.99·0.01 / (0.99·0.01 + 0.05·0.99) ≈ 17%`, thấp hơn nhiều so với trực giác.

## Detailed Answer (EN)
**Conditional probability** `P(A|B)` is the probability of A given that B occurred: `P(A|B) = P(A∩B) / P(B)`.\
\
**Bayes' theorem** lets you \\"flip\\" the condition, updating beliefs after seeing evidence:\
\
`P(A|B) = P(B|A) · P(A) / P(B)`\
\
- `P(A)`: the **prior** (belief before).\
- `P(B|A)`: the **likelihood** (chance of the evidence if A is true).\
- `P(A|B)`: the **posterior** (updated belief).\
\
**Classic pitfall — base-rate neglect:** for a rare disease, even a very accurate test yields many false positives because the prior (prevalence) is so low. Example: 1% prevalence, 99% sensitivity, 5% false-positive rate → given a positive test, `P(disease|positive) ≈ 0.99·0.01 / (0.99·0.01 + 0.05·0.99) ≈ 17%`, far lower than intuition suggests.
