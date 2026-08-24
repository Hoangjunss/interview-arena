---
id: graphql-xu-ly-viec-thay-doi-api-the-nao-khi-khong-danh-so-phien-ban
position: backend
technology: tiến-hoá-schema
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
GraphQL xử lý việc thay đổi API thế nào khi không đánh số phiên bản?

## Question (EN)
How does GraphQL handle API change without versioning?

## Đáp án chi tiết (VI)
GraphQL tiến hoá bằng cách **thêm field mới và đánh dấu field cũ là không dùng nữa**. Client cũ vẫn chạy vì field cũ còn đó, và field cũ chỉ bị gỡ khi không còn ai truy vấn tới.\
\
```graphql\
type User {\
  firstName: String!\
  fullName: String! @deprecated(reason: \\"Use firstName/lastName. Removed 2026-12-01\\")\
}\
```\
\
Điều kiện để cách này hoạt động là phải **biết ai đang dùng field nào**. Không có số liệu sử dụng theo field thì không ai dám gỡ, và schema phình lên theo thời gian.\
\
Các breaking change cần chặn trong CI: gỡ field hoặc kiểu; đổi kiểu trả về; thêm tham số bắt buộc; và đổi một field cho phép null thành không null theo chiều sai.\
\
Với ứng dụng di động, thời gian sống của một phiên bản client tính bằng năm vì luôn có người không cập nhật. Lịch gỡ field nên tính theo số liệu sử dụng thật chứ không theo mốc thời gian định sẵn.

## Detailed Answer (EN)
GraphQL evolves by **adding new fields and deprecating old ones**. Old clients keep working because the old field remains, and it is removed only when nobody queries it.\
\
```graphql\
type User {\
  firstName: String!\
  fullName: String! @deprecated(reason: \\"Use firstName/lastName. Removed 2026-12-01\\")\
}\
```\
\
The condition for this to work is knowing **who uses which field**. Without per-field usage data nobody dares remove anything and the schema keeps growing.\
\
Breaking changes to block in CI: removing fields or types; changing return types; adding required arguments; and turning a nullable field non-null in the wrong direction.\
\
For mobile clients, a version can live for years because some users never update. Removal schedules should follow real usage data rather than a fixed calendar date.
