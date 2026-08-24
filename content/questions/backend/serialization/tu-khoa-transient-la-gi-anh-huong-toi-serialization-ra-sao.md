---
id: tu-khoa-transient-la-gi-anh-huong-toi-serialization-ra-sao
position: backend
technology: serialization
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Từ khóa `transient` là gì, ảnh hưởng tới serialization ra sao?

## Question (EN)
What is the `transient` keyword and how does it affect serialization?

## Đáp án chi tiết (VI)
`transient` đánh dấu một field **không tham gia serialization**. Khi object được `ObjectOutputStream` ghi ra byte, field `transient` bị **bỏ qua**; lúc deserialize nó nhận **giá trị mặc định** (`0`, `false`, `null`).\
\
```java\
class Session implements Serializable {\
  String user;\
  transient String password;  // không ghi ra stream\
  transient Connection conn;   // không serialize được → phải transient\
}\
```\
\
Dùng khi field: (1) **nhạy cảm** (password, token) không nên nằm trong file/luồng; (2) **không serialize được** (socket, thread, connection); (3) **suy ra được** từ field khác (cache, giá trị tính lại).\
\
Lưu ý: `static` field cũng không được serialize (thuộc class chứ không thuộc instance). Nếu cần khôi phục field `transient` theo cách riêng → cài `readObject()`/`writeObject()` hoặc dùng `Externalizable`.

## Detailed Answer (EN)
`transient` marks a field as **excluded from serialization**. When an object is written to bytes by `ObjectOutputStream`, `transient` fields are **skipped**; on deserialization they get their **default value** (`0`, `false`, `null`).\
\
```java\
class Session implements Serializable {\
  String user;\
  transient String password;  // not written to the stream\
  transient Connection conn;   // not serializable → must be transient\
}\
```\
\
Use it when a field is: (1) **sensitive** (password, token) and should not sit in a file/stream; (2) **not serializable** (socket, thread, connection); (3) **derivable** from other fields (a cache or recomputed value).\
\
Note: `static` fields are also not serialized (they belong to the class, not the instance). To restore a `transient` field your own way, implement `readObject()`/`writeObject()` or use `Externalizable`.
