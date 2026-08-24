---
id: so-sanh-redux-toolkit-zustand-jotai-va-context-api-khi-nao-nen-chon-cai-nao-de-q
position: backend
technology: state-management
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh Redux Toolkit, Zustand, Jotai và Context API — khi nào nên chọn cái nào để quản lý state?

## Question (EN)
Compare Redux Toolkit, Zustand, Jotai and Context API — when should you reach for each?

## Đáp án chi tiết (VI)
Bốn lựa chọn giải quyết các nhu cầu khác nhau, đừng mặc định reach for Redux.\
\
- **Context API**: không phải state manager, chỉ là cơ chế *truyền* value tránh prop drilling (theme, locale, user đã đăng nhập). Mọi consumer re-render khi value đổi → không hợp cho state cập nhật thường xuyên.\
- **Zustand**: store nhỏ ngoài React, chọn slice qua selector → chỉ component dùng slice đó re-render. Ít boilerplate, API `create()` cực gọn. Hợp cho state client toàn cục vừa và nhỏ.\
- **Jotai**: mô hình *atom* bottom-up, từng mẩu state độc lập, compose lại. Hợp khi state phân mảnh, nhiều mảnh nhỏ phụ thuộc lẫn nhau (derived atom).\
- **Redux Toolkit (RTK)**: top-down, một store lớn, có DevTools time-travel, middleware, RTK Query. Hợp app lớn cần audit trail, team đông cần convention chặt.\
\
**Lưu ý**: phần lớn \\"global state\\" thật ra là *server state* (data từ API) — nên dùng TanStack Query / RTK Query thay vì nhồi vào Redux/Zustand. Chỉ giữ *client state* thật (UI, form draft) trong các store trên.

## Detailed Answer (EN)
The four solve different needs; don't default to Redux.\
\
- **Context API**: not a state manager, just a way to *pass* a value without prop drilling (theme, locale, signed-in user). Every consumer re-renders when the value changes → bad for frequently-updated state.\
- **Zustand**: a small store outside React; subscribe via a selector so only components using that slice re-render. Minimal boilerplate with `create()`. Good for small/medium global client state.\
- **Jotai**: bottom-up *atom* model — independent pieces of state you compose. Good when state is fragmented into small interdependent pieces (derived atoms).\
- **Redux Toolkit (RTK)**: top-down single store with time-travel DevTools, middleware, RTK Query. Good for large apps needing an audit trail and strict conventions.\
\
**Note**: most \\"global state\\" is really *server state* (API data) — use TanStack Query / RTK Query for it instead of stuffing it into Redux/Zustand. Keep only true *client state* (UI, form drafts) in these stores.
