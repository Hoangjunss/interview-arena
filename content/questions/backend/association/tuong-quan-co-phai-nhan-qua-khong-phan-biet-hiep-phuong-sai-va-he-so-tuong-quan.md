---
id: tuong-quan-co-phai-nhan-qua-khong-phan-biet-hiep-phuong-sai-va-he-so-tuong-quan
position: backend
technology: association
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tương quan có phải nhân quả không? Phân biệt hiệp phương sai và hệ số tương quan.

## Question (EN)
Does correlation imply causation? Distinguish covariance and correlation.

## Đáp án chi tiết (VI)
**Tương quan (correlation)** đo độ mạnh và chiều của quan hệ **tuyến tính** giữa hai biến. Tương quan **không** kéo theo nhân quả: một liên hệ có thể đến từ **biến gây nhiễu (confounder)**, **nhân quả ngược**, hoặc **trùng hợp ngẫu nhiên**. Chỉ **thí nghiệm có kiểm soát / ngẫu nhiên hoá** mới khẳng định được nhân quả.\
\
**Hiệp phương sai vs hệ số tương quan:**\
- **Covariance** đo chiều biến thiên chung của hai biến, nhưng **độ lớn phụ thuộc đơn vị** (không chặn, khó diễn giải và không so sánh được giữa các bộ dữ liệu).\
- **Correlation (Pearson `r`)** = covariance đã chuẩn hoá bằng tích hai độ lệch chuẩn: `r = cov(X,Y) / (σx·σy)`. Kết quả **không thứ nguyên**, nằm trong `[−1, 1]`.\
\
Hai đại lượng luôn cùng dấu; nhưng chỉ `r` mới so sánh được across datasets vì đã chuẩn hoá.

## Detailed Answer (EN)
**Correlation** measures the strength and direction of a **linear** relationship between two variables. Correlation does **not** imply causation: a link can arise from a **confounder**, **reverse causation**, or **coincidence**. Only a **controlled / randomized experiment** can establish causation.\
\
**Covariance vs correlation coefficient:**\
- **Covariance** captures the direction of joint variation, but its **magnitude depends on units** (unbounded, hard to interpret, not comparable across datasets).\
- **Correlation (Pearson `r`)** = covariance standardized by the product of the two standard deviations: `r = cov(X,Y) / (σx·σy)`. The result is **dimensionless** and lies in `[−1, 1]`.\
\
Both always share the same sign; but only `r` is comparable across datasets because it is standardized.
