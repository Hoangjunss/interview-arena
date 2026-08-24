---
id: lam-sao-xu-ly-race-condition-trong-async-useeffect-vi-du-user-type-vao-search-bo
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao xử lý race condition trong async useEffect? \
\
**Ví dụ:** user type vào search box rồi xóa hết, request cũ về trước request mới.

## Question (EN)
How do you handle race conditions in async useEffect? \
\
**Example:** user types in a search box then clears it, and the old request resolves after the new one.

## Đáp án chi tiết (VI)
Race condition xảy ra khi nhiều request bất đồng bộ được gửi đi và response trả về không đúng thứ tự, khiến UI hiển thị dữ liệu sai. Cách xử lý phổ biến nhất là dùng AbortController trong cleanup function của useEffect: tạo controller, truyền signal vào fetch, và return hàm abort trong cleanup.\
\
```js\
const controller = new AbortController();\
fetch(url, { signal: controller.signal });\
return () =\u003e controller.abort();\
```\
\
Ngoài ra có thể dùng thư viện như TanStack Query vì nó tự động xử lý caching, deduplication và cancellation.

## Detailed Answer (EN)
A race condition happens when multiple async requests are in-flight and responses arrive out of order, causing the UI to display stale data. The most common fix is using AbortController in the useEffect cleanup: create a controller, pass its signal to fetch, and abort in the cleanup. \
\
**Example:** `const controller = new AbortController(); fetch(url, { signal: controller.signal }); return () =\u003e controller.abort()`. Alternatively, use TanStack Query, which handles caching, request deduplication, and cancellation automatically.
