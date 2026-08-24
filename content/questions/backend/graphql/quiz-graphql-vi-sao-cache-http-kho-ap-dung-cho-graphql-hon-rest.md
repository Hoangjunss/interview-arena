---
id: quiz-graphql-vi-sao-cache-http-kho-ap-dung-cho-graphql-hon-rest
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao cache HTTP khó áp dụng cho GraphQL hơn REST?

## Đáp án trắc nghiệm
- [ ] Phản hồi GraphQL luôn quá lớn để cache
- [ ] GraphQL không cho phép đặt tiêu đề cache
- [x] Mọi truy vấn đi qua một địa chỉ duy nhất
- [ ] Dữ liệu GraphQL luôn thay đổi theo từng người dùng

## Giải thích (VI)
Vì mọi truy vấn đi qua một địa chỉ duy nhất và thường dùng phương thức POST, nên cache trung gian không phân biệt được. Bù lại, GraphQL đẩy việc cache về phía client với cache chuẩn hoá theo đối tượng.

### Giải thích các phương án:
- **Phản hồi GraphQL luôn quá lớn để cache** (Sai): Kích thước phụ thuộc truy vấn, không phải bản chất giao thức.
- **GraphQL không cho phép đặt tiêu đề cache** (Sai): Tiêu đề HTTP vẫn đặt được bình thường.
- **Mọi truy vấn đi qua một địa chỉ duy nhất** (Đúng): Bộ nhớ đệm trung gian dựa vào địa chỉ và phương thức nên không phân biệt được các truy vấn khác nhau.
- **Dữ liệu GraphQL luôn thay đổi theo từng người dùng** (Sai): Nhiều truy vấn trả về dữ liệu công khai giống nhau cho mọi người.
