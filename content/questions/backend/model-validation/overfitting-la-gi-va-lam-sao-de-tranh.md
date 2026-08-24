---
id: overfitting-la-gi-va-lam-sao-de-tranh
position: backend
technology: model-validation
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Overfitting là gì và làm sao để tránh?

## Question (EN)
What is overfitting and how do you prevent it?

## Đáp án chi tiết (VI)
Overfitting là khi mô hình học thuộc cả nhiễu và chi tiết riêng của tập huấn luyện thay vì quy luật tổng quát — kết quả là điểm số trên tập train rất cao nhưng kém trên dữ liệu mới. Dấu hiệu nhận biết: **khoảng cách lớn giữa train error và validation/test error**. (Ngược lại, underfit là kém cả trên train lẫn test.)\
\
**Cách hạn chế:**\
- **Cross-validation** để ước lượng khả năng tổng quát hoá trung thực khi chọn mô hình/siêu tham số.\
- **Regularization** (L1/L2) để phạt độ phức tạp.\
- **Đơn giản hoá mô hình** — giảm số tham số, giảm độ sâu cây, giảm bậc đa thức.\
- **Thêm dữ liệu** hoặc **data augmentation**.\
- **Early stopping** — dừng khi validation error bắt đầu tăng.\
- **Feature selection** để bỏ đặc trưng nhiễu; với mạng nơ-ron còn có **dropout**.

## Detailed Answer (EN)
Overfitting is when a model memorizes noise and quirks of the training set instead of the general pattern — scoring very high on training data but poorly on new data. Telltale sign: **a large gap between training error and validation/test error**. (The opposite, underfitting, is poor performance on both train and test.)\
\
**How to mitigate:**\
- **Cross-validation** for an honest generalization estimate when choosing models/hyperparameters.\
- **Regularization** (L1/L2) to penalize complexity.\
- **Simpler models** — fewer parameters, shallower trees, lower polynomial degree.\
- **More data** or **data augmentation**.\
- **Early stopping** — halt once validation error starts rising.\
- **Feature selection** to drop noisy features; for neural nets, **dropout**.
