---
id: quiz-sql-nhng-phat-bieu-nao-sau-day-dung-ve-primary-key-unique-va-foreign-key-chon-nhieu
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Những phát biểu nào sau đây đúng về primary key, unique và foreign key? (chọn nhiều đáp án)

## Đáp án trắc nghiệm
- [x] Primary key định danh duy nhất mỗi dòng, không cho phép NULL, và mỗi bảng chỉ có một primary key
- [ ] Ràng buộc UNIQUE cũng tự động cấm NULL giống như primary key
- [ ] Nên bỏ foreign key trong thiết kế để code linh hoạt hơn, vì tầng ứng dụng đã kiểm tra dữ liệu rồi

## Giải thích (VI)
Ba vai trò tách bạch: primary key là danh tính của dòng — duy nhất, NOT NULL, một bảng chỉ một PK. UNIQUE là quy tắc nghiệp vụ chống trùng (email, mã số...) — một bảng có nhiều UNIQUE được, và UNIQUE không tự cấm NULL. Foreign key là toàn vẹn tham chiếu — giá trị bảng con phải tồn tại ở bảng cha. Không nên bỏ FK chỉ để code linh hoạt hơn khi dữ liệu cần nhất quán.

### Giải thích các phương án:
- **Primary key định danh duy nhất mỗi dòng, không cho phép NULL, và mỗi bảng chỉ có một primary key** (Đúng): Đúng — PK là danh tính của dòng: duy nhất, NOT NULL, và duy nhất một PK mỗi bảng (dù PK có thể gồm nhiều cột).
- **Ràng buộc UNIQUE cũng tự động cấm NULL giống như primary key** (Sai): Sai — UNIQUE không kèm NOT NULL; trong PostgreSQL cột UNIQUE mặc định còn cho phép nhiều dòng cùng NULL vì hai NULL không được coi là bằng nhau.
- **Nên bỏ foreign key trong thiết kế để code linh hoạt hơn, vì tầng ứng dụng đã kiểm tra dữ liệu rồi** (Sai): Sai — kiểm tra ở tầng app không chặn được race condition, script chạy tay hay dịch vụ khác ghi thẳng vào DB; FK là tuyến phòng thủ ở nơi dữ liệu sống.
