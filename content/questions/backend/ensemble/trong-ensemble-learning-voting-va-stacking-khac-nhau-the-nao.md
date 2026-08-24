---
id: trong-ensemble-learning-voting-va-stacking-khac-nhau-the-nao
position: backend
technology: ensemble
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong ensemble learning, voting và stacking khác nhau thế nào?

## Question (EN)
In ensemble learning, how do voting and stacking differ?

## Đáp án chi tiết (VI)
Cả hai đều kết hợp nhiều mô hình cơ sở (base models) để dự đoán tốt hơn từng mô hình riêng, nhưng khác ở **cách tổng hợp**:\
\
- **Voting**: gộp dự đoán bằng một **quy tắc cố định, không học**.\
  - *Hard voting*: lấy nhãn theo **đa số phiếu**.\
  - *Soft voting*: **trung bình xác suất** dự đoán rồi chọn lớp cao nhất (thường tốt hơn nếu các mô hình cho xác suất hiệu chỉnh tốt).\
  - Đơn giản, nhanh, ít rủi ro overfit.\
- **Stacking (stacked generalization)**: dùng một **meta-model** để **học cách kết hợp** đầu ra của các mô hình cơ sở. Các base model dự đoán trước; những dự đoán đó trở thành **đặc trưng đầu vào** cho meta-model. Để tránh rò rỉ dữ liệu, dự đoán của base model dùng huấn luyện meta thường được tạo bằng **cross-validation out-of-fold**.\
\
Stacking mạnh hơn voting khi các mô hình cơ sở **đa dạng** và bổ khuyết lẫn nhau, nhưng phức tạp hơn và dễ overfit hơn nếu không cẩn thận.

## Detailed Answer (EN)
Both combine multiple base models to predict better than any single one, but they differ in **how they aggregate**:\
\
- **Voting**: merges predictions with a **fixed, non-learned rule**.\
  - *Hard voting*: take the label by **majority vote**.\
  - *Soft voting*: **average the predicted probabilities** and pick the highest class (usually better if the models produce well-calibrated probabilities).\
  - Simple, fast, low overfitting risk.\
- **Stacking (stacked generalization)**: uses a **meta-model** to **learn how to combine** the base models' outputs. The base models predict first; those predictions become the **input features** for the meta-model. To avoid data leakage, the base predictions used to train the meta-model are typically generated via **out-of-fold cross-validation**.\
\
Stacking outperforms voting when the base models are **diverse** and complementary, but it is more complex and more prone to overfitting if done carelessly.
