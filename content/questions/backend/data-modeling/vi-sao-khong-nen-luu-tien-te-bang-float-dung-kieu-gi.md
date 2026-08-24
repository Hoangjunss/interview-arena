---
id: vi-sao-khong-nen-luu-tien-te-bang-float-dung-kieu-gi
position: backend
technology: data-modeling
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không nên lưu tiền tệ bằng float? Dùng kiểu gì?

## Question (EN)
Why should you not store money as a float? What type should you use?

## Đáp án chi tiết (VI)
Số **dấu phẩy động (`float`, `double`, `real`)** lưu theo chuẩn nhị phân IEEE 754 → nhiều giá trị thập phân **không biểu diễn chính xác** được (kinh điển `0.1 + 0.2 !== 0.3`). Với tiền tệ, sai số nhỏ **tích lũy** qua nhiều phép cộng/nhân sẽ gây lệch số dư, lệch báo cáo — không chấp nhận được.\
\
Cách đúng:\
- **Kiểu `NUMERIC` / `DECIMAL(precision, scale)`**: số thập phân **chính xác tuyệt đối**, phép cộng/trừ/nhân cho kết quả đúng. PostgreSQL docs khuyến nghị `numeric` cho \\"monetary amounts and other quantities where exactness is required\\". Vd `DECIMAL(12, 2)` cho tới 12 chữ số, 2 số lẻ.\
- **Hoặc lưu số nguyên đơn vị nhỏ nhất**: lưu **cents/xu** dưới dạng `BIGINT` (10.00đ → `1000`) rồi chia khi hiển thị — tránh hẳn phân số, hợp hệ tính toán nhiều.\
\
Tránh: `MONEY` của một số hệ (Postgres có kiểu `money` nhưng phụ thuộc locale, ít linh hoạt — thường khuyên dùng `numeric` hơn).\
\
Chốt: **`DECIMAL/NUMERIC`** hoặc **số nguyên đơn vị nhỏ nhất** cho tiền; **không bao giờ float**. Đây là câu bẫy rất hay gặp.

## Detailed Answer (EN)
$86
