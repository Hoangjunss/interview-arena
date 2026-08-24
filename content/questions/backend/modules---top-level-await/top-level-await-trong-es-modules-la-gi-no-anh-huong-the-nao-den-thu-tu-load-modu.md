---
id: top-level-await-trong-es-modules-la-gi-no-anh-huong-the-nao-den-thu-tu-load-modu
position: backend
technology: modules---top-level-await
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Top-level await trong ES modules là gì? Nó ảnh hưởng thế nào đến thứ tự load module?

## Question (EN)
What is top-level await in ES modules, and how does it affect module load order?

## Đáp án chi tiết (VI)
$89

## Detailed Answer (EN)
Top-level await lets you use `await` **directly at module scope** (outside an async function), only in **ES modules** — not in CommonJS or classic scripts.\
\
```js\
// db.js — ES module\
const conn = await connect(process.env.DB_URL);\
export { conn };\
```\
\
**Effect on load order:** a module with top-level await becomes an **async module**. Any module that `import`s it **waits** for it to settle before running its own body — the dependency graph serializes automatically. Picture the parent module \\"pausing\\" until every async dependency is ready.\
\
**Good for:**\
- Async initialization (DB connection, fetching config) right in the module.\
- Conditional dynamic import: `const mod = await import(cond ? './a.js' : './b.js')`.\
- Resource fallback: `await import('./fast.js').catch(() =\u003e import('./slow.js'))`.\
\
**Gotcha:** a slow or hanging await **blocks** the whole downstream import tree from starting — don't put heavy/non-critical work at top level. A rejection at top-level await fails the module's evaluation.
