---
id: cross-validation-la-gi-so-sanh-k-fold-leave-one-out-va-hold-out
position: backend
technology: model-validation
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cross-validation là gì? So sánh k-Fold, Leave-One-Out và Hold-Out.

## Question (EN)
What is cross-validation? Compare k-Fold, Leave-One-Out, and Hold-Out.

## Đáp án chi tiết (VI)
Cross-validation ước lượng khả năng tổng quát hoá bằng cách chia dữ liệu, huấn luyện và kiểm tra trên các phần khác nhau, giúp ước lượng ít may rủi hơn một lần chia duy nhất.\
\
- **Hold-out** — chia một lần thành train/test (ví dụ 80/20). Nhanh, nhưng ước lượng có **variance cao**: kết quả phụ thuộc mạnh vào cách chia rơi vào đâu.\
- **k-Fold** — chia thành k phần bằng nhau; lần lượt lấy 1 fold làm test và k−1 fold làm train, lặp k lần rồi lấy trung bình điểm số. `k = 5` hoặc `10` là lựa chọn phổ biến, cân bằng giữa bias và chi phí. Với phân loại nên dùng **stratified k-fold** để giữ tỷ lệ lớp trong mỗi fold.\
- **Leave-One-Out (LOO)** — trường hợp `k = n`, mỗi lần test đúng 1 mẫu. Bias thấp nhưng **variance cao và rất tốn kém** (train n lần); thường chỉ hợp với tập dữ liệu nhỏ.\
\
Với dữ liệu thời gian phải dùng chia theo thời gian (**TimeSeriesSplit**), không xáo trộn ngẫu nhiên.

## Detailed Answer (EN)
Cross-validation estimates generalization by splitting data and training/testing on different portions, giving a less luck-dependent estimate than a single split.\
\
- **Hold-out** — one split into train/test (e.g. 80/20). Fast, but the estimate has **high variance**: results depend heavily on where the split lands.\
- **k-Fold** — split into k equal parts; each round uses 1 fold as test and k−1 as train, repeated k times, then average the scores. `k = 5` or `10` is common, balancing bias and cost. For classification, use **stratified k-fold** to preserve class ratios per fold.\
- **Leave-One-Out (LOO)** — the case `k = n`, testing exactly 1 sample each round. Low bias but **high variance and very expensive** (trains n times); usually only worthwhile on small datasets.\
\
For time-series data use a time-ordered split (**TimeSeriesSplit**), never a random shuffle.
