---
id: resolver-la-gi-va-nhan-vao-nhung-tham-so-nao
position: backend
technology: resolver
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Resolver là gì và nhận vào những tham số nào?

## Question (EN)
What is a resolver and what arguments does it receive?

## Đáp án chi tiết (VI)
Resolver là hàm **trả về giá trị cho một field**. Server đi theo shape truy vấn và gọi resolver tương ứng cho từng field, nên một truy vấn lồng nhiều tầng kích hoạt cả một cây lời gọi.\
\
```js\
const resolvers = {\
  Post: {\
    // parent = the Post object, args = field args, ctx = per-request, info = query AST\
    author: (parent, args, ctx, info) =\u003e ctx.loaders.user.load(parent.authorId),\
  },\
}\
```\
\
Mỗi resolver nhận bốn thứ: giá trị trả về của field cha; các tham số của field; ngữ cảnh dùng chung cho cả yêu cầu; và thông tin về truy vấn đang chạy.\
\
Ngữ cảnh là chỗ đặt các thứ theo từng yêu cầu như phiên đăng nhập, DataLoader và cache ngắn hạn. Đặt chúng ở phạm vi toàn cục là **lỗi bảo mật nghiêm trọng** vì dữ liệu người dùng này có thể rò sang yêu cầu của người khác.\
\
Một chi tiết về hiệu năng: nếu không viết resolver cho một field, server dùng resolver mặc định đọc thuộc tính cùng tên từ object cha — đây là lý do một truy vấn trông đơn giản vẫn sinh rất nhiều lời gọi dữ liệu.

## Detailed Answer (EN)
A resolver is a function that **returns the value for one field**. The server walks the query shape and calls the matching resolver per field, so a deeply nested query triggers a whole tree of calls.\
\
```js\
const resolvers = {\
  Post: {\
    // parent = the Post object, args = field args, ctx = per-request, info = query AST\
    author: (parent, args, ctx, info) =\u003e ctx.loaders.user.load(parent.authorId),\
  },\
}\
```\
\
Each resolver receives four things: the parent field value; the field arguments; a context shared across the request; and information about the running query.\
\
Context is where per-request items belong: the session, batch loaders and short-lived caches. Putting them in global scope is a **serious security bug** because one user data can leak into another request.\
\
A performance detail: without an explicit resolver, the server uses a default one reading the same-named property from the parent — which is why a simple-looking query can still produce many data calls.
