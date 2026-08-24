---
id: dung-object-mutable-lam-key-cua-hashmap-thi-chuyen-gi-xay-ra
position: backend
technology: hashmap
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng object mutable làm key của HashMap thì chuyện gì xảy ra?

## Question (EN)
What happens if you use a mutable object as a HashMap key?

## Đáp án chi tiết (VI)
Entry sẽ **không tìm lại được** dù vẫn nằm trong map. HashMap tính bucket một lần lúc `put`; nếu sau đó bạn đổi field tham gia `hashCode()`, giá trị hash mới trỏ sang bucket khác nên `get()` tìm nhầm chỗ.\
\
```java\
List\u003cString\u003e ids = new ArrayList\u003c\u003e();\
Map\u003cList\u003cString\u003e, String\u003e map = new HashMap\u003c\u003e();\
map.put(ids, \\"value\\");\
\
ids.add(\\"x\\");                              // hashCode của key vừa đổi\
System.out.println(map.get(ids));          // null\
System.out.println(map.size());            // 1  - entry vẫn còn đó\
```\
\
Hệ quả:\
- `get`, `containsKey`, `remove` đều trả sai → entry chiếm bộ nhớ vĩnh viễn nhưng không xóa được (rò rỉ bộ nhớ ở mức logic).\
- Duyệt `entrySet()` vẫn thấy entry đó, gây khác biệt khó hiểu giữa \\"tra cứu\\" và \\"duyệt\\".\
- `HashSet` cũng vướng đúng vấn đề này vì nó dựa trên HashMap.\
\
Javadoc của `Map` nói rõ phải rất cẩn trọng khi dùng object mutable làm key. **Cách làm đúng:** dùng key bất biến (`String`, `Long`, `record` toàn field final) hoặc lấy một field không đổi (thường là `id`) làm key.

## Detailed Answer (EN)
$82
