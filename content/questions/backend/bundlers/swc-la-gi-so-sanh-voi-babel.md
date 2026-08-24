---
id: swc-la-gi-so-sanh-voi-babel
position: backend
technology: bundlers
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SWC là gì? So sánh với Babel?

## Question (EN)
What is SWC? How does it compare to Babel?

## Đáp án chi tiết (VI)
SWC (Speedy Web Compiler) là Rust-based JS/TS compiler — nhanh hơn Babel 20-70x single-thread, 70x với multi-core parallelization. Next.js adoption: từ Next.js 12, SWC thay thế Babel cho transpilation và Terser cho minification — cold build 5x nhanh hơn, HMR 3x nhanh hơn; tự động detect và migrate từ Babel config khi có .babelrc. Compatibility: SWC hỗ trợ hầu hết Babel transforms — preset-env equivalents, TypeScript, JSX, decorators. Plugin system limitations: SWC plugins viết bằng WebAssembly (WASM) — khó implement hơn Babel plugins (JS), ecosystem nhỏ hơn nhiều; một số advanced Babel transforms (custom macros, babel-plugin-macros) chưa có SWC equivalent. @swc/core dùng trực tiếp trong Node.js scripts, swc-loader cho Webpack, @vitejs/plugin-react có thể dùng SWC. Khi không thể dùng SWC: project phụ thuộc vào Babel plugins đặc biệt (babel-plugin-styled-components transformation, babel-plugin-import for tree shaking), hoặc cần custom transforms. Deno sử dụng SWC internally cho TypeScript transpilation.

## Detailed Answer (EN)
$83
