---
id: liskov-substitution-principle-lsp-la-gi-khi-nao-bi-vi-pham
position: backend
technology: solid
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Liskov Substitution Principle (LSP) là gì? Khi nào bị vi phạm?

## Question (EN)
What is the Liskov Substitution Principle (LSP)? When is it violated?

## Đáp án chi tiết (VI)
LSP quy định rằng các object của subclass phải có thể thay thế object của superclass mà không làm hỏng tính đúng đắn của chương trình.\
\
Ví dụ vi phạm thường gặp: class `Rectangle` có `setWidth/setHeight`, class `Square extends Rectangle` override cả hai để giữ tỷ lệ — khi code gọi `setWidth(5)` trên `Square` kỳ vọng height không đổi nhưng thực tế height cũng thay đổi, phá vỡ kỳ vọng. Dấu hiệu vi phạm LSP: subclass override method rồi throw exception, hoặc kiểm tra `instanceof` trước khi gọi method. Cách sửa: tách interface, dùng composition thay inheritance, hoặc tái thiết kế hierarchy.

## Detailed Answer (EN)
LSP states that objects of a subclass must be substitutable for objects of the superclass without breaking program correctness. The classic violation: `Rectangle` has `setWidth/setHeight`, and `Square extends Rectangle` overrides both to keep the aspect ratio — when code calls `setWidth(5)` on a `Square` and expects height to remain unchanged, it silently breaks. Warning signs of LSP violations include subclasses overriding a method to throw an exception, or callers checking `instanceof` before invoking a method. Fixes include splitting interfaces, favoring composition over inheritance, or redesigning the hierarchy. LSP ensures that code depending on an interface doesn't need to know about concrete implementations.
