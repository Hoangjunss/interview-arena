---
id: fragment-dung-de-lam-gi-trong-ung-dung-thuc-te
position: backend
technology: truy-vấn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Fragment dùng để làm gì trong ứng dụng thực tế?

## Question (EN)
What are fragments used for in real applications?

## Đáp án chi tiết (VI)
Fragment gom một **nhóm field dùng lại được**. Trong thực tế, nó cho phép mỗi thành phần giao diện khai báo dữ liệu nó cần, rồi màn hình ghép các fragment lại thành một truy vấn duy nhất.\
\
```graphql\
fragment PostCard on Post { id title author { name } }\
\
query Feed {\
  feed { ...PostCard }\
  search(term: \\"graphql\\") {\
    ... on Post { ...PostCard }   # inline fragment: only for the matching type\
  }\
}\
```\
\
Đây là pattern quan trọng khi ứng dụng lớn dần: sửa một thành phần thì truy vấn tự cập nhật theo, không ai phải nhớ sửa ở màn hình cha.\
\
Dạng thứ hai là fragment theo kiểu, dùng khi field trả về một giao diện hoặc union — client khai báo field riêng cho từng kiểu con và server chỉ trả phần khớp.\
\
Lưu ý: fragment không giảm chi phí ở server. Ghép mười fragment vẫn tạo ra một truy vấn lớn, nên vẫn cần giới hạn Depth và Complexity.

## Detailed Answer (EN)
A fragment groups a **reusable set of fields**. In practice it lets each UI component declare the data it needs, with the screen composing fragments into one query.\
\
```graphql\
fragment PostCard on Post { id title author { name } }\
\
query Feed {\
  feed { ...PostCard }\
  search(term: \\"graphql\\") {\
    ... on Post { ...PostCard }   # inline fragment: only for the matching type\
  }\
}\
```\
\
This matters as an app grows: editing a component updates the query automatically and nobody must remember to change the parent screen.\
\
The second form is the inline fragment on a type, used when a field returns an interface or union — the client declares fields per concrete type and the server returns only the matching part.\
\
Note that fragments do not reduce server cost. Composing ten fragments still yields one large query, so depth and complexity limits remain necessary.
