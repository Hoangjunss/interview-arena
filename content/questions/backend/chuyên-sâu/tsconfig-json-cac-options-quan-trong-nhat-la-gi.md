---
id: tsconfig-json-cac-options-quan-trong-nhat-la-gi
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
tsconfig.json các options quan trọng nhất là gì?

## Question (EN)
What are the most important tsconfig.json options?

## Đáp án chi tiết (VI)
Trong tsconfig.json, strict: true là option quan trọng nhất vì nó bật toàn bộ strict type-checking bao gồm strictNullChecks, noImplicitAny và strictFunctionTypes. target xác định phiên bản ES output (ví dụ ES2020), module chọn hệ thống module (ESNext, CommonJS), và moduleResolution quyết định cách TypeScript tìm kiếm file khi import (node, bundler). Ngoài ra, paths cho phép cấu hình path aliases (ví dụ @/components), isolatedModules bắt buộc khi dùng bundlers như Vite hoặc esbuild vì chúng compile từng file riêng lẻ, và sourceMap: true giúp debug bằng cách map code đã compile về source TypeScript gốc.

## Detailed Answer (EN)
In tsconfig.json, strict: true is the most important option as it enables all strict type-checking including strictNullChecks, noImplicitAny, and strictFunctionTypes. target specifies the ES output version (e.g., ES2020), module selects the module system (ESNext, CommonJS), and moduleResolution determines how TypeScript resolves files when importing (node, bundler). Additionally, paths enables path aliases (e.g., @/components), isolatedModules is required when using bundlers like Vite or esbuild since they compile each file individually, and sourceMap: true aids debugging by mapping compiled code back to the original TypeScript source.
