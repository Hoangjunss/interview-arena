---
id: bias-variance-tradeoff-la-gi
position: backend
technology: model-validation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bias-Variance tradeoff là gì?

## Question (EN)
What is the bias-variance tradeoff?

## Đáp án chi tiết (VI)
Test error kỳ vọng của một mô hình phân rã thành ba phần: **Bias²**, **Variance** và **irreducible error** (nhiễu `σ²` không thể loại bỏ):\
\
`E[(y − f̂(x))²] = Bias(f̂(x))² + Var(f̂(x)) + σ²`\
\
- **Bias** — sai số do giả định của mô hình quá đơn giản so với quan hệ thật. Bias cao → **underfit** (ví dụ hồi quy tuyến tính cho dữ liệu phi tuyến).\
- **Variance** — mức độ mô hình thay đổi khi đổi tập huấn luyện. Variance cao → **overfit** (mô hình bám cả nhiễu; ví dụ cây quyết định rất sâu).\
\
**Đánh đổi:** khi tăng độ linh hoạt (flexibility) của mô hình, bias giảm nhưng variance tăng. Test error tổng thường có dạng chữ U — cần chọn độ phức tạp cân bằng hai đại lượng này. Irreducible error đặt ra giới hạn dưới không mô hình nào vượt qua được.

## Detailed Answer (EN)
A model's expected test error decomposes into three parts: **Bias²**, **Variance**, and **irreducible error** (noise `σ²` that cannot be removed):\
\
`E[(y − f̂(x))²] = Bias(f̂(x))² + Var(f̂(x)) + σ²`\
\
- **Bias** — error from a model too simple to capture the true relationship. High bias → **underfitting** (e.g. linear regression on nonlinear data).\
- **Variance** — how much the model changes across different training sets. High variance → **overfitting** (the model fits noise; e.g. a very deep decision tree).\
\
**Tradeoff:** as model flexibility increases, bias falls but variance rises. Total test error is typically U-shaped, so you pick a complexity that balances the two. Irreducible error is a lower bound no model can beat.
