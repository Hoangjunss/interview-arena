---
id: khoang-tin-cay-confidence-interval-la-gi-va-dien-giai-the-nao-cho-dung
position: backend
technology: inference
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khoảng tin cậy (confidence interval) là gì và diễn giải thế nào cho đúng?

## Question (EN)
What is a confidence interval, and how do you interpret it correctly?

## Đáp án chi tiết (VI)
**Khoảng tin cậy (CI)** là một khoảng ước lượng cho tham số tổng thể, tính từ dữ liệu mẫu. Với trung bình:\
\
`x̄ ± z* · (σ/√n)`\
\
(dùng `t*` với độ lệch chuẩn mẫu `s` khi chưa biết `σ`). `z*` là giá trị tới hạn ứng với mức tin cậy (95% → `z* ≈ 1.96`).\
\
**Diễn giải đúng của CI 95%:** nếu lặp lại việc lấy mẫu rất nhiều lần và mỗi lần dựng một khoảng, thì **~95% số khoảng đó sẽ chứa tham số thật**.\
\
**Diễn giải SAI thường gặp:** \\"có 95% xác suất giá trị thật nằm trong khoảng cụ thể này\\" — sai, vì tham số là cố định, còn khoảng mới là ngẫu nhiên.\
\
- Mức tin cậy liên hệ với `α` qua `1 − α`.\
- Khoảng **hẹp hơn** khi cỡ mẫu `n` lớn hơn; **rộng hơn** khi đòi mức tin cậy cao hơn.

## Detailed Answer (EN)
A **confidence interval (CI)** is a range estimate for a population parameter computed from sample data. For a mean:\
\
`x̄ ± z* · (σ/√n)`\
\
(use `t*` with the sample standard deviation `s` when `σ` is unknown). `z*` is the critical value for the confidence level (95% → `z* ≈ 1.96`).\
\
**Correct reading of a 95% CI:** if you repeated the sampling many times and built an interval each time, **~95% of those intervals would contain the true parameter**.\
\
**Common WRONG reading:** \\"there is a 95% probability the true value lies in this specific interval\\" — wrong, because the parameter is fixed and the interval is what is random.\
\
- The confidence level relates to `α` by `1 − α`.\
- The interval is **narrower** with a larger sample `n`; **wider** when you demand a higher confidence level.
