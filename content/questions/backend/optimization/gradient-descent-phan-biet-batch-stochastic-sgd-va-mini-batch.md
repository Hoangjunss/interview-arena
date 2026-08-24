---
id: gradient-descent-phan-biet-batch-stochastic-sgd-va-mini-batch
position: backend
technology: optimization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gradient descent: phân biệt batch, stochastic (SGD) và mini-batch.

## Question (EN)
Gradient descent: distinguish batch, stochastic (SGD), and mini-batch.

## Đáp án chi tiết (VI)
Gradient descent cập nhật tham số theo hướng ngược gradient của hàm mất mát. Ba biến thể khác nhau ở lượng dữ liệu dùng cho mỗi bước cập nhật:\
\
- **Batch GD** — tính gradient trên **toàn bộ** tập dữ liệu rồi mới cập nhật một lần. Hướng đi chính xác, hội tụ mượt, nhưng mỗi bước rất tốn bộ nhớ và chậm khi dữ liệu lớn.\
- **Stochastic GD (SGD)** — cập nhật sau **mỗi một mẫu**. Rất nhanh và ít tốn bộ nhớ, cập nhật nhiễu (đường đi zic-zac) — nhiễu này đôi khi giúp thoát cực tiểu địa phương, nhưng cần **learning rate schedule** giảm dần để hội tụ ổn định.\
- **Mini-batch GD** — cập nhật trên **một lô nhỏ** (thường 32–256 mẫu). Dung hoà giữa hai cực: đủ ổn định lại tận dụng được tính toán vector hoá trên GPU. Đây là mặc định thực tế cho deep learning.\
\
Trong scikit-learn, `SGDClassifier`/`SGDRegressor` cài SGD cho mô hình tuyến tính, hữu ích khi dữ liệu lớn không vừa bộ nhớ (hỗ trợ học từng phần `partial_fit`). Nhớ **scale đặc trưng** vì SGD nhạy với thang đo.

## Detailed Answer (EN)
$88
