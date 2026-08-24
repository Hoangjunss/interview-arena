---
id: quiz-graphql-khac-biet-cot-loi-gia-graphql-va-rest-la-gi
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt cốt lõi giữa GraphQL và REST là gì?

## Đáp án trắc nghiệm
- [x] Client mô tả chính xác dữ liệu mình cần
- [ ] GraphQL thay thế hoàn toàn nhu cầu có cơ sở dữ liệu
- [ ] GraphQL không dùng HTTP để truyền dữ liệu
- [ ] GraphQL luôn nhanh hơn REST trong mọi trường hợp

## Giải thích (VI)
Client mô tả chính xác trường mình cần và server trả về đúng hình dạng đó. REST thì mỗi endpoint có hình dạng phản hồi cố định, nên client hoặc nhận thừa dữ liệu hoặc phải gọi nhiều lần.

### Giải thích các phương án:
- **Client mô tả chính xác dữ liệu mình cần** (Đúng): Hình dạng phản hồi do truy vấn quyết định, thay vì do endpoint quyết định như REST.
- **GraphQL thay thế hoàn toàn nhu cầu có cơ sở dữ liệu** (Sai): Nó chỉ là tầng API, dữ liệu vẫn nằm ở nguồn phía sau.
- **GraphQL không dùng HTTP để truyền dữ liệu** (Sai): Phần lớn triển khai chạy trên HTTP với một endpoint duy nhất.
- **GraphQL luôn nhanh hơn REST trong mọi trường hợp** (Sai): Tốc độ phụ thuộc cách cài đặt và truy vấn, không phải bản chất giao thức.
