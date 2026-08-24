---
id: precision-recall-tradeoff-va-threshold-tuning-la-gi
position: backend
technology: model-evaluation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Precision-recall tradeoff và threshold tuning là gì?

## Question (EN)
What is the precision-recall tradeoff and threshold tuning?

## Đáp án chi tiết (VI)
Bộ phân loại thường sinh ra một **xác suất**, rồi so với **ngưỡng** để ra nhãn dương/âm. Ngưỡng mặc định 0.5 hiếm khi tối ưu.\
\
**Đánh đổi:**\
- **Hạ ngưỡng** → gắn nhãn dương dễ hơn → **recall tăng** (bắt được nhiều ca dương) nhưng **precision giảm** (nhiều báo động giả).\
- **Nâng ngưỡng** → chỉ dự đoán dương khi rất chắc → **precision tăng** nhưng **recall giảm** (bỏ sót nhiều).\
\
**Threshold tuning** là chọn ngưỡng theo chi phí nghiệp vụ thay vì mặc định:\
- Nếu FN đắt (tầm soát bệnh) → ưu tiên recall → hạ ngưỡng.\
- Nếu FP đắt (chặn giao dịch hợp lệ) → ưu tiên precision → nâng ngưỡng.\
\
Công cụ: vẽ **precision-recall curve** để thấy đánh đổi trên mọi ngưỡng, chọn điểm tối ưu **F1** (hoặc `F-beta` nếu muốn thiên về một phía), hoặc đặt ngưỡng để đạt mức recall/precision tối thiểu theo yêu cầu. Việc chọn ngưỡng nên làm trên tập validation, không phải test.

## Detailed Answer (EN)
A classifier usually outputs a **probability**, then compares it to a **threshold** to assign a positive/negative label. The default 0.5 threshold is rarely optimal.\
\
**Tradeoff:**\
- **Lower the threshold** → label positive more readily → **recall rises** (catch more positives) but **precision falls** (more false alarms).\
- **Raise the threshold** → predict positive only when very confident → **precision rises** but **recall falls** (more misses).\
\
**Threshold tuning** is choosing the threshold by business cost rather than the default:\
- If FNs are costly (disease screening) → favor recall → lower the threshold.\
- If FPs are costly (blocking legitimate transactions) → favor precision → raise the threshold.\
\
Tooling: plot the **precision-recall curve** to see the tradeoff across all thresholds, pick the **F1**-optimal point (or `F-beta` to lean one way), or set the threshold to meet a required minimum recall/precision. Choose the threshold on the validation set, not the test set.
