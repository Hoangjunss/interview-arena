---
id: cach-tao-va-su-dung-atom-trong-jotai
position: backend
technology: jotai
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách tạo và sử dụng atom trong Jotai?

## Question (EN)
How do you create and use atoms in Jotai?

## Đáp án chi tiết (VI)
Primitive atom: `const countAtom = atom(0)` — trong component dùng `useAtom(countAtom)` trả về `[value, setValue]`. Derived read-only: `const doubleAtom = atom(get =\u003e get(countAtom) * 2)` — dùng `useAtomValue`. Derived read-write: `atom(get =\u003e get(baseAtom), (get, set, newVal) =\u003e set(baseAtom, newVal * 2))`. `atomWithStorage('key', defaultVal)` từ `jotai/utils` tự đồng bộ localStorage, handle SSR hydration. `atomWithDefault(get =\u003e get(otherAtom))` tạo atom có thể override nhưng mặc định derive. Architecture Provider-less: Jotai dùng WeakMap lưu state theo atom object reference thay vì string key như Recoil — atoms tự nhiên unique, hỗ trợ code-split, không lo duplicate key. `useAtomValue` (chỉ đọc) và `useSetAtom` (chỉ ghi, không subscribe, không re-render) là hooks tối ưu performance.

## Detailed Answer (EN)
Primitive atom: `const countAtom = atom(0)` — use `useAtom(countAtom)` in a component, returns `[value, setValue]`. Read-only derived: `const doubleAtom = atom(get =\u003e get(countAtom) * 2)` — use `useAtomValue`. Read-write derived: `atom(get =\u003e get(baseAtom), (get, set, newVal) =\u003e set(baseAtom, newVal * 2))`. `atomWithStorage('key', defaultVal)` from `jotai/utils` auto-syncs to localStorage and handles SSR hydration. `atomWithDefault(get =\u003e get(otherAtom))` creates an atom that can be overridden but defaults to a derived value. Provider-less architecture: Jotai uses a WeakMap to store state keyed by atom object reference instead of a string key like Recoil — atoms are naturally unique, support code-splitting, and have no risk of duplicate key collisions. `useAtomValue` (read-only) and `useSetAtom` (write-only, no subscription, no re-render) are the performance-optimized hooks.
