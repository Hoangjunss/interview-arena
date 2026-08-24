---
id: khi-nao-mot-object-du-dieu-kien-bi-gc-thu-hoi-goi-system-gc-co-ep-gc-chay-ngay-k
position: backend
technology: garbage-collection
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào một object đủ điều kiện bị GC thu hồi? Gọi `System.gc()` có ép GC chạy ngay không?

## Question (EN)
When does an object become eligible for GC? Does calling `System.gc()` force a collection?

## Đáp án chi tiết (VI)
Object đủ điều kiện thu hồi khi **không còn đường đi tới nó từ GC root nào**. GC root gồm: biến local trên stack của thread đang sống, static field, tham chiếu từ JNI, và chính các thread đang chạy.\
\
Đây là **reachability**, không phải đếm số tham chiếu. Nên hai object trỏ vòng vào nhau mà không ai từ ngoài trỏ tới thì **vẫn bị thu hồi**:\
\
```java\
Node a = new Node(), b = new Node();\
a.next = b;\
b.next = a;      // tham chiếu vòng\
a = null;\
b = null;        // cả cụm không còn tới được từ root -\u003e thu hồi được\
```\
\
Gán `null` hay biến ra khỏi scope chỉ **cắt một tham chiếu**; nếu còn chỗ khác giữ (một `static Map`, một listener chưa gỡ) thì object vẫn sống — đó là dạng memory leak phổ biến nhất trong Java.\
\
**`System.gc()` chỉ là gợi ý.** Javadoc ghi rõ JVM được phép bỏ qua, và nhiều hệ thống production còn chạy với `-XX:+DisableExplicitGC` để biến nó thành no-op. Không có API nào ép GC chạy ngay; code không nên phụ thuộc vào thời điểm GC diễn ra.

## Detailed Answer (EN)
An object becomes eligible when **no path reaches it from any GC root**. GC roots include: local variables on live thread stacks, static fields, JNI references, and the running threads themselves.\
\
This is **reachability**, not reference counting. So two objects referencing each other with nothing pointing in from outside are **still collected**:\
\
```java\
Node a = new Node(), b = new Node();\
a.next = b;\
b.next = a;      // reference cycle\
a = null;\
b = null;        // the whole cluster is unreachable from roots -\u003e collectable\
```\
\
Assigning `null` or leaving scope only **cuts one reference**; if something else still holds it (a `static Map`, an unremoved listener), the object stays alive — the most common shape of a Java memory leak.\
\
**`System.gc()` is only a hint.** The Javadoc states the JVM may ignore it, and many production systems run with `-XX:+DisableExplicitGC`, turning it into a no-op. No API forces an immediate collection; code must never depend on when GC runs.
