---
id: es-modules-esm-va-commonjs-cjs-khac-nhau-the-nao
position: backend
technology: modules
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ES Modules (ESM) và CommonJS (CJS) khác nhau thế nào?

## Question (EN)
How do ES Modules (ESM) and CommonJS (CJS) differ?

## Đáp án chi tiết (VI)
- **CommonJS** (Node.js truyền thống): `require()` / `module.exports`, nạp **đồng bộ** lúc runtime, và **động** (có thể `require` trong `if`). Cấu trúc module không phân tích tĩnh được hoàn toàn.\
- **ES Modules** (chuẩn ngôn ngữ): `import` / `export`, cấu trúc **tĩnh** — phân tích được lúc build nên hỗ trợ **tree-shaking**; nạp **bất đồng bộ**, có **top-level `await`** và `import()` động. Dùng **live binding** (import phản ánh giá trị hiện tại của export).\
\
Khác nữa: ESM luôn chạy **strict mode**, và `this` ở top-level là `undefined` (CJS là `module.exports`).\
\
Node hỗ trợ cả hai (`.mjs` hoặc `\\"type\\": \\"module\\"`); trình duyệt chỉ hiểu ESM qua `\u003cscript type=\\"module\\"\u003e`.

## Detailed Answer (EN)
- **CommonJS** (traditional Node.js): `require()` / `module.exports`, loads **synchronously** at runtime and is **dynamic** (you can `require` inside an `if`). Its module structure is not fully statically analyzable.\
- **ES Modules** (the language standard): `import` / `export`, a **static** structure — analyzable at build time, enabling **tree-shaking**; loads **asynchronously**, supports **top-level `await`** and dynamic `import()`. Uses **live bindings** (an import reflects the export's current value).\
\
Also: ESM always runs in **strict mode**, and top-level `this` is `undefined` (in CJS it is `module.exports`).\
\
Node supports both (`.mjs` or `\\"type\\": \\"module\\"`); browsers understand only ESM via `\u003cscript type=\\"module\\"\u003e`.
