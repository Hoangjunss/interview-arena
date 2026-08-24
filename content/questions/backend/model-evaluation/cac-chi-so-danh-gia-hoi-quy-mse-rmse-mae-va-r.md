---
id: cac-chi-so-danh-gia-hoi-quy-mse-rmse-mae-va-r
position: backend
technology: model-evaluation
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các chỉ số đánh giá hồi quy: MSE, RMSE, MAE và R²?

## Question (EN)
Regression metrics: MSE, RMSE, MAE, and R²?

## Đáp án chi tiết (VI)
Bốn chỉ số phổ biến để đánh giá mô hình hồi quy (với `y` là giá trị thật, `ŷ` là dự đoán):\
\
- **MSE (Mean Squared Error)** = trung bình của `(y − ŷ)²`. Phạt **nặng lỗi lớn** (bình phương), nhạy với ngoại lai. Đơn vị là bình phương của biến mục tiêu nên khó diễn giải trực tiếp.\
- **RMSE** = `√MSE`. Cùng đơn vị với biến mục tiêu nên dễ diễn giải hơn; vẫn phạt nặng lỗi lớn.\
- **MAE (Mean Absolute Error)** = trung bình của `|y − ŷ|`. **Bền với ngoại lai** hơn MSE/RMSE vì không bình phương; mỗi lỗi đóng góp tuyến tính.\
- **R² (hệ số xác định)** = `1 − SS_res / SS_tot` — tỷ lệ phương sai của biến mục tiêu được mô hình giải thích. `R² = 1` là hoàn hảo, `0` là bằng mô hình dự đoán trung bình, và **có thể âm** khi mô hình tệ hơn cả việc luôn đoán giá trị trung bình.\
\
Chọn theo bài toán: dùng MAE khi có ngoại lai và muốn bền vững; dùng RMSE/MSE khi lỗi lớn đặc biệt tốn kém; R² để so sánh nhanh chất lượng khớp (nhưng nó tăng khi thêm biến, cân nhắc **Adjusted R²**).

## Detailed Answer (EN)
$85
