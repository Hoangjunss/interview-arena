---
id: flyweight-pattern-la-gi-khi-nao-nen-dung
position: backend
technology: structural
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Flyweight pattern là gì? Khi nào nên dùng?

## Question (EN)
What is the Flyweight pattern? When should you use it?

## Đáp án chi tiết (VI)
Flyweight giảm memory usage bằng cách chia sẻ state chung (intrinsic state) giữa nhiều objects tương tự — chỉ lưu state riêng (extrinsic state) trong object cụ thể.\
\
Ví dụ game: render 10,000 cây trong rừng — thay vì mỗi `Tree` object lưu texture/mesh riêng, tạo `TreeType` flyweight lưu shared data, `Tree` chỉ lưu position/scale. Trong JavaScript: string interning, Symbol, React key reconciliation có elements của Flyweight.\
\
Dùng khi: app cần số lượng rất lớn objects tương đồng và memory là bottleneck. Không dùng khi: số lượng object ít; khi overhead quản lý flyweight \u003e memory saved. Flyweight tăng code complexity đáng kể — chỉ dùng khi profiling chứng minh memory là vấn đề thực sự.

## Detailed Answer (EN)
Flyweight reduces memory usage by sharing common state (intrinsic state) among many similar objects — only the unique state (extrinsic state) is stored per object. Game example: rendering 10,000 trees in a forest — instead of each `Tree` object storing its own texture and mesh, a `TreeType` flyweight holds the shared data while `Tree` only stores position and scale. In JavaScript: string interning, Symbols, and React key reconciliation contain elements of Flyweight. Use it when an app needs a very large number of similar objects and memory is a bottleneck, or when most of an object's state can be externalized. Avoid it when the object count is small, when flyweight management overhead exceeds memory savings, or when the extrinsic state is more complex than the benefit justifies. Flyweight adds significant code complexity — only apply it when profiling confirms memory is genuinely the problem.
