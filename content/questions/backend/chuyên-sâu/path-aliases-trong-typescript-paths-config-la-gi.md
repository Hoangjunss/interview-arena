---
id: path-aliases-trong-typescript-paths-config-la-gi
position: backend
technology: chuyên-sâu
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Path aliases trong TypeScript (paths config) là gì?

## Question (EN)
What are path aliases in TypeScript (paths config)?

## Đáp án chi tiết (VI)
paths trong tsconfig.json map import paths để tránh relative paths dài. Cần configure cả bundler vì TS compiler chỉ handle types, không transform imports.\
\
```json\
// tsconfig.json\
{ \\"compilerOptions\\": { \\"paths\\": { \\"@/*\\": [\\"./src/*\\"] } } }\
```\
\
```typescript\
// vite.config.ts\
import { defineConfig } from 'vite';\
export default defineConfig({\
  resolve: { alias: { '@': '/src' } }\
});\
// Dùng: import { Button } from '@/components/Button'\
```

## Detailed Answer (EN)
paths in tsconfig.json maps import paths to avoid long relative paths. Requires configuring both TS and the bundler because the TS compiler only handles types and does not transform imports.\
\
```json\
// tsconfig.json\
{ \\"compilerOptions\\": { \\"paths\\": { \\"@/*\\": [\\"./src/*\\"] } } }\
```\
\
```typescript\
// vite.config.ts\
import { defineConfig } from 'vite';\
export default defineConfig({\
  resolve: { alias: { '@': '/src' } }\
});\
// Usage: import { Button } from '@/components/Button'\
```
