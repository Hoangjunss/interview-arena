---
id: string-pool-trong-java-la-gi-abc-va-new-string-abc-khac-gi-nhau
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
String pool trong Java là gì? \\"abc\\" và new String(\\"abc\\") khác gì nhau?

## Question (EN)
What is the String pool in Java? How do \\"abc\\" and new String(\\"abc\\") differ?

## Đáp án chi tiết (VI)
**String pool** (string constant pool) là vùng cache trong heap chứa các String **literal** — các literal giống nhau **dùng chung 1 object**.\
\
- `String a = \\"hello\\"` → JVM tìm trong pool: có rồi thì trả reference cũ → `\\"hello\\" == \\"hello\\"` cho `true` (cùng object).\
- `new String(\\"hello\\")` → **luôn tạo object mới ngoài pool** → so `==` với literal cho `false`, dù `equals()` vẫn `true`.\
- `str.intern()` → trả về bản trong pool (đưa vào pool nếu chưa có).\
\
**Vì sao tồn tại được:** String **immutable** (xem câu String immutable) — nhiều nơi chia sẻ cùng 1 object mà không sợ bên nào sửa → tiết kiệm bộ nhớ đáng kể vì literal lặp lại rất nhiều.\
\
**Bài học rút ra:**\
1. So sánh String luôn dùng `equals()`, không dùng `==` — `==` chỉ đúng tình cờ nhờ pool.\
2. Không viết `new String(\\"...\\")` — vừa thừa object vừa vô hiệu hoá pool.

## Detailed Answer (EN)
The **String pool** (string constant pool) is a cache area in the heap holding String **literals** — identical literals **share one object**.\
\
- `String a = \\"hello\\"` → the JVM checks the pool: if present, returns the existing reference → `\\"hello\\" == \\"hello\\"` is `true` (same object).\
- `new String(\\"hello\\")` → **always creates a new object outside the pool** → `==` against a literal is `false`, though `equals()` is still `true`.\
- `str.intern()` → returns the pooled copy (adding it to the pool if absent).\
\
**Why it can exist:** String is **immutable** (see the String immutability item) — many places can share one object with no risk of anyone mutating it → significant memory savings since literals repeat a lot.\
\
**Takeaways:**\
1. Always compare Strings with `equals()`, never `==` — `==` is only accidentally right thanks to the pool.\
2. Never write `new String(\\"...\\")` — a wasted object that also bypasses the pool.
