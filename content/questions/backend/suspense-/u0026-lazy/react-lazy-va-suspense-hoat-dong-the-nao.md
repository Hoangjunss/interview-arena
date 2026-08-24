---
id: react-lazy-va-suspense-hoat-dong-the-nao
position: backend
technology: suspense-\u0026-lazy
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`React.lazy` và `\u003cSuspense\u003e` hoạt động thế nào?

## Question (EN)
How do `React.lazy` and `\u003cSuspense\u003e` work?

## Đáp án chi tiết (VI)
- **`React.lazy(() =\u003e import('./X'))`** khai báo một component nạp **động**: bundler tách nó thành chunk riêng, chỉ tải khi component thực sự render → **code splitting**.\
- **`\u003cSuspense fallback={...}\u003e`** bọc component lazy (hoặc component đọc dữ liệu qua data lib hỗ trợ Suspense) và hiển thị `fallback` trong lúc chờ.\
- Fallback hiện khi **bất kỳ con nào đang suspend**; nhiều lazy trong cùng một `Suspense` chia sẻ chung một fallback.\
- Dùng phổ biến: split theo route, tab nặng, modal mở theo tương tác.\
- Nên kết hợp **error boundary** để bắt lỗi khi tải chunk thất bại (mạng lỗi).

## Detailed Answer (EN)
- **`React.lazy(() =\u003e import('./X'))`** declares a **dynamically** loaded component: the bundler splits it into its own chunk, fetched only when the component actually renders → **code splitting**.\
- **`\u003cSuspense fallback={...}\u003e`** wraps the lazy component (or a component reading data via a Suspense-enabled data library) and shows `fallback` while it waits.\
- The fallback appears while **any child is suspending**; several lazy components under one `Suspense` share a single fallback.\
- Common uses: route-level splitting, heavy tabs, interaction-triggered modals.\
- Pair it with an **error boundary** to catch a failed chunk load (network error).
