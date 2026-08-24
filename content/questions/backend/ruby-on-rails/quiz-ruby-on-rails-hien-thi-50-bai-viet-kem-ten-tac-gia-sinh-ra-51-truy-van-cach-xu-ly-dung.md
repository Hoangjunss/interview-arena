---
id: quiz-ruby-on-rails-hien-thi-50-bai-viet-kem-ten-tac-gia-sinh-ra-51-truy-van-cach-xu-ly-dung
position: backend
technology: ruby-on-rails
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hiển thị 50 bài viết kèm tên tác giả sinh ra 51 truy vấn. Cách xử lý đúng?

## Đáp án trắc nghiệm
- [ ] Giảm số bài viết hiển thị trên mỗi trang
- [ ] Thêm chỉ mục cho cột khoá ngoại của bảng bài viết
- [ ] Cache kết quả hiển thị của từng bài viết
- [x] Nạp trước quan hệ tác giả cùng lúc với danh sách

## Giải thích (VI)
Nạp trước quan hệ khi truy vấn danh sách. Rails sẽ chạy một truy vấn cho bài viết và một truy vấn gom tất cả tác giả theo danh sách khoá , thay vì một truy vấn cho mỗi bài.

### Giải thích các phương án:
- **Giảm số bài viết hiển thị trên mỗi trang** (Sai): Giảm quy mô chứ không sửa nguyên nhân.
- **Thêm chỉ mục cho cột khoá ngoại của bảng bài viết** (Sai): Chỉ mục làm mỗi truy vấn nhanh hơn nhưng vẫn có 51 truy vấn.
- **Cache kết quả hiển thị của từng bài viết** (Sai): Che triệu chứng, lần đầu vẫn tốn 51 truy vấn và bộ đệm phải được làm mới.
- **Nạp trước quan hệ tác giả cùng lúc với danh sách** (Đúng): Nạp trước gom các bản ghi liên quan vào một truy vấn theo danh sách khoá.
