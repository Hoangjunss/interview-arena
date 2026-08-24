---
id: event-bubbling-capturing-va-event-delegation-la-gi
position: backend
technology: trình-duyệt-\u0026-nền-tảng
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Event bubbling, capturing và event delegation là gì?

## Question (EN)
What are event bubbling, capturing, and event delegation?

## Đáp án chi tiết (VI)
Một sự kiện DOM lan theo **3 pha**: **capturing** (từ `document` đi xuống target) → **target** → **bubbling** (từ target đi ngược lên). Mặc định `addEventListener` nghe ở pha **bubbling**; truyền `{ capture: true }` để nghe ở pha capturing.\
\
- `event.target` = phần tử thực sự bị tác động; `event.currentTarget` = phần tử đang gắn listener.\
- `stopPropagation()` chặn lan tiếp; `preventDefault()` chặn hành vi mặc định (2 việc khác nhau).\
\
**Event delegation**: thay vì gắn listener cho từng phần tử con, gắn **một listener ở phần tử cha** và dựa vào bubbling để bắt sự kiện, rồi phân nhánh theo `event.target`. Lợi ích:\
- Ít listener → tốn ít bộ nhớ.\
- **Tự động áp dụng cho phần tử con thêm động** sau này.\
\
Hay dùng cho danh sách dài, bảng, menu.

## Detailed Answer (EN)
A DOM event travels in **3 phases**: **capturing** (from `document` down to the target) → **target** → **bubbling** (from the target back up). By default `addEventListener` listens in the **bubbling** phase; pass `{ capture: true }` to listen during capturing.\
\
- `event.target` = the element actually acted on; `event.currentTarget` = the element the listener is attached to.\
- `stopPropagation()` stops further propagation; `preventDefault()` cancels the default behavior (two different things).\
\
**Event delegation**: instead of attaching a listener to each child, attach **one listener on a parent** and rely on bubbling to catch events, then branch on `event.target`. Benefits:\
- Fewer listeners → less memory.\
- **Automatically covers children added dynamically** later.\
\
Common for long lists, tables, and menus.
