---
id: khi-nao-nen-gui-truy-van-bang-get-thay-vi-post
position: backend
technology: vận-hành
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên gửi truy vấn bằng GET thay vì POST?

## Question (EN)
When should a query be sent with GET rather than POST?

## Đáp án chi tiết (VI)
Dùng GET khi kết hợp với **persisted query**: địa chỉ trở nên duy nhất theo hash và biến, nên tầng phân phối nội dung và cache trung gian đệm được. Với truy vấn dài viết thẳng thì POST an toàn hơn vì không vướng giới hạn độ dài địa chỉ.\
\
```bash\
# GET is cacheable by CDN/browser, but the URL length caps the document\
GET /graphql?query=%7Bme%7Bname%7D%7D\u0026variables=%7B%7D\
# in practice: use it together with persisted queries (send the hash, not the text)\
```\
\
Đây là một trong số ít cách lấy lại khả năng cache ở tầng mạng cho GraphQL. Kết hợp thêm tiêu đề thời hạn theo từng truy vấn thì dữ liệu công khai như danh mục sản phẩm được phục vụ ngay từ tầng biên.\
\
Điều kiện an toàn: chỉ áp cho truy vấn đọc; tách rõ truy vấn công khai và truy vấn cần đăng nhập vì đệm dữ liệu riêng tư ở tầng chung là rò rỉ; và đưa các thông tin ảnh hưởng kết quả như ngôn ngữ vào khoá cache.

## Detailed Answer (EN)
Use GET together with **persisted queries**: the URL becomes unique per hash and variables, so CDNs and intermediate caches can cache it. For long inline queries, POST is safer because URL length limits do not apply.\
\
```bash\
# GET is cacheable by CDN/browser, but the URL length caps the document\
GET /graphql?query=%7Bme%7Bname%7D%7D\u0026variables=%7B%7D\
# in practice: use it together with persisted queries (send the hash, not the text)\
```\
\
This is one of the few ways to regain network-level caching for GraphQL. Combined with per-query expiry headers, public data such as a product catalogue can be served straight from the edge.\
\
Safety conditions: reads only; a clear split between public and authenticated queries since caching private data at a shared layer is a leak; and result-affecting inputs such as language included in the cache key.
