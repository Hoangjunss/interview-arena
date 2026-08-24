---
id: quiz-postgresql-vacuum-trong-postgres-lam-nhiem-vu-chinh-gi
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
VACUUM trong Postgres làm nhiệm vụ chính gì?

## Đáp án trắc nghiệm
- [ ] Xoá dữ liệu cũ theo chính sách retention được cấu hình cho từng bảng
- [ ] Nén dữ liệu trong bảng để giảm dung lượng lưu trữ
- [ ] Xây lại toàn bộ index của bảng cho khỏi phân mảnh
- [x] Dọn dead tuples để chỗ trống được tái sử dụng

## Giải thích (VI)
VACUUM dọn dead tuples — các phiên bản row cũ do UPDATE/DELETE để lại — để chỗ trống được tái sử dụng cho lần ghi sau, đồng thời cập nhật visibility map và bảo vệ hệ thống khỏi transaction ID wraparound. Autovacuum là tiến trình nền tự chạy việc này; bình thường không cần chạy VACUUM tay.

### Giải thích các phương án:
- **Xoá dữ liệu cũ theo chính sách retention được cấu hình cho từng bảng** (Sai): Postgres không có retention tự động; dead tuple là rác MVCC, không phải dữ liệu hết hạn.
- **Nén dữ liệu trong bảng để giảm dung lượng lưu trữ** (Sai): VACUUM thường không trả đĩa về hệ điều hành; nó thu hồi chỗ để tái sử dụng nội bộ.
- **Xây lại toàn bộ index của bảng cho khỏi phân mảnh** (Sai): Xây lại index là việc của REINDEX; VACUUM chỉ dọn entry trỏ tới tuple chết.
- **Dọn dead tuples để chỗ trống được tái sử dụng** (Đúng): Đây là công việc cốt lõi: thu hồi chỗ của phiên bản row đã chết và duy trì visibility map.
