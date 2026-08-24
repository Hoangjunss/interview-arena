---
id: quiz-postgresql-khi-chay-update-mot-row-trong-postgres-dieu-gi-thuc-su-xay-ra-o-tang-luu-tr
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi chạy UPDATE một row trong Postgres, điều gì thực sự xảy ra ở tầng lưu trữ?

## Đáp án trắc nghiệm
- [ ] Sửa giá trị tại chỗ trong page chứa row đó
- [ ] Xoá row cũ khỏi đĩa rồi insert row mới vào chỗ trống
- [x] Tạo phiên bản row mới; bản cũ thành dead tuple
- [ ] Ghi thay đổi vào WAL, còn bảng chỉ được sửa khi checkpoint

## Giải thích (VI)
Postgres không sửa row tại chỗ : UPDATE tạo một phiên bản row mới, còn phiên bản cũ chỉ bị đánh dấu hết hạn và trở thành dead tuple — chiếm chỗ trên đĩa tới khi VACUUM dọn. DELETE cũng vậy: row chỉ bị đánh dấu, chưa biến mất.

### Giải thích các phương án:
- **Sửa giá trị tại chỗ trong page chứa row đó** (Sai): Sửa tại chỗ sẽ phá snapshot của các transaction đang đọc phiên bản cũ.
- **Xoá row cũ khỏi đĩa rồi insert row mới vào chỗ trống** (Sai): Row cũ chưa bị xoá vật lý — nó phải còn đó cho transaction khác đang đọc.
- **Tạo phiên bản row mới; bản cũ thành dead tuple** (Đúng): UPDATE trong Postgres về bản chất là insert phiên bản mới + đánh dấu phiên bản cũ hết hạn.
- **Ghi thay đổi vào WAL, còn bảng chỉ được sửa khi checkpoint** (Sai): WAL ghi trước để phục hồi, nhưng bảng vẫn nhận phiên bản row mới ngay.
