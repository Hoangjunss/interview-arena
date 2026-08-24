---
id: mot-downstream-service-chet-lam-toan-bo-phan-hoi-thanh-null-vi-sao-va-xu-ly-ra-s
position: backend
technology: xử-lý-lỗi
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một downstream service chết làm toàn bộ phản hồi thành null. Vì sao và xử lý ra sao?

## Question (EN)
A downstream failure makes the whole response null. Why, and how is it handled?

## Đáp án chi tiết (VI)
Vì field lỗi được khai báo **không cho phép null**: khi resolver không trả về được giá trị, lỗi lan lên field cha gần nhất cho phép null. Nếu cả chuỗi đều không cho phép null thì lan tới tận gốc.\
\
```graphql\
type Post  { author: User! }   # non-null: an author error nulls the whole Post\
type Post2 { author: User }    # nullable: only this field becomes null\
```\
\
Đây là lý do chiến lược để phần lớn field cho phép null được nhiều đội lớn áp dụng. Mất một mẩu dữ liệu là chấp nhận được; mất cả màn hình vì một downstream service chập chờn thì không.\
\
Các field nên giữ không null: `id` và các field tính từ chính record. Các field lấy từ dịch vụ khác, từ cache bên ngoài, hoặc có thể chậm thì nên cho phép null.\
\
Việc nên làm song song: khi một field trả về null vì lỗi, **ghi lỗi đó vào mảng `errors` kèm đường dẫn tới field**, để client phân biệt được giữa không có dữ liệu và lấy dữ liệu thất bại — hai trường hợp cần hiển thị khác nhau.

## Detailed Answer (EN)
Because the failing field is declared **non-null**: when the resolver cannot produce a value, the error propagates to the nearest nullable parent. If the whole chain is non-null it reaches the root.\
\
```graphql\
type Post  { author: User! }   # non-null: an author error nulls the whole Post\
type Post2 { author: User }    # nullable: only this field becomes null\
```\
\
This is why many large teams adopt a mostly nullable strategy. Losing one piece of data is acceptable; losing a whole screen because a downstream service is flaky is not.\
\
Fields worth keeping non-null: identifiers and values derived from the record itself. Fields from other services, external caches, or that can be slow should be nullable.\
\
Something to do alongside: when a field returns null due to failure, **record the error with the path to that field** so clients can distinguish no data from failed retrieval — two cases needing different UI treatment.
