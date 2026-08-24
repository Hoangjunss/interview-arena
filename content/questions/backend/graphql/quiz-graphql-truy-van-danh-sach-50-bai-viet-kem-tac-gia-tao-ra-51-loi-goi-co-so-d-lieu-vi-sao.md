---
id: quiz-graphql-truy-van-danh-sach-50-bai-viet-kem-tac-gia-tao-ra-51-loi-goi-co-so-d-lieu-vi-sao
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn danh sách 50 bài viết kèm tác giả tạo ra 51 lời gọi cơ sở dữ liệu. Vì sao?

## Đáp án trắc nghiệm
- [ ] Truy vấn thiếu tham số giới hạn số bản ghi
- [ ] GraphQL luôn gọi cơ sở dữ liệu một lần cho mỗi trường
- [x] Resolver tác giả chạy riêng cho từng bài
- [ ] Server chưa bật cache cho phản hồi

## Giải thích (VI)
Đây là vấn đề N cộng một: một lời gọi lấy danh sách bài viết, rồi resolver của trường tác giả chạy riêng cho từng bài . Cách xử lý chuẩn là gom các lời gọi trong cùng một vòng thực thi thành một truy vấn theo lô.

### Giải thích các phương án:
- **Truy vấn thiếu tham số giới hạn số bản ghi** (Sai): Giới hạn số bản ghi không đổi cách các trường con lấy dữ liệu.
- **GraphQL luôn gọi cơ sở dữ liệu một lần cho mỗi trường** (Sai): Chỉ các trường có resolver tự lấy dữ liệu mới sinh lời gọi.
- **Resolver tác giả chạy riêng cho từng bài** (Đúng): Một lời gọi lấy danh sách, rồi mỗi phần tử lại kích hoạt một lời gọi lấy tác giả của nó.
- **Server chưa bật cache cho phản hồi** (Sai): Bộ nhớ đệm phản hồi không giải quyết được vấn đề trong một truy vấn.
