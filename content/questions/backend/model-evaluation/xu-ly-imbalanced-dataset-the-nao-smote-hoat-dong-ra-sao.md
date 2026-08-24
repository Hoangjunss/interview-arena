---
id: xu-ly-imbalanced-dataset-the-nao-smote-hoat-dong-ra-sao
position: backend
technology: model-evaluation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xử lý imbalanced dataset thế nào? SMOTE hoạt động ra sao?

## Question (EN)
How do you handle an imbalanced dataset? How does SMOTE work?

## Đáp án chi tiết (VI)
Dữ liệu lệch lớp (ví dụ 99% âm, 1% dương như phát hiện gian lận) khiến **accuracy đánh lừa** — một mô hình luôn đoán lớp đa số vẫn đạt 99%. Cần xử lý cả metric lẫn dữ liệu:\
\
- **Chọn metric phù hợp** — precision, recall, F1, PR-AUC thay vì accuracy.\
- **Điều chỉnh trọng số lớp** (`class_weight`) — phạt nặng hơn khi đoán sai lớp thiểu số.\
- **Điều chỉnh ngưỡng** quyết định thay vì mặc định 0.5.\
- **Resampling** — oversample lớp thiểu số hoặc undersample lớp đa số.\
\
**SMOTE (Synthetic Minority Over-sampling Technique)** thay vì nhân bản trùng lặp, nó *tạo mẫu tổng hợp mới*: chọn một điểm thuộc lớp thiểu số, tìm các láng giềng gần nhất (kNN) cùng lớp, rồi sinh điểm mới nằm **nội suy trên đoạn thẳng** giữa điểm gốc và một láng giềng.\
\
Lưu ý quan trọng: **chỉ SMOTE trên tập train**, sau khi đã chia — làm trước khi chia sẽ rò rỉ dữ liệu. SMOTE cũng có thể tạo nhiễu ở vùng ranh giới lớp (biến thể Borderline-SMOTE, ADASYN cải thiện điểm này).

## Detailed Answer (EN)
$86
