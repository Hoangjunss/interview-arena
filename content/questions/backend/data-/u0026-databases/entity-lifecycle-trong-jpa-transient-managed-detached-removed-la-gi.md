---
id: entity-lifecycle-trong-jpa-transient-managed-detached-removed-la-gi
position: backend
technology: data-\u0026-databases
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Entity lifecycle trong JPA: transient, managed, detached, removed là gì?

## Question (EN)
Entity lifecycle in JPA: what are transient, managed, detached, and removed?

## Đáp án chi tiết (VI)
4 trạng thái của entity đối với **Persistence Context**:\
\
- **Transient (new)** — vừa `new`, JPA chưa biết đến, chưa có row trong DB.\
- **Managed (persistent)** — đang được Persistence Context theo dõi (sau `persist()`, `find()`, hoặc query trả về) → hưởng **dirty checking**: sửa field, đến lúc commit là tự UPDATE, **không cần gọi save()**.\
- **Detached** — Persistence Context đã đóng (transaction kết thúc) hoặc bị `detach()` → object vẫn còn nhưng không được theo dõi; sửa gì JPA cũng không biết. Gắn lại bằng `merge()` — lưu ý merge trả về **bản managed MỚI**, không phải object cũ.\
- **Removed** — bị đánh dấu xoá qua `remove()`; DELETE thực thi khi flush/commit.\
\
**Đây là gốc của nhiều bẫy quen thuộc:**\
- `LazyInitializationException` = truy cập lazy field trên entity **detached** (ngoài transaction).\
- \\"Sửa entity trong `@Transactional` mà không gọi save() vẫn được lưu\\" = vì entity đang **managed**, dirty checking lo phần còn lại.

## Detailed Answer (EN)
The 4 states of an entity relative to the **Persistence Context**:\
\
- **Transient (new)** — just `new`-ed, unknown to JPA, no DB row yet.\
- **Managed (persistent)** — tracked by the Persistence Context (after `persist()`, `find()`, or a query result) → gets **dirty checking**: mutate a field and commit triggers an UPDATE automatically, **no save() call needed**.\
- **Detached** — the Persistence Context closed (transaction ended) or `detach()` was called → the object still exists but is untracked; JPA sees none of your changes. Reattach with `merge()` — note merge returns a **NEW managed copy**, not the original object.\
- **Removed** — marked for deletion via `remove()`; the DELETE executes at flush/commit.\
\
**This is the root of familiar gotchas:**\
- `LazyInitializationException` = accessing a lazy field on a **detached** entity (outside a transaction).\
- \\"Editing an entity inside `@Transactional` persists without save()\\" = because the entity is **managed**; dirty checking does the rest.
