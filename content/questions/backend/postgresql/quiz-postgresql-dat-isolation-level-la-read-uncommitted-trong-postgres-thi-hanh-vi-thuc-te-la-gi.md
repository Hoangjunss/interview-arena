---
id: quiz-postgresql-dat-isolation-level-la-read-uncommitted-trong-postgres-thi-hanh-vi-thuc-te-la-gi
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đặt isolation level là READ UNCOMMITTED trong Postgres thì hành vi thực tế là gì?

## Đáp án trắc nghiệm
- [x] Hoạt động y hệt READ COMMITTED
- [ ] Chỉ áp dụng được cho transaction chỉ-đọc (READ ONLY)
- [ ] Transaction đọc được dữ liệu chưa commit của transaction khác
- [ ] Postgres báo lỗi vì không hỗ trợ mức isolation này

## Giải thích (VI)
Postgres chấp nhận cú pháp nhưng đối xử y hệt READ COMMITTED — dirty read không bao giờ xảy ra trong Postgres vì MVCC chỉ cho thấy dữ liệu đã commit. Mặc định của Postgres là READ COMMITTED ; hai mức còn lại là REPEATABLE READ và SERIALIZABLE.

### Giải thích các phương án:
- **Hoạt động y hệt READ COMMITTED** (Đúng): Postgres chấp nhận cú pháp cho đúng chuẩn SQL nhưng ánh xạ nó về READ COMMITTED.
- **Chỉ áp dụng được cho transaction chỉ-đọc (READ ONLY)** (Sai): Không có ràng buộc như vậy; nó áp dụng cho mọi transaction.
- **Transaction đọc được dữ liệu chưa commit của transaction khác** (Sai): Kiến trúc MVCC của Postgres không bao giờ cho đọc dữ liệu chưa commit.
- **Postgres báo lỗi vì không hỗ trợ mức isolation này** (Sai): Lệnh được chấp nhận bình thường, không có lỗi hay cảnh báo.
