---
id: uuid-serial-va-identity-column-nen-chon-the-nao
position: backend
technology: schema-\u0026-constraints
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
UUID, serial và identity column nên chọn thế nào?

## Question (EN)
How should you choose between UUID, serial and identity columns?

## Đáp án chi tiết (VI)
Ba cách tạo khóa chính tự sinh:\
\
- **`serial`**: cách viết tắt cũ, ngầm tạo một sequence. Còn chạy được nhưng không còn là cách khuyến nghị.\
- **`GENERATED ... AS IDENTITY`**: cách chuẩn SQL, rõ ràng hơn, để tạo số tự tăng — nên ưu tiên cho ID dạng integer.\
- **UUID**: hợp khi cần sinh ID ở nhiều nơi mà không trùng nhau (phân tán), giấu thứ tự/số lượng, hoặc trộn dữ liệu từ nhiều nguồn.\
\
Đánh đổi: integer nhỏ gọn, index sắp gần nhau nên nhanh, dễ debug bằng mắt; UUID rộng hơn, index to hơn, và UUID ngẫu nhiên ghi rải rác nên kém locality (cân nhắc UUIDv7 nếu cần thứ tự thời gian). Đừng chọn UUID chỉ vì thấy phổ biến nếu hệ thống không thật sự cần ID phân tán.

## Detailed Answer (EN)
Three ways to make an auto-generated primary key:\
\
- **`serial`**: an old shorthand that implicitly creates a sequence. Still works but no longer the recommended way.\
- **`GENERATED ... AS IDENTITY`**: the clearer SQL-standard way to make auto-incrementing numbers — prefer it for integer IDs.\
- **UUID**: fits when IDs must be generated in many places without colliding (distributed), to hide order/count, or to merge data from multiple sources.\
\
Trade-off: integers are compact, their indexes pack closely so they're fast, and they're easy to eyeball when debugging; UUIDs are wider, make bigger indexes, and random UUIDs scatter writes (poor locality — consider UUIDv7 if you need time ordering). Do not pick UUID just because it is popular unless you truly need distributed IDs.
