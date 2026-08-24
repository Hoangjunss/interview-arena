---
id: tree-shaking-la-gi-va-dua-vao-dau-de-hoat-dong
position: backend
technology: bundle-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tree-shaking là gì và dựa vào đâu để hoạt động?

## Question (EN)
What is tree-shaking and what does it rely on?

## Đáp án chi tiết (VI)
Tree-shaking = **loại bỏ code chết** (dead-code elimination): bundler bỏ các `export` không được `import` ra khỏi bundle production.\
\
Nó dựa vào **cấu trúc tĩnh của ES module** — `import`/`export` phân tích được lúc build. Vì vậy **không được để Babel transpile ESM sang CommonJS** nếu muốn tree-shake.\
\
`sideEffects` trong `package.json` báo file nào \\"thuần\\" (không side effect) để bundler bỏ nguyên module không dùng. Cẩn thận: file CSS import, polyfill có side effect → **đừng đặt `sideEffects: false` tùy tiện** để tránh loại nhầm chúng.\
\
Chỉ hiệu quả đầy đủ ở `mode: 'production'` (có minify để thực sự xóa code đã đánh dấu).

## Detailed Answer (EN)
Tree-shaking = **dead-code elimination**: the bundler drops `export`s that are never `import`ed from the production bundle.\
\
It relies on the **static structure of ES modules** — `import`/`export` analyzable at build time. So you **must not let Babel transpile ESM to CommonJS** if you want tree-shaking to work.\
\
The `sideEffects` field in `package.json` tells the bundler which files are \\"pure\\" (side-effect free) so it can drop unused modules whole. Careful: CSS imports and polyfills have side effects → **do not set `sideEffects: false` carelessly** or you will lose them.\
\
It only fully kicks in at `mode: 'production'` (minification actually removes the marked code).
