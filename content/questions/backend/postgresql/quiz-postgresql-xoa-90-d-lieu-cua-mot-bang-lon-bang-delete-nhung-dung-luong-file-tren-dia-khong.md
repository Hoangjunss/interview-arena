---
id: quiz-postgresql-xoa-90-d-lieu-cua-mot-bang-lon-bang-delete-nhung-dung-luong-file-tren-dia-khong
position: backend
technology: postgresql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xoá 90% dữ liệu của một bảng lớn bằng DELETE, nhưng dung lượng file trên đĩa không giảm. Vì sao?

## Đáp án trắc nghiệm
- [ ] Postgres giữ lại bản sao của dữ liệu đã xoá để phục vụ point-in-time recovery về sau
- [ ] Cần chạy REINDEX để giải phóng phần dữ liệu đã xoá
- [ ] DELETE chưa được commit nên thay đổi chưa áp dụng xuống đĩa
- [x] VACUUM thu hồi chỗ cho tái sử dụng nội bộ, không trả đĩa cho OS

## Giải thích (VI)
DELETE chỉ đánh dấu row thành dead tuple. VACUUM dọn chúng và giữ chỗ trống lại trong file để tái sử dụng — nó chỉ trả đĩa cho OS khi các page rỗng nằm liền ở cuối file. Chỗ trống rải rác giữa file thì ở nguyên đó: đây gọi là table bloat . Muốn co file thật sự cần VACUUM FULL hoặc pg_repack.

### Giải thích các phương án:
- **Postgres giữ lại bản sao của dữ liệu đã xoá để phục vụ point-in-time recovery về sau** (Sai): PITR dựa trên WAL archive, không phải giữ dead tuples trong bảng.
- **Cần chạy REINDEX để giải phóng phần dữ liệu đã xoá** (Sai): REINDEX chỉ xây lại index, không đụng tới heap của bảng.
- **DELETE chưa được commit nên thay đổi chưa áp dụng xuống đĩa** (Sai): Kể cả sau commit và sau VACUUM, file thường vẫn giữ nguyên kích thước.
- **VACUUM thu hồi chỗ cho tái sử dụng nội bộ, không trả đĩa cho OS** (Đúng): Chỗ trống nằm rải rác trong file nên Postgres chỉ cắt được phần đuôi hoàn toàn rỗng.
