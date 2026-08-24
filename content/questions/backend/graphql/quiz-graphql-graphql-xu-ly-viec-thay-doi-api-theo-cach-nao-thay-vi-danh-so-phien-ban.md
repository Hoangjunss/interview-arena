---
id: quiz-graphql-graphql-xu-ly-viec-thay-doi-api-theo-cach-nao-thay-vi-danh-so-phien-ban
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
GraphQL xử lý việc thay đổi API theo cách nào thay vì đánh số phiên bản?

## Đáp án trắc nghiệm
- [ ] Yêu cầu mọi client cập nhật cùng lúc khi schema đổi
- [ ] Giữ nhiều bản schema song song trên cùng server
- [ ] Tạo endpoint mới cho mỗi phiên bản schema
- [x] Thêm trường mới, đánh dấu trường cũ bỏ dần

## Giải thích (VI)
GraphQL tiến hoá bằng cách thêm trường mới và đánh dấu trường cũ là không dùng nữa , thay vì đánh số phiên bản. Client cũ vẫn chạy vì trường cũ còn đó, và trường cũ chỉ bị gỡ khi không còn ai truy vấn tới.

### Giải thích các phương án:
- **Yêu cầu mọi client cập nhật cùng lúc khi schema đổi** (Sai): Không khả thi với ứng dụng di động đã phát hành.
- **Giữ nhiều bản schema song song trên cùng server** (Sai): Không có cơ chế chuẩn nào cho việc này.
- **Tạo endpoint mới cho mỗi phiên bản schema** (Sai): Cách này quay lại đúng vấn đề mà GraphQL muốn tránh.
- **Thêm trường mới, đánh dấu trường cũ bỏ dần** (Đúng): Client cũ vẫn chạy vì trường cũ còn đó, còn client mới chuyển dần sang trường mới.
