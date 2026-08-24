---
id: quiz-graphql-dau-cham-than-sau-ten-kieu-trong-schema-graphql-co-nghia-gi
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dấu chấm than sau tên kiểu trong schema GraphQL có nghĩa gì?

## Đáp án trắc nghiệm
- [x] Trường đó không bao giờ trả về null
- [ ] Trường đó chỉ dành cho người dùng đã đăng nhập
- [ ] Trường đó được đánh chỉ mục trong cơ sở dữ liệu
- [ ] Trường đó là tham số bắt buộc khi truy vấn

## Giải thích (VI)
Dấu chấm than nghĩa là trường không bao giờ null . Đây là cam kết mạnh: nếu resolver trả về null cho trường đó, lỗi sẽ lan lên trường cha gần nhất cho phép null, và có thể xoá cả một nhánh dữ liệu.

### Giải thích các phương án:
- **Trường đó không bao giờ trả về null** (Đúng): Đây là cam kết của máy chủ, và vi phạm nó sẽ lan lỗi lên trường cha.
- **Trường đó chỉ dành cho người dùng đã đăng nhập** (Sai): Phân quyền không được biểu diễn bằng ký hiệu này.
- **Trường đó được đánh chỉ mục trong cơ sở dữ liệu** (Sai): Schema không nói gì về lưu trữ.
- **Trường đó là tham số bắt buộc khi truy vấn** (Sai): Tính bắt buộc của tham số cũng dùng ký hiệu này nhưng ở vị trí đối số, không phải kiểu trả về.
