---
id: quiz-postgresql-xem-index-duoi-day-truy-van-nao-duoc-no-tang-toc
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xem index dưới đây. Truy vấn nào được nó tăng tốc?

## Đáp án trắc nghiệm
- [ ] SELECT FROM orders WHERE status = 'shipped' ORDER BY created at
- [x] SELECT FROM orders WHERE status = 'pending' ORDER BY created at LIMIT 50
- [ ] SELECT FROM orders ORDER BY created at DESC
- [ ] SELECT count( ) FROM orders GROUP BY status

## Giải thích (VI)
Chỉ truy vấn có điều kiện bao được mệnh đề WHERE của index — ở đây là status = 'pending'. Partial index hợp lý khi ứng dụng lặp đi lặp lại một tập con nhỏ: đơn chưa xử lý, user chưa xoá, job đang chờ. Index nhỏ hơn nhiều lần so với index cả bảng và không tốn chi phí ghi cho các dòng ngoài điều kiện.

### Giải thích các phương án:
- **SELECT FROM orders WHERE status = 'shipped' ORDER BY created at** (Sai): Index chỉ chứa các dòng status = 'pending' nên không phục vụ được status khác.
- **SELECT FROM orders WHERE status = 'pending' ORDER BY created at LIMIT 50** (Đúng): Điều kiện truy vấn khớp mệnh đề WHERE của index nên planner dùng được nó.
- **SELECT FROM orders ORDER BY created at DESC** (Sai): Truy vấn cần mọi dòng, còn index chỉ chứa một tập con nên không dùng được.
- **SELECT count( ) FROM orders GROUP BY status** (Sai): Đếm theo mọi status cần dữ liệu toàn bảng, ngoài phạm vi của partial index.
