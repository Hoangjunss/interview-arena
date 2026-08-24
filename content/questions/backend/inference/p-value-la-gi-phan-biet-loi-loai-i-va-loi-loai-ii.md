---
id: p-value-la-gi-phan-biet-loi-loai-i-va-loi-loai-ii
position: backend
technology: inference
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
p-value là gì? Phân biệt lỗi loại I và lỗi loại II.

## Question (EN)
What is a p-value? Distinguish Type I and Type II errors.

## Đáp án chi tiết (VI)
**p-value** là xác suất quan sát được dữ liệu ít nhất cực đoan như dữ liệu thực tế, **với giả định giả thuyết không (H0) đúng**. p-value nhỏ nghĩa là dữ liệu khó xảy ra dưới H0 → bằng chứng chống lại H0. So với mức ý nghĩa `α`: nếu `p \u003c α` thì bác bỏ H0.\
\
p-value **không phải** là xác suất H0 đúng, cũng không phải xác suất kết quả \\"do ngẫu nhiên\\".\
\
**Hai loại lỗi** trong kiểm định:\
- **Lỗi loại I (dương tính giả)** — bác bỏ H0 khi H0 thực ra đúng. Tỷ lệ mắc chính là `α`.\
- **Lỗi loại II (âm tính giả)** — không bác bỏ H0 khi H0 thực ra sai. Tỷ lệ là `β`; **power = 1 − β** là khả năng phát hiện đúng hiệu ứng thật.\
\
**Đánh đổi:** với cùng cỡ mẫu, giảm `α` sẽ làm `β` tăng. Cách giảm đồng thời cả hai là **tăng cỡ mẫu**.

## Detailed Answer (EN)
A **p-value** is the probability of observing data at least as extreme as what you got, **assuming the null hypothesis (H0) is true**. A small p-value means the data is unlikely under H0 → evidence against H0. Compare it to the significance level `α`: if `p \u003c α`, reject H0.\
\
A p-value is **not** the probability that H0 is true, nor the probability the result is \\"due to chance\\".\
\
**Two error types** in testing:\
- **Type I error (false positive)** — rejecting H0 when it is actually true. Its rate is exactly `α`.\
- **Type II error (false negative)** — failing to reject H0 when it is actually false. Its rate is `β`; **power = 1 − β** is the ability to correctly detect a real effect.\
\
**Trade-off:** for a fixed sample size, lowering `α` raises `β`. To reduce both at once, **increase the sample size**.
