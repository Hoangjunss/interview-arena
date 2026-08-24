---
id: phan-phoi-chuan-la-gi-va-z-score-dung-de-lam-gi
position: backend
technology: distributions
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân phối chuẩn là gì và z-score dùng để làm gì?

## Question (EN)
What is the normal distribution, and what is a z-score for?

## Đáp án chi tiết (VI)
**Phân phối chuẩn (Gaussian)** là phân phối đối xứng hình chuông, xác định hoàn toàn bởi trung bình `μ` và độ lệch chuẩn `σ`, ký hiệu `N(μ, σ²)`.\
\
**Quy tắc 68–95–99.7** (empirical rule):\
- ~68% dữ liệu nằm trong `μ ± 1σ`\
- ~95% nằm trong `μ ± 2σ`\
- ~99.7% nằm trong `μ ± 3σ`\
\
**z-score** chuẩn hoá một giá trị về phân phối chuẩn chuẩn tắc `N(0,1)`:\
\
`z = (x − μ) / σ`\
\
z cho biết `x` cách trung bình **bao nhiêu độ lệch chuẩn** (z âm = dưới trung bình). Ứng dụng: so sánh giá trị từ các thang đo khác nhau, tra xác suất phần đuôi, và phát hiện ngoại lai (ví dụ `|z| \u003e 3`).

## Detailed Answer (EN)
The **normal (Gaussian) distribution** is a symmetric bell-shaped distribution fully described by its mean `μ` and standard deviation `σ`, written `N(μ, σ²)`.\
\
**The 68–95–99.7 (empirical) rule:**\
- ~68% of data falls within `μ ± 1σ`\
- ~95% within `μ ± 2σ`\
- ~99.7% within `μ ± 3σ`\
\
A **z-score** standardizes a value to the standard normal `N(0,1)`:\
\
`z = (x − μ) / σ`\
\
The z-score says how many **standard deviations** `x` is from the mean (negative z = below the mean). Uses: comparing values measured on different scales, looking up tail probabilities, and flagging outliers (e.g. `|z| \u003e 3`).
