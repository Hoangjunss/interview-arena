---
id: routing-hoat-dong-ra-sao-trong-kien-truc-micro-frontend
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Routing hoạt động ra sao trong kiến trúc micro-frontend?

## Question (EN)
How does routing work in a micro-frontend architecture?

## Đáp án chi tiết (VI)
Mô hình thường gặp: shell/container giữ routing cấp cao — quyết định path nào thì kích hoạt micro-frontend nào — còn mỗi micro-frontend tự quản các sub-route bên trong nó. Ví dụ shell map `/checkout/*` cho app Checkout, rồi bên trong app Checkout có route con `/checkout/payment`, `/checkout/review`. single-spa làm việc này qua `activeWhen`. Điểm mấu chốt: chỉ một \\"chủ\\" được điều khiển History API của trình duyệt để tránh xung đột. Lưu ý: nếu nhiều micro-frontend cùng nắm và đẩy history thì nút back/forward sẽ lộn xộn — phải thống nhất một router cấp cao, các app con chỉ điều hướng trong phạm vi được cấp.

## Detailed Answer (EN)
Common model: the shell/container owns top-level routing — deciding which path activates which micro-frontend — while each micro-frontend manages its own sub-routes internally. For example, the shell maps `/checkout/*` to the Checkout app, and inside Checkout there are nested routes `/checkout/payment`, `/checkout/review`. single-spa does this via `activeWhen`. The key point: only one \\"owner\\" should control the browser's History API to avoid conflicts. Note: if multiple micro-frontends grab and push history, the back/forward buttons behave incorrectly — agree on a single top-level router, with child apps navigating only within their granted scope.
