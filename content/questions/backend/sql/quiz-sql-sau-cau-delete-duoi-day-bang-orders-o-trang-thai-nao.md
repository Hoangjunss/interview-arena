---
id: quiz-sql-sau-cau-delete-duoi-day-bang-orders-o-trang-thai-nao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sau câu DELETE dưới đây, bảng orders ở trạng thái nào?

## Đáp án trắc nghiệm
- [x] DELETE thành công; orders còn nguyên dòng (100, NULL) — ON DELETE SET NULL đặt cột tham chiếu về NULL khi dòng cha bị xóa
- [ ] DELETE thành công và dòng (100, 1) trong orders cũng bị xóa theo
- [ ] DELETE thất bại với lỗi vi phạm khóa ngoại — không thể xóa customer đang được orders tham chiếu
- [ ] DELETE thành công; orders giữ nguyên (100, 1) — bản ghi trở thành mồ côi vì FK chỉ kiểm tra lúc INSERT

## Giải thích (VI)
DELETE thành công và orders còn dòng (100, NULL): ON DELETE SET NULL đặt customer id về NULL khi dòng cha bị xóa — đơn hàng được giữ lại nhưng mất liên kết. So sánh: mặc định (NO ACTION/RESTRICT) chặn không cho xóa cha khi còn con trỏ tới; CASCADE xóa dây chuyền cả dòng con. Chọn hành vi theo nghiệp vụ: dữ liệu con còn giá trị độc lập thì SET NULL, con vô nghĩa khi mất cha thì CASCADE.

### Giải thích các phương án:
- **DELETE thành công; orders còn nguyên dòng (100, NULL) — ON DELETE SET NULL đặt cột tham chiếu về NULL khi dòng cha bị xóa** (Đúng): Đúng: SET NULL giữ lại dòng con nhưng cắt liên kết — customer id được cập nhật thành NULL ngay trong cùng thao tác xóa.
- **DELETE thành công và dòng (100, 1) trong orders cũng bị xóa theo** (Sai): Xóa dây chuyền dòng con là hành vi của ON DELETE CASCADE — SET NULL chỉ đặt cột tham chiếu về NULL, dòng con vẫn tồn tại.
- **DELETE thất bại với lỗi vi phạm khóa ngoại — không thể xóa customer đang được orders tham chiếu** (Sai): Đó là hành vi mặc định (NO ACTION) khi không khai báo gì — nhưng FK này khai báo rõ ON DELETE SET NULL nên dòng cha xóa được.
- **DELETE thành công; orders giữ nguyên (100, 1) — bản ghi trở thành mồ côi vì FK chỉ kiểm tra lúc INSERT** (Sai): FK bảo vệ toàn vẹn ở mọi thao tác, kể cả DELETE/UPDATE trên bảng cha — không tồn tại trạng thái "mồ côi" khi FK còn hiệu lực.
