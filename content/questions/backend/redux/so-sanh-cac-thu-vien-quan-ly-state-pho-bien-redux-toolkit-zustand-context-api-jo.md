---
id: so-sanh-cac-thu-vien-quan-ly-state-pho-bien-redux-toolkit-zustand-context-api-jo
position: backend
technology: redux
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh các thư viện quản lý state phổ biến: Redux Toolkit, Zustand, Context API, Jotai? Khi nào dùng gì?

## Question (EN)
Compare popular state management libraries: Redux Toolkit, Zustand, Context API, Jotai. When should you use each?

## Đáp án chi tiết (VI)
Context API: state đơn giản, ít thay đổi (theme, auth, locale) — không cần cài thêm gì. Zustand: nhẹ (~1KB), ít boilerplate, API đơn giản, phù hợp đa số projects. Redux Toolkit: enterprise, complex state cần middleware (async thunks, saga), DevTools mạnh, team lớn cần convention rõ ràng. Jotai: atomic state (mỗi state là 1 atom độc lập), tối ưu re-render vì chỉ component dùng atom đó mới update. \
\
**Lưu ý:** Recoil (Meta) đã ngừng phát triển — nên chuyển sang Jotai. Thực tế hiện tại: Zustand phổ biến nhất cho project mới vì đơn giản và đủ mạnh.

## Detailed Answer (EN)
Context API: for simple, rarely-changing state (theme, auth, locale) — no extra dependency needed. Zustand: lightweight (~1KB), minimal boilerplate, simple API — suitable for most projects. Redux Toolkit: enterprise-grade, complex state needing middleware (async thunks, sagas), powerful DevTools, good for large teams needing clear conventions. Jotai: atomic state (each atom is independent), minimizes re-renders since only components using a given atom update. \
\
**Note:** Recoil (Meta) is abandoned — migrate to Jotai. In practice today: Zustand is the most popular choice for new projects due to its simplicity and power.
