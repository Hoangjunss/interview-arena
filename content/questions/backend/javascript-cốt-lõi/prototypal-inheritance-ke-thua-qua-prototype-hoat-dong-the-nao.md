---
id: prototypal-inheritance-ke-thua-qua-prototype-hoat-dong-the-nao
position: backend
technology: javascript-cốt-lõi
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Prototypal inheritance (kế thừa qua prototype) hoạt động thế nào?

## Question (EN)
How does prototypal inheritance work in JavaScript?

## Đáp án chi tiết (VI)
Mỗi object có một liên kết ẩn `[[Prototype]]` (đọc qua `Object.getPrototypeOf`, hoặc `__proto__`) trỏ tới object khác. Khi truy cập một property mà object không có, engine **đi ngược lên chuỗi prototype** cho tới khi tìm thấy hoặc chạm `null`. Đó là **prototype chain**.\
\
- `obj.hasOwnProperty(k)` phân biệt property riêng và kế thừa.\
- `Object.create(proto)` tạo object với prototype chỉ định.\
- `class` là **syntactic sugar** (cú pháp rút gọn) trên prototype: `extends` gắn prototype cha, method của class nằm trên `Class.prototype` để mọi instance dùng chung.\
- Khác OOP class-based (Java): JS kế thừa **object → object**, không cần \\"khuôn\\" class thật.\
\
Lợi ích: method định nghĩa một lần trên prototype, mọi instance chia sẻ — tiết kiệm bộ nhớ.

## Detailed Answer (EN)
Every object has a hidden `[[Prototype]]` link (read via `Object.getPrototypeOf`, or `__proto__`) pointing to another object. When you access a property the object lacks, the engine **walks up the prototype chain** until it finds it or hits `null`. That is the **prototype chain**.\
\
- `obj.hasOwnProperty(k)` distinguishes own vs inherited properties.\
- `Object.create(proto)` makes an object with a chosen prototype.\
- `class` is **syntactic sugar** over prototypes: `extends` sets the parent prototype, and class methods live on `Class.prototype` so all instances share them.\
- Unlike class-based OOP (Java): JS inherits **object → object**, with no real class blueprint.\
\
Benefit: a method defined once on the prototype is shared by every instance — saving memory.
