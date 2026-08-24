---
id: jotai-la-gi-so-sanh-voi-recoil
position: backend
technology: jotai
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Jotai là gì? So sánh với Recoil?

## Question (EN)
What is Jotai? How does it compare to Recoil?

## Đáp án chi tiết (VI)
Jotai là thư viện atomic state management tương tự Recoil nhưng nhỏ gọn hơn (~3KB vs ~21KB) và API đơn giản hơn đáng kể. Điểm khác biệt chính: Jotai không yêu cầu `key` string duy nhất cho mỗi atom (Recoil bắt buộc, dễ gây conflict trong large codebase), không cần `RecoilRoot` wrapper (Jotai dùng WeakMap nên hoạt động không cần Provider). Cú pháp gần với useState hơn: `const countAtom = atom(0)`, trong component: `const [count, setCount] = useAtom(countAtom)`. Jotai cũng hỗ trợ derived atoms, async atoms với Suspense, và có thể dùng `atomWithStorage` để persist. Tính đến 2024-2026, Jotai đã thay thế Recoil thực tế: Meta archive repo Recoil đầu 2024 (không còn maintain), Jotai trở thành lựa chọn mặc định cho atomic state.

## Detailed Answer (EN)
Jotai is an atomic state management library similar to Recoil but much smaller (~3KB vs ~21KB) with a significantly simpler API. Key differences: Jotai does not require a unique `key` string for each atom (Recoil requires it and collisions are a real issue in large codebases), and no `RecoilRoot` wrapper is needed (Jotai uses a WeakMap so it works without a Provider). The syntax is closer to useState: `const countAtom = atom(0)`, in a component: `const [count, setCount] = useAtom(countAtom)`. Jotai also supports derived atoms, async atoms with Suspense, and `atomWithStorage` for persistence. As of 2024-2026, Jotai has effectively replaced Recoil: Meta archived the Recoil repo in early 2024 (no longer maintained), making Jotai the de-facto choice for atomic state.
