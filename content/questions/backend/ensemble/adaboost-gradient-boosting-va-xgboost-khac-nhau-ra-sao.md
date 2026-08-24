---
id: adaboost-gradient-boosting-va-xgboost-khac-nhau-ra-sao
position: backend
technology: ensemble
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
AdaBoost, Gradient Boosting và XGBoost khác nhau ra sao?

## Question (EN)
How do AdaBoost, gradient boosting, and XGBoost differ?

## Đáp án chi tiết (VI)
Cả ba đều là **boosting** — ghép nhiều mô hình yếu (thường là cây nông) theo tuần tự — nhưng cách \\"học từ lỗi\\" khác nhau:\
\
- **AdaBoost**: sau mỗi vòng, **tăng trọng số** cho mẫu bị phân loại sai để mô hình tiếp theo chú ý hơn; kết quả cuối là tổng có trọng số của các mô hình yếu (mô hình chính xác hơn được trọng số lớn hơn).\
- **Gradient Boosting**: tổng quát hóa hơn — mỗi mô hình mới khớp với **gradient âm của hàm mất mát** (với bình phương sai số thì đúng bằng phần dư) của tổ hợp hiện tại. Cho phép dùng bất kỳ hàm mất mát khả vi nào (hồi quy, phân loại, ranking).\
- **XGBoost**: một hiện thực gradient boosting tối ưu hóa. Nó thêm **regularization** (phạt độ phức tạp cây) vào hàm mục tiêu, dùng **khai triển bậc hai (Newton)** với cả gradient lẫn hessian, cộng nhiều tối ưu kỹ thuật (xử lý giá trị thiếu, tìm điểm tách song song, tận dụng cache). Nhờ vậy vừa chính xác vừa nhanh — rất phổ biến trên dữ liệu dạng bảng.

## Detailed Answer (EN)
All three are **boosting** — chaining many weak learners (usually shallow trees) sequentially — but differ in how they \\"learn from errors\\":\
\
- **AdaBoost**: after each round it **up-weights** the misclassified samples so the next learner pays more attention; the final output is a weighted sum of weak learners (more accurate ones get larger weights).\
- **Gradient Boosting**: more general — each new model fits the **negative gradient of the loss function** (which equals the residuals under squared error) of the current ensemble. This allows any differentiable loss (regression, classification, ranking).\
- **XGBoost**: an optimized implementation of gradient boosting. It adds **regularization** (penalizing tree complexity) to the objective, uses a **second-order (Newton) expansion** with both gradient and hessian, plus many systems optimizations (missing-value handling, parallel split finding, cache awareness). The result is both accurate and fast — a go-to for tabular data.
