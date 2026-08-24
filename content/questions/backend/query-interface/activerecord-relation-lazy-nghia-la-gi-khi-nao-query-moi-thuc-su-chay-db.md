---
id: activerecord-relation-lazy-nghia-la-gi-khi-nao-query-moi-thuc-su-chay-db
position: backend
technology: query-interface
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`ActiveRecord::Relation` lazy nghĩa là gì? Khi nào query mới thực sự chạy DB?

## Question (EN)
What does it mean that `ActiveRecord::Relation` is lazy? When does the query actually hit the DB?

## Đáp án chi tiết (VI)
Relation là một **mô tả query chưa chạy**. Rails chỉ gửi SQL xuống DB khi bạn yêu cầu dữ liệu thật — gọi là *loading*.\
\
```ruby\
scope = User.where(active: true).order(:created_at)  # no SQL yet\
scope = scope.limit(10)                              # still no SQL, just chaining\
scope.to_a                                           # SQL runs here\
```\
\
**Kích hoạt query:** `to_a`, `each`, `first`, `last`, `find`, `count`, `sum`, `pluck`, `any?`, hoặc khi render trong view. **Không kích hoạt:** `where`, `order`, `limit`, `joins`, `includes`, `select` — chúng chỉ trả về Relation mới.\
\
Hai điểm hay bị hỏi tiếp:\
- Relation **cache kết quả sau lần load đầu**; gọi `each` lần hai không chạy lại SQL. Muốn ép chạy lại thì dùng `reload`.\
- Mỗi lần chain là một Relation **mới** (bất biến), nên `scope.where(...)` không sửa `scope` gốc.\
\
Lazy chính là lý do có thể tách điều kiện ra nhiều tầng (scope, controller, service) mà cuối cùng vẫn chỉ có một câu SQL.

## Detailed Answer (EN)
$82
