---
id: vi-sao-logistic-regression-la-thuat-toan-phan-loai-du-ten-co-chu-regression
position: backend
technology: supervised
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao Logistic Regression là thuật toán phân loại dù tên có chữ \\"regression\\"?

## Question (EN)
Why is logistic regression a classification algorithm despite the word \\"regression\\" in its name?

## Đáp án chi tiết (VI)
Vì nó ước lượng **xác suất** một mẫu thuộc lớp dương rồi so với ngưỡng để ra nhãn. Bên trong, nó vẫn tính một tổ hợp tuyến tính `z = β₀ + βᵀx` như linear regression, nhưng đưa qua hàm **sigmoid/logistic** `σ(z) = 1 / (1 + e^(-z))` để nén về khoảng `(0, 1)` — một xác suất.\
\
Chữ \\"regression\\" trong tên nói tới việc nó **hồi quy log-odds (logit)** theo các đặc trưng: `log(p / (1 − p)) = βᵀx` là tuyến tính.\
\
Khác biệt chính so với linear regression:\
\
- **Đầu ra** bị chặn trong `(0, 1)`, không phải một số thực bất kỳ.\
- **Hàm mất mát** là **log-loss (cross-entropy / hợp lý cực đại)**, không phải bình phương tối thiểu.\
- **Ranh giới quyết định** tuyến tính (mặc định); phân loại bằng cách so xác suất với ngưỡng (thường 0.5, có thể điều chỉnh theo bài toán).

## Detailed Answer (EN)
Because it estimates the **probability** that a sample belongs to the positive class, then compares it to a threshold to produce a label. Internally it still computes a linear combination `z = β₀ + βᵀx` like linear regression, but passes it through the **sigmoid/logistic** function `σ(z) = 1 / (1 + e^(-z))` to squash it into `(0, 1)` — a probability.\
\
The word \\"regression\\" refers to the fact that it **regresses the log-odds (logit)** on the features: `log(p / (1 − p)) = βᵀx` is linear.\
\
Key differences from linear regression:\
\
- **Output** is bounded in `(0, 1)`, not an arbitrary real number.\
- **Loss function** is **log-loss (cross-entropy / maximum likelihood)**, not least squares.\
- **Decision boundary** is linear (by default); classification compares the probability to a threshold (commonly 0.5, tunable per problem).
