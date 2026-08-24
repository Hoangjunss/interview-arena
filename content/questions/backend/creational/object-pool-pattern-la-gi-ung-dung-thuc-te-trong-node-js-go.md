---
id: object-pool-pattern-la-gi-ung-dung-thuc-te-trong-node-js-go
position: backend
technology: creational
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Object Pool pattern là gì? Ứng dụng thực tế trong Node.js/Go?

## Question (EN)
What is the Object Pool pattern? Real-world use cases in Node.js and Go?

## Đáp án chi tiết (VI)
Object Pool duy trì một tập các object đã được khởi tạo sẵn để tái sử dụng thay vì tạo/hủy liên tục — tối ưu cho object tốn kém để khởi tạo. Ứng dụng phổ biến nhất: database connection pool — thay vì tạo connection mới cho mỗi request, pool duy trì N connections sẵn sàng. Trong Node.js với `pg` (PostgreSQL): `const pool = new Pool({ max: 10, min: 2, idleTimeoutMillis: 30000 })` — pool tự quản lý lifecycle của connections. Trong Go, `sync.Pool` được dùng cho object allocation thường xuyên: `var bufPool = sync.Pool{ New: func() interface{} { return new(bytes.Buffer) } }`. Dùng khi: object expensive to create (DB connections, thread, large buffers); high throughput applications. Không dùng khi: object khởi tạo nhanh, pool overhead \u003e benefit; khi pool quá nhỏ gây contention; khi object có state phức tạp khó reset.

## Detailed Answer (EN)
Object Pool maintains a set of pre-initialized objects ready for reuse instead of continuously creating and destroying them — optimal for objects that are expensive to initialize. The most common use case is a database connection pool: instead of creating a new connection for every request, the pool keeps N connections ready. In Node.js with `pg` (PostgreSQL): `const pool = new Pool({ max: 10, min: 2, idleTimeoutMillis: 30000 })` — the pool manages connection lifecycle automatically. In Go, `sync.Pool` is used for frequently allocated objects: `var bufPool = sync.Pool{ New: func() interface{} { return new(bytes.Buffer) } }`. Use it when objects are expensive to create (DB connections, threads, large buffers) and throughput is high. Avoid it when object initialization is fast and pool overhead outweighs the benefit, when the pool is too small and causes contention, or when objects have complex state that is difficult to reset.
