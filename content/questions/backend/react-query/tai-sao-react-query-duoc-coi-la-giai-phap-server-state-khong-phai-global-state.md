---
id: tai-sao-react-query-duoc-coi-la-giai-phap-server-state-khong-phai-global-state
position: backend
technology: react-query
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao React Query được coi là giải pháp 'server state' không phải 'global state'?

## Question (EN)
Why is React Query considered a 'server state' solution rather than 'global state'?

## Đáp án chi tiết (VI)
Server state thuộc server (có thể thay đổi bởi người khác bất kỳ lúc nào) — React Query quản lý caching/sync, không phải \\"global state\\" như Redux. Có 2 loại state khác biệt bản chất: **Client state** (theme, sidebar open, form input) — thuộc sở hữu hoàn toàn của client, đồng bộ ngay lập tức, không bao giờ 'stale'. **Server state** (user profile, todo list, product catalog) — thuộc sở hữu của server, có thể bị thay đổi bởi người khác, cần đồng bộ liên tục, luôn có khả năng 'stale'. Redux trộn lẫn 2 loại này vào 1 store, dẫn đến phức tạp không cần thiết (loading states, error states, normalization). React Query tách biệt: nó CHỈ quản lý server state với caching, background refetch, retry, deduplication. Client state dùng useState/useReducer/Zustand. Kết quả: giảm 50-80% Redux code trong hầu hết projects.

## Detailed Answer (EN)
Server state is owned by the server (can change at any time) — React Query manages caching/sync, not \\"global state\\" like Redux. There are two fundamentally different types of state: **Client state** (theme, sidebar open/closed, form input) — fully owned by the client, synchronous, never becomes stale. **Server state** (user profile, todo list, product catalog) — owned by the server, can be changed by others at any time, must be continuously synchronized, always potentially stale. Redux mixes both types into one store, creating unnecessary complexity (loading states, error states, normalization). React Query is separate: it ONLY manages server state with caching, background refetch, retry, and deduplication. Client state is handled by useState/useReducer/Zustand. Result: 50-80% reduction in Redux code in most projects.
