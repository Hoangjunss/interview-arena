---
id: vi-sao-cursor-pagination-duoc-ua-dung-trong-graphql
position: backend
technology: phân-trang
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao cursor pagination được ưa dùng trong GraphQL?

## Question (EN)
Why is cursor pagination preferred in GraphQL?

## Đáp án chi tiết (VI)
Cursor trỏ vào **một vị trí xác định** trong tập kết quả, nên record mới chèn vào không làm lệch trang như phân trang theo số trang. Đổi lại, nhảy thẳng tới trang thứ mười là việc khó.\
\
```graphql\
query { posts(first: 20, after: \\"Y3Vyc29yOjIw\\") {\
  edges { cursor node { id title } }\
  pageInfo { hasNextPage endCursor }\
} }\
```\
\
Quy ước phổ biến là **Connection pattern**: field trả về một object chứa `edges`, mỗi edge có `cursor` và `node`, cộng `pageInfo` cho biết còn trang sau hay không. Mẫu này trông rườm rà nhưng cho chỗ đặt dữ liệu của quan hệ và một shape chuẩn để client library tự nối thêm trang.\
\
Một lưu ý về hiệu năng: trả về tổng số record thường tốn kém vì phải đếm toàn bộ. Nhiều đội chọn không trả tổng số hoặc trả con số ước lượng, và thiết kế giao diện theo hướng cuộn vô hạn.

## Detailed Answer (EN)
A cursor points at **a definite position** in the result set, so newly inserted records do not shift pages as with offset pagination. The trade-off is that jumping straight to page ten is hard.\
\
```graphql\
query { posts(first: 20, after: \\"Y3Vyc29yOjIw\\") {\
  edges { cursor node { id title } }\
  pageInfo { hasNextPage endCursor }\
} }\
```\
\
The common convention is the connection pattern: the field returns an object with a list of edges, each holding a cursor and a node, plus page information such as whether more pages exist. It looks verbose but provides a home for relationship data and a standard shape for client libraries to append pages.\
\
A performance note: returning a total count is often expensive since it requires counting everything. Many teams omit it or return an estimate and design for infinite scrolling.
