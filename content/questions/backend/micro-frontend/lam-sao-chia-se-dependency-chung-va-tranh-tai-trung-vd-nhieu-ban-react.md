---
id: lam-sao-chia-se-dependency-chung-va-tranh-tai-trung-vd-nhieu-ban-react
position: backend
technology: micro-frontend
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao chia sẻ dependency chung và tránh tải trùng (vd nhiều bản React)?

## Question (EN)
How do you share common dependencies and avoid duplicate loading (e.g., multiple React copies)?

## Đáp án chi tiết (VI)
Khai báo dependency dùng chung qua `shared` (Module Federation) hoặc import maps, đặt `singleton: true` và ràng buộc version để các micro-frontend dùng chung một bản thư viện nặng như React. Nếu mỗi mảnh tự bundle React riêng thì payload tăng mạnh và khi hai bản React gặp nhau sẽ lỗi \\"invalid hook call\\". `requiredVersion` / `strictVersion` giúp cảnh báo khi version lệch. Đánh đổi cần nhớ: chia sẻ càng nhiều thì các team càng phải đồng bộ khi nâng version (vì singleton chỉ có một bản) — điều này làm giảm tính độc lập. Lưu ý: đừng chia sẻ mọi thứ; chỉ singleton những thứ buộc phải dùng chung một instance (React, react-dom, design system core), còn lại để mỗi mảnh tự quản để giữ autonomy.

## Detailed Answer (EN)
Declare shared dependencies via `shared` (Module Federation) or import maps, set `singleton: true`, and constrain versions so micro-frontends use a single copy of a heavy library like React. If each piece bundles its own React, payloads grow sharply and when two React copies meet you get an \\"invalid hook call\\" error. `requiredVersion` / `strictVersion` warn when versions diverge. Key trade-off: the more you share, the more teams must coordinate version bumps (a singleton has only one copy) — which reduces independence. Note: don't share everything; only make singletons of things that truly must share one instance (React, react-dom, design-system core), and let each piece manage the rest to preserve autonomy.
