---
id: onpush-change-detection-hoat-dong-the-nao
position: backend
technology: signals-\u0026-change-detection
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
OnPush change detection hoạt động thế nào?

## Question (EN)
How does OnPush change detection work?

## Đáp án chi tiết (VI)
`ChangeDetectionStrategy.OnPush` giảm số lần check component bằng cách chỉ cập nhật khi input reference đổi, event trong component xảy ra, async pipe emit, signal được đọc trong template đổi, hoặc component được mark for check.\
\
Nó hiệu quả khi state immutable và component tree lớn. Lưu ý: mutate object/array tại chỗ có thể không trigger update như mong muốn; nên replace reference hoặc dùng signal update đúng cách.

## Detailed Answer (EN)
`ChangeDetectionStrategy.OnPush` reduces checks by updating a component when an input reference changes, an event happens inside the component, an async pipe emits, a signal read in the template changes, or the component is marked for check.\
\
It is effective with immutable state and large component trees. Pitfall: mutating objects/arrays in place may not trigger updates as expected; replace references or update signals correctly.
