---
id: do-xien-skewness-va-do-nhon-kurtosis-la-gi
position: backend
technology: descriptive
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Độ xiên (skewness) và độ nhọn (kurtosis) là gì?

## Question (EN)
What are skewness and kurtosis?

## Đáp án chi tiết (VI)
Cả hai mô tả **hình dạng phân phối** vượt ngoài mean và variance.\
\
**Skewness (độ xiên)** đo mức bất đối xứng:\
- **Xiên phải / dương** — đuôi dài về phải, `mean \u003e median` (ví dụ thu nhập, thời gian phản hồi).\
- **Xiên trái / âm** — đuôi dài về trái, `mean \u003c median`.\
- **Xiên ≈ 0** — gần đối xứng.\
\
**Kurtosis (độ nhọn)** đo độ nặng của đuôi / khả năng có ngoại lai:\
- Phân phối chuẩn có kurtosis = **3**; ta hay dùng **excess kurtosis = kurtosis − 3** nên chuẩn = 0.\
- **Leptokurtic** (excess \u003e 0) — đuôi nặng, nhiều ngoại lai hơn.\
- **Platykurtic** (excess \u003c 0) — đuôi nhẹ, ít ngoại lai.\
\
**Ứng dụng:** kiểm tra giả định về tính chuẩn trước khi áp dụng phương pháp tham số, và cảnh báo dữ liệu dễ có giá trị cực đoan (quan trọng trong tài chính, quản trị rủi ro).

## Detailed Answer (EN)
Both describe the **shape of a distribution** beyond its mean and variance.\
\
**Skewness** measures asymmetry:\
- **Right / positive skew** — a long right tail, `mean \u003e median` (e.g. income, response times).\
- **Left / negative skew** — a long left tail, `mean \u003c median`.\
- **Skew ≈ 0** — roughly symmetric.\
\
**Kurtosis** measures tail heaviness / the propensity for outliers:\
- The normal distribution has kurtosis = **3**; people often use **excess kurtosis = kurtosis − 3**, so normal = 0.\
- **Leptokurtic** (excess \u003e 0) — heavy tails, more outliers.\
- **Platykurtic** (excess \u003c 0) — light tails, fewer outliers.\
\
**Uses:** checking normality assumptions before applying parametric methods, and flagging data prone to extreme values (important in finance and risk management).
