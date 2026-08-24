---
id: vi-sao-khong-nen-thiet-ke-schema-phan-chieu-dung-cau-truc-bang-database
position: backend
technology: thiết-kế
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao không nên thiết kế schema phản chiếu đúng cấu trúc bảng database?

## Question (EN)
Why should a schema not mirror database tables?

## Đáp án chi tiết (VI)
Vì client sẽ **bị buộc theo cấu trúc lưu trữ**: tách bảng, đổi khoá hay chuyển một phần `data` sang dịch vụ khác đều trở thành breaking change. Schema nên mô tả nghiệp vụ chứ không mô tả nơi lưu dữ liệu.\
\
```graphql\
# leaks storage — renaming a column breaks every client\
type Post { user_id: Int!, created_at: String!, status_code: Int! }\
\
# API-shaped — storage can change underneath\
type Post { author: User!, createdAt: DateTime!, status: PostStatus! }\
```\
\
Cách nghĩ đúng là bắt đầu từ nhu cầu client: màn hình cần hiển thị gì, đi từ đó ra kiểu và field. Một kiểu có thể gộp dữ liệu từ ba bảng và một dịch vụ bên ngoài mà client không cần biết.\
\
Biểu hiện thường gặp của việc sao chép bảng: schema đầy các field khoá ngoại dạng số và các bảng nối thay vì quan hệ có nghĩa — client phải tự nối dữ liệu và mất luôn lợi ích chính của GraphQL.\
\
Một cân bằng cần nói rõ: bắt đầu từ nhu cầu client không có nghĩa là tạo một field riêng cho từng màn hình, vì như vậy schema sẽ phình theo số màn hình.

## Detailed Answer (EN)
Because clients become **coupled to the storage layout**: splitting tables, changing keys or moving data to another service all become breaking changes. The schema should describe the business, not where data is stored.\
\
```graphql\
# leaks storage — renaming a column breaks every client\
type Post { user_id: Int!, created_at: String!, status_code: Int! }\
\
# API-shaped — storage can change underneath\
type Post { author: User!, createdAt: DateTime!, status: PostStatus! }\
```\
\
The right approach starts from client needs: what a screen must display, deriving types and fields from that. One type can combine three tables and an external service without the client knowing.\
\
A common symptom of table mirroring: a schema full of numeric foreign key fields and join tables instead of meaningful relationships — clients then join data themselves and lose the main benefit of GraphQL.\
\
A balance worth stating: starting from client needs does not mean one field per screen, which would make the schema grow with screen count.
