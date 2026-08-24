---
id: confusion-matrix-la-gi-phan-biet-precision-recall-va-f1-score
position: backend
technology: model-evaluation
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Confusion matrix là gì? Phân biệt precision, recall và F1-score.

## Question (EN)
What is a confusion matrix? Distinguish precision, recall, and F1-score.

## Đáp án chi tiết (VI)
Với bài toán phân loại nhị phân, **confusion matrix** là bảng 2×2 so khớp nhãn thật với nhãn dự đoán, gồm 4 ô: **TP** (dự đoán dương đúng), **TN** (dự đoán âm đúng), **FP** (dương giả — báo dương nhưng thật ra âm), **FN** (âm giả — bỏ sót ca dương).\
\
- **Precision = TP / (TP + FP)** — trong những ca dự đoán dương, bao nhiêu thật sự dương. Quan trọng khi FP tốn kém (ví dụ lọc email: đừng chặn nhầm email thật).\
- **Recall (Sensitivity) = TP / (TP + FN)** — trong những ca thật sự dương, bắt được bao nhiêu. Quan trọng khi FN tốn kém (ví dụ tầm soát ung thư: đừng bỏ sót bệnh nhân).\
- **F1 = 2·P·R / (P + R)** — trung bình điều hoà của precision và recall, cân bằng khi cần cả hai và dữ liệu lệch lớp.\
\
Precision và recall thường đánh đổi nhau; F1 tóm tắt bằng một con số, còn **accuracy** dễ gây hiểu nhầm khi lớp mất cân bằng.

## Detailed Answer (EN)
For binary classification, a **confusion matrix** is a 2×2 table matching true vs predicted labels, with 4 cells: **TP** (correct positive), **TN** (correct negative), **FP** (false positive — predicted positive but actually negative), **FN** (false negative — a missed positive).\
\
- **Precision = TP / (TP + FP)** — of predicted positives, how many are truly positive. Matters when FPs are costly (e.g. spam filtering: don't block real mail).\
- **Recall (Sensitivity) = TP / (TP + FN)** — of actual positives, how many you catch. Matters when FNs are costly (e.g. cancer screening: don't miss patients).\
- **F1 = 2·P·R / (P + R)** — the harmonic mean of precision and recall, balancing both, useful under class imbalance.\
\
Precision and recall usually trade off; F1 summarizes them in one number, whereas **accuracy** can mislead under class imbalance.
