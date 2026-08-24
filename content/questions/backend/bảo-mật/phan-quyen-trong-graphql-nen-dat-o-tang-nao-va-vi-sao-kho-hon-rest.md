---
id: phan-quyen-trong-graphql-nen-dat-o-tang-nao-va-vi-sao-kho-hon-rest
position: backend
technology: bảo-mật
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân quyền trong GraphQL nên đặt ở tầng nào và vì sao khó hơn REST?

## Question (EN)
Where should authorisation live in GraphQL and why is it harder than in REST?

## Đáp án chi tiết (VI)
Đặt ở **business logic phía sau resolver**, nơi biết cả người dùng lẫn record cụ thể. Kiểm tra chỉ ở gateway là chưa đủ vì nó chỉ biết người dùng là ai, không biết họ có quyền xem đúng record đang yêu cầu hay không.\
\
```js\
// authorize per field, not per route — one query can touch many types\
const resolvers = {\
  Post: {\
    revenue: (post, _a, ctx) =\u003e (ctx.can('read:revenue', post) ? post.revenue : null),\
  },\
}\
```\
\
Đặc thù làm việc này khó hơn REST: **cùng một kiểu dữ liệu được với tới từ nhiều đường trong đồ thị**. Một bài viết có thể được truy cập trực tiếp, qua tác giả, qua danh sách bình luận, hoặc qua kết quả tìm kiếm. Nếu kiểm tra quyền chỉ nằm ở một đường thì các đường khác bị hở.\
\
Các mức phân quyền: theo thao tác, theo kiểu, theo field, và theo từng record. Mức theo record khó nhất và hay bị bỏ sót nhất.\
\
Lưu ý hiệu năng: kiểm tra quyền theo từng record trong danh sách dài dễ tạo ra chính vấn đề N+1 — nên tải dữ liệu phân quyền theo lô hoặc đẩy điều kiện xuống truy vấn database.

## Detailed Answer (EN)
Put it in the **business layer behind resolvers**, where both the user and the specific record are known. A gateway check alone is insufficient because it knows who the user is but not whether they may see the requested record.\
\
```js\
// authorize per field, not per route — one query can touch many types\
const resolvers = {\
  Post: {\
    revenue: (post, _a, ctx) =\u003e (ctx.can('read:revenue', post) ? post.revenue : null),\
  },\
}\
```\
\
What makes it harder than REST: **the same type is reachable through many graph paths**. A post can be accessed directly, through its author, through a comment list, or through search. If the check lives on only one path, the others are open.\
\
Authorisation levels: per operation, per type, per field, and per record. Per record is hardest and most often missed.\
\
A performance note: per-record checks across a long list easily create the N plus one problem — batch the permission data or push the condition into the database query.
