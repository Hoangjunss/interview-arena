---
id: phan-biet-severity-va-priority-khi-bao-loi
position: backend
technology: quản-lý-lỗi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt Severity và Priority khi báo lỗi?

## Question (EN)
What is the difference between Severity and Priority in a bug report?

## Đáp án chi tiết (VI)
- **Severity (mức nghiêm trọng)** — lỗi ảnh hưởng tới hệ thống **nặng tới đâu về mặt kỹ thuật**. Do **tester** đánh giá (crash, mất dữ liệu → cao; lệch giao diện nhỏ → thấp).\
- **Priority (mức ưu tiên)** — lỗi cần được **sửa gấp tới đâu về mặt nghiệp vụ**. Do **PO/PM** quyết theo giá trị kinh doanh, lịch release.\
\
Hai trục **độc lập**, nên có đủ 4 tổ hợp:\
- **Cao / Thấp**: app crash ở một tính năng gần như không ai dùng.\
- **Thấp / Cao**: gõ sai tên thương hiệu trên trang chủ — nhẹ về kỹ thuật nhưng phải sửa ngay.\
\
Đừng gộp hai khái niệm này làm một khi báo lỗi.

## Detailed Answer (EN)
- **Severity** — **how badly the defect impacts the system, technically**. Assessed by the **tester** (crash, data loss → high; a minor UI misalignment → low).\
- **Priority** — **how urgently it should be fixed, from a business view**. Decided by the **PO/PM** based on business value and release schedule.\
\
The two axes are **independent**, so all four combinations exist:\
- **High / Low**: an app crash in a feature almost nobody uses.\
- **Low / High**: a misspelled brand name on the homepage — technically minor but must be fixed immediately.\
\
Do not collapse these two into one when filing a bug.
