---
id: type-only-imports-va-exports-la-gi
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Type-only imports và exports là gì?

## Question (EN)
What are type-only imports and exports?

## Đáp án chi tiết (VI)
Type-only imports (import type { Foo } from './foo') chỉ import thông tin kiểu dữ liệu và bị xóa hoàn toàn khỏi code JavaScript sau khi compile, không tạo ra bất kỳ runtime import nào. Điều này đặc biệt quan trọng khi bật isolatedModules (bắt buộc với Vite, esbuild) vì các bundler này compile từng file riêng lẻ và không thể biết một import là type hay value. Tương tự, export type { Foo } dùng để re-export chỉ type information, giúp ngăn circular dependency issues vì không tạo side effects ở runtime. Từ TypeScript 5.0+, ta có thể mix type và value imports trong cùng một statement: import { type Foo, bar } from './module', trong đó chỉ bar được giữ lại sau compile.

## Detailed Answer (EN)
Type-only imports (`import type { Foo } from './foo'`) only import type information and are completely erased from the compiled JavaScript, producing no runtime import. This is particularly important with isolatedModules (required for Vite and esbuild) because those bundlers compile each file individually and cannot tell whether an import is a type or a value. Similarly, `export type { Foo }` re-exports only type information, helping prevent circular dependency issues since there are no runtime side effects. From TypeScript 5.0+, you can mix type and value imports in a single statement: `import { type Foo, bar } from './module'`, where only bar is retained after compilation.
