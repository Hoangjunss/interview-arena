---
id: postgresql-la-gi-va-khi-nao-nen-chon
position: backend
technology: core-sql
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PostgreSQL là gì và khi nào nên chọn?

## Question (EN)
What is PostgreSQL and when should you choose it?

## Đáp án chi tiết (VI)
PostgreSQL là relational database (cơ sở dữ liệu quan hệ) mã nguồn mở — dữ liệu nằm trong các bảng có cột rõ ràng và ràng buộc chặt chẽ. Điểm mạnh chính: SQL chuẩn, transaction ACID (làm là đúng và đủ, không nửa vời), nhiều loại index để query nhanh, và kiểu JSONB cho phép lưu dữ liệu linh hoạt như NoSQL ngay trong DB quan hệ.\
\
Nên chọn khi: dữ liệu có quan hệ rõ (một user có nhiều order...), cần chính xác tuyệt đối (thanh toán, tồn kho), query phức tạp hoặc làm báo cáo. Không nên chọn khi workload chủ yếu là cache key-value (Redis hợp hơn), time-series cực lớn, hoặc chỉ lưu document mà không cần ràng buộc quan hệ. Đừng chọn chỉ vì \\"quen tay\\".

## Detailed Answer (EN)
PostgreSQL is an open-source relational database — data lives in tables with clear columns and strict constraints. Key strengths: standard SQL, ACID transactions (work is correct and complete, never half-done), many index types for fast queries, and the JSONB type that lets you store flexible NoSQL-style data inside a relational DB.\
\
Choose it when data has clear relationships (one user has many orders...), needs to be exactly correct (payments, inventory), has complex queries or reporting. Avoid it when the workload is mainly key-value cache (Redis fits better), massive time-series, or document-only data with no relational constraints. Do not pick it just out of habit.
