---
id: regularization-la-gi-phan-biet-l1-lasso-l2-ridge-va-elastic-net
position: backend
technology: regularization
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Regularization là gì? Phân biệt L1 (Lasso), L2 (Ridge) và Elastic Net.

## Question (EN)
What is regularization? Distinguish L1 (Lasso), L2 (Ridge), and Elastic Net.

## Đáp án chi tiết (VI)
Regularization thêm một số hạng phạt vào hàm mất mát để kìm độ lớn của hệ số, giảm variance và chống overfit. Cường độ do siêu tham số `λ` (hay `α`) điều khiển.\
\
- **L2 / Ridge** — phạt `λ·Σβⱼ²`. Co các hệ số về gần 0 nhưng **không đúng bằng 0**. Xử lý tốt khi có nhiều đặc trưng tương quan cao (chia đều trọng số giữa chúng). Nghiệm khả vi, tính được dạng đóng.\
- **L1 / Lasso** — phạt `λ·Σ|βⱼ|`. Có thể đẩy một số hệ số **về đúng 0**, nên vừa hồi quy vừa **chọn đặc trưng** (tạo nghiệm thưa). Hữu ích khi nghi ngờ chỉ một phần nhỏ đặc trưng thật sự quan trọng.\
- **Elastic Net** — kết hợp cả L1 và L2. Vừa tạo nghiệm thưa vừa ổn định khi các đặc trưng tương quan cao (Lasso thuần dễ chọn ngẫu nhiên 1 trong nhóm tương quan).\
\
Lưu ý: nên **chuẩn hoá đặc trưng** trước khi phạt, vì phạt phụ thuộc thang đo của hệ số.

## Detailed Answer (EN)
Regularization adds a penalty term to the loss to restrain coefficient magnitudes, reducing variance and curbing overfitting. Its strength is set by the hyperparameter `λ` (or `α`).\
\
- **L2 / Ridge** — penalizes `λ·Σβⱼ²`. Shrinks coefficients toward 0 but **not exactly to 0**. Handles many highly correlated features well (spreads weight across them). Differentiable, with a closed-form solution.\
- **L1 / Lasso** — penalizes `λ·Σ|βⱼ|`. Can drive some coefficients **exactly to 0**, so it does regression and **feature selection** at once (produces sparse solutions). Useful when you suspect only a small subset of features truly matter.\
- **Elastic Net** — combines L1 and L2. Yields sparsity while staying stable under correlated features (pure Lasso tends to pick one arbitrarily from a correlated group).\
\
Note: **standardize features** before penalizing, since the penalty depends on coefficient scale.
