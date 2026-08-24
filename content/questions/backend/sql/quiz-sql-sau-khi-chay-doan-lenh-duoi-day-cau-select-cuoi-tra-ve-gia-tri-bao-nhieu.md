---
id: quiz-sql-sau-khi-chay-doan-lenh-duoi-day-cau-select-cuoi-tra-ve-gia-tri-bao-nhieu
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sau khi chạy đoạn lệnh dưới đây, câu SELECT cuối trả về giá trị bao nhiêu?

## Đáp án trắc nghiệm
- [ ] Lỗi — không thể SELECT sau ROLLBACK vì transaction đã bị hủy, phải mở lại kết nối
- [ ] 50 — UPDATE đã thực thi thành công nên giá trị mới được giữ lại bất kể ROLLBACK
- [x] 100 — ROLLBACK hủy toàn bộ thay đổi trong transaction, dữ liệu trở về đúng trạng thái trước BEGIN như chưa từng chạy UPDATE
- [ ] 50 — ROLLBACK chỉ có tác dụng với DELETE, còn UPDATE không hoàn tác được

## Giải thích (VI)
Kết quả là 100. Transaction gom các lệnh thành khối atomic: COMMIT làm mọi thay đổi bền vững, ROLLBACK hủy sạch như chưa từng chạy — kể cả UPDATE đã thực thi thành công bên trong khối. Sau ROLLBACK, balance trở về giá trị trước BEGIN. Đây là tính Atomicity trong ACID, nền tảng cho chuyển tiền, đặt chỗ và mọi nghiệp vụ nhiều bước không được phép dừng nửa chừng.

### Giải thích các phương án:
- **Lỗi — không thể SELECT sau ROLLBACK vì transaction đã bị hủy, phải mở lại kết nối** (Sai): ROLLBACK kết thúc transaction hiện tại nhưng kết nối vẫn dùng bình thường — câu SELECT sau đó chạy như một lệnh độc lập.
- **50 — UPDATE đã thực thi thành công nên giá trị mới được giữ lại bất kể ROLLBACK** (Sai): Thay đổi trong transaction chỉ trở thành bền vững khi COMMIT; ROLLBACK hủy sạch, kể cả các câu lệnh đã chạy thành công bên trong.
- **100 — ROLLBACK hủy toàn bộ thay đổi trong transaction, dữ liệu trở về đúng trạng thái trước BEGIN như chưa từng chạy UPDATE** (Đúng): Đúng: transaction là khối "được ăn cả, ngã về không" — ROLLBACK loại bỏ mọi thay đổi chưa commit.
- **50 — ROLLBACK chỉ có tác dụng với DELETE, còn UPDATE không hoàn tác được** (Sai): ROLLBACK hoàn tác mọi thao tác DML trong transaction (INSERT, UPDATE, DELETE) — không có phân biệt nào theo loại lệnh.
