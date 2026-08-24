---
id: commonjs-modules-require-module-exports-va-es-modules-import-export-trong-node-j
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CommonJS modules (require/module.exports) và ES Modules (import/export) trong Node.js khác nhau như thế nào?

## Question (EN)
How do CommonJS modules (require/module.exports) and ES Modules (import/export) differ in Node.js?

## Đáp án chi tiết (VI)
CommonJS (CJS): `require()` load synchronous và blocking — có thể require() ở bất kỳ đâu trong code kể cả trong if/function, module.exports là bất kỳ giá trị gì, không hỗ trợ tree-shaking. ESM: `import` phải ở top-level (static analysis), load asynchronous cho phép parallel fetch, tree-shakeable vì bundlers biết chính xác exports nào được dùng. ESM exclusive features: top-level `await`, import.meta.url, dynamic `import()`. Interop challenges: CJS có thể `require()` ESM file? Không được, phải dùng dynamic `import()`. ESM có thể import CJS? Có, nhưng chỉ default import. Dual package hazard: publish cả CJS lẫn ESM cùng package — nếu app load cả hai, sẽ có 2 instances của module (state, class không share được). Giải pháp: conditional exports trong package.json. `type: 'module'` trong package.json = tất cả `.js` là ESM, CJS phải đổi thành `.cjs`. Node.js 22+ hỗ trợ `--experimental-require-module` để require() ESM.

## Detailed Answer (EN)
CommonJS (CJS): `require()` loads synchronously and blocks — can be called anywhere in code including inside if/function blocks; module.exports can be any value; no tree-shaking support. ESM: `import` must be at the top level (static analysis), loads asynchronously enabling parallel fetching, tree-shakeable because bundlers know exactly which exports are used. ESM-exclusive features: top-level `await`, import.meta.url, dynamic `import()`. Interop challenges: can CJS `require()` an ESM file? No — must use dynamic `import()`. Can ESM import CJS? Yes, but only as a default import. Dual package hazard: publishing both CJS and ESM in the same package — if an app loads both, there will be two module instances (state, classes cannot be shared). Solution: conditional exports in package.json. `type: 'module'` in package.json means all `.js` files are ESM; CJS files must be renamed to `.cjs`. Node.js 22+ supports `--experimental-require-module` to `require()` ESM files.
