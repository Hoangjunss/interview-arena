---
id: quiz-graphql-phan-quyen-trong-graphql-nen-dat-o-tang-nao
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân quyền trong GraphQL nên đặt ở tầng nào?

## Đáp án trắc nghiệm
- [ ] Trong schema bằng cách ẩn các trường nhạy cảm
- [x] Ở tầng nghiệp vụ phía sau resolver
- [ ] Chỉ ở cổng vào trước khi thực thi truy vấn
- [ ] Ở phía client trước khi gửi truy vấn đi

## Giải thích (VI)
Đặt ở tầng nghiệp vụ phía sau resolver , nơi biết cả người dùng lẫn bản ghi cụ thể. Kiểm tra chỉ ở cổng vào là chưa đủ vì nó không biết người dùng có quyền xem đúng bản ghi đang được yêu cầu hay không.

### Giải thích các phương án:
- **Trong schema bằng cách ẩn các trường nhạy cảm** (Sai): Ẩn khỏi tài liệu không ngăn được việc truy vấn trực tiếp.
- **Ở tầng nghiệp vụ phía sau resolver** (Đúng): Cùng một dữ liệu được truy cập từ nhiều đường nên đặt kiểm tra ở tầng chung mới bao phủ hết.
- **Chỉ ở cổng vào trước khi thực thi truy vấn** (Sai): Cổng vào chỉ biết người dùng là ai chứ không biết họ được xem bản ghi nào.
- **Ở phía client trước khi gửi truy vấn đi** (Sai): Client không đáng tin và có thể gửi truy vấn tuỳ ý.
