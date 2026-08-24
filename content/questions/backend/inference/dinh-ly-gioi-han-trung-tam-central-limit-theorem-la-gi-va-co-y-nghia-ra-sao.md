---
id: dinh-ly-gioi-han-trung-tam-central-limit-theorem-la-gi-va-co-y-nghia-ra-sao
position: backend
technology: inference
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Định lý giới hạn trung tâm (Central Limit Theorem) là gì và có ý nghĩa ra sao?

## Question (EN)
What is the Central Limit Theorem and why does it matter?

## Đáp án chi tiết (VI)
CLT phát biểu rằng khi cỡ mẫu `n` đủ lớn, **phân phối của trung bình mẫu** (`x̄`) xấp xỉ **phân phối chuẩn**, bất kể phân phối gốc của tổng thể có hình dạng gì — miễn là các quan sát **độc lập, cùng phân phối** và tổng thể có phương sai hữu hạn.\
\
- Trung bình của phân phối mẫu bằng trung bình tổng thể `μ`.\
- Độ lệch chuẩn của nó là **sai số chuẩn** `SE = σ/√n` (giảm khi `n` tăng).\
- Quy tắc kinh nghiệm: `n ≥ 30` thường đủ; cần ít hơn nếu tổng thể khá đối xứng, cần nhiều hơn nếu lệch mạnh.\
\
**Ý nghĩa:** đây là lý do ta dùng được suy diễn dựa trên phân phối chuẩn (kiểm định z/t, khoảng tin cậy) cho trung bình ngay cả khi dữ liệu gốc không chuẩn. Lưu ý: CLT nói về phân phối của **trung bình (hoặc tổng)**, không phải nói từng điểm dữ liệu riêng lẻ trở nên chuẩn.

## Detailed Answer (EN)
The CLT states that for a large enough sample size `n`, the **distribution of the sample mean** (`x̄`) is approximately **normal**, regardless of the shape of the underlying population — provided observations are **independent, identically distributed**, and the population has finite variance.\
\
- The mean of that sampling distribution equals the population mean `μ`.\
- Its standard deviation is the **standard error** `SE = σ/√n` (shrinks as `n` grows).\
- Rule of thumb: `n ≥ 30` is usually enough; fewer if the population is fairly symmetric, more if it is strongly skewed.\
\
**Why it matters:** it is why normal-based inference (z/t tests, confidence intervals) works for means even when the raw data is not normal. Note: the CLT is about the distribution of the **mean (or sum)**, not about individual data points becoming normal.
