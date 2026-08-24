---
id: thong-ke-mo-ta-phan-biet-mean-median-mode-va-variance-std
position: backend
technology: descriptive
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thống kê mô tả: phân biệt mean/median/mode và variance/std.

## Question (EN)
Descriptive statistics: distinguish mean/median/mode and variance/std.

## Đáp án chi tiết (VI)
**Đo xu hướng trung tâm:**\
- **Mean (trung bình)** — tổng chia số phần tử; **nhạy với ngoại lai**.\
- **Median (trung vị)** — giá trị ở giữa khi sắp xếp; **bền vững** với ngoại lai và phân phối lệch.\
- **Mode (mode/yếu vị)** — giá trị xuất hiện nhiều nhất; dùng được cho dữ liệu phân loại.\
\
Với dữ liệu lệch (như thu nhập), **median** thường đại diện tốt hơn mean.\
\
**Đo độ phân tán:**\
- **Variance (phương sai)** — trung bình bình phương độ lệch so với mean. Mẫu: `s² = Σ(xᵢ − x̄)² / (n − 1)` (chia `n − 1` — hiệu chỉnh Bessel để ước lượng không chệch); tổng thể chia `N`.\
- **Standard deviation (độ lệch chuẩn)** = `√variance`, **cùng đơn vị với dữ liệu** nên dễ diễn giải hơn phương sai.\
\
Ngoài ra còn **range** và **IQR** (khoảng tứ phân vị) — thước đo phân tán bền vững với ngoại lai.

## Detailed Answer (EN)
**Measures of central tendency:**\
- **Mean (average)** — sum divided by count; **sensitive to outliers**.\
- **Median** — the middle value when sorted; **robust** to outliers and skew.\
- **Mode** — the most frequent value; works for categorical data too.\
\
For skewed data (like income), the **median** is often more representative than the mean.\
\
**Measures of spread:**\
- **Variance** — the average squared deviation from the mean. Sample: `s² = Σ(xᵢ − x̄)² / (n − 1)` (dividing by `n − 1` — Bessel's correction for an unbiased estimate); population divides by `N`.\
- **Standard deviation** = `√variance`, in the **same units as the data**, so it is more interpretable than variance.\
\
Also common are the **range** and **IQR** (interquartile range) — spread measures robust to outliers.
