---
id: so-sanh-bundle-size-va-performance-giua-jotai-va-zustand
position: backend
technology: jotai
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh bundle size và performance giữa Jotai và Zustand?

## Question (EN)
Compare bundle size and performance between Jotai and Zustand.

## Đáp án chi tiết (VI)
Bundle size (minified+gzipped): Jotai ~3KB, Zustand ~1KB (core) đến ~8KB với middleware. Re-render characteristics: cả hai đều fine-grained — chỉ re-render component subscribe đúng atom/slice thay đổi, khác Context API re-render cả cây. Jotai vs Zustand về performance: Jotai atomic model tốt cho graph-shaped state với nhiều derived values (mỗi atom có dependency tracking riêng), Zustand tốt hơn khi cần batch updates và ít derived state vì single-store overhead thấp. Tree-shaking: cả hai đều tree-shakeable tốt (ESM-first). Memory: Jotai dùng WeakMap nên atoms tự GC khi không còn reference, Zustand giữ store reference khi còn subscriber. Benchmark thực tế (js-framework-benchmark): hai thư viện tương đương về raw render speed, bottleneck thường là React reconciliation chứ không phải state library. Khuyến nghị: Zustand cho simplicity và tiny bundle, Jotai cho fine-grained atomic state với nhiều derived values.

## Detailed Answer (EN)
Bundle size (minified + gzipped): Jotai ~3KB, Zustand ~1KB (core) to ~8KB with middleware. Re-render characteristics: both are fine-grained — only components subscribed to the changed atom/slice re-render, unlike Context API which re-renders the whole tree. Jotai vs Zustand on performance: Jotai's atomic model is better for graph-shaped state with many derived values (each atom has its own dependency tracking); Zustand is better for batch updates and apps with little derived state because single-store overhead is lower. Tree-shaking: both tree-shake well (ESM-first). Memory: Jotai uses a WeakMap so atoms are GC'd when no references remain; Zustand keeps the store reference while subscribers exist. Real-world benchmark (js-framework-benchmark): both are equivalent in raw render speed; the bottleneck is usually React reconciliation, not the state library. Recommendation: Zustand for simplicity and tiny bundle, Jotai for fine-grained atomic state with many derived values.
