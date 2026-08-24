---
id: quiz-graphql-schema-trong-graphql-dong-vai-tro-gi
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Schema trong GraphQL đóng vai trò gì?

## Đáp án trắc nghiệm
- [ ] Là nơi khai báo cấu trúc bảng của cơ sở dữ liệu
- [ ] Là tệp cấu hình quyết định cổng và địa chỉ server
- [ ] Là danh sách quyền của từng người dùng trong hệ thống
- [x] Là hợp đồng mô tả mọi kiểu và trường truy vấn được

## Giải thích (VI)
Schema là hợp đồng mô tả mọi kiểu, trường và tham số mà client truy vấn được. Nhờ nó, truy vấn sai tên trường hay sai kiểu bị từ chối trước khi chạy, và công cụ sinh mã cùng gợi ý trong trình soạn thảo đều dựa vào nó.

### Giải thích các phương án:
- **Là nơi khai báo cấu trúc bảng của cơ sở dữ liệu** (Sai): Schema mô tả API chứ không mô tả lưu trữ, và hai thứ này thường khác nhau.
- **Là tệp cấu hình quyết định cổng và địa chỉ server** (Sai): Cấu hình vận hành nằm ở nơi khác.
- **Là danh sách quyền của từng người dùng trong hệ thống** (Sai): Phân quyền được cài đặt trong resolver hoặc tầng riêng.
- **Là hợp đồng mô tả mọi kiểu và trường truy vấn được** (Đúng): Cả client lẫn máy chủ dựa vào nó nên truy vấn sai trường bị bắt trước khi thực thi.
