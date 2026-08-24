---
id: duong-cong-roc-va-chi-so-auc-la-gi
position: backend
technology: model-evaluation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đường cong ROC và chỉ số AUC là gì?

## Question (EN)
What are the ROC curve and AUC?

## Đáp án chi tiết (VI)
Bộ phân loại xác suất cần một **ngưỡng** để biến xác suất thành nhãn 0/1. **ROC curve** vẽ quan hệ giữa hai đại lượng khi quét ngưỡng từ 0 đến 1:\
\
- Trục tung: **TPR = Recall = TP / (TP + FN)**.\
- Trục hoành: **FPR = FP / (FP + TN)**.\
\
**AUC** là diện tích dưới đường ROC. Diễn giải trực quan: AUC là **xác suất mô hình chấm điểm một mẫu dương ngẫu nhiên cao hơn một mẫu âm ngẫu nhiên**. Thang giá trị: `AUC = 1` là hoàn hảo, `0.5` là đoán mò (đường chéo), dưới `0.5` là tệ hơn ngẫu nhiên (có thể do đảo nhãn).\
\
Ưu điểm: **độc lập với ngưỡng** và không phụ thuộc tỷ lệ lớp cụ thể. Lưu ý: khi dữ liệu lệch lớp nặng, ROC-AUC có thể lạc quan quá mức — nên xem thêm **Precision-Recall AUC** vì nó nhạy hơn với hiệu năng ở lớp thiểu số.

## Detailed Answer (EN)
A probabilistic classifier needs a **threshold** to turn probabilities into 0/1 labels. The **ROC curve** plots the relationship between two quantities as the threshold sweeps from 0 to 1:\
\
- Y-axis: **TPR = Recall = TP / (TP + FN)**.\
- X-axis: **FPR = FP / (FP + TN)**.\
\
**AUC** is the area under the ROC curve. Intuitive reading: AUC is the **probability the model scores a random positive higher than a random negative**. Scale: `AUC = 1` is perfect, `0.5` is random guessing (the diagonal), below `0.5` is worse than random (often flipped labels).\
\
Strengths: it is **threshold-independent** and not tied to a specific decision cutoff. Caveat: under heavy class imbalance ROC-AUC can look overly optimistic — also check the **Precision-Recall AUC**, which is more sensitive to minority-class performance.
