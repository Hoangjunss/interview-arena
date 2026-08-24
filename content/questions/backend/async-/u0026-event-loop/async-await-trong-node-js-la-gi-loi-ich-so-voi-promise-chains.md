---
id: async-await-trong-node-js-la-gi-loi-ich-so-voi-promise-chains
position: backend
technology: async-\u0026-event-loop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
async/await trong Node.js là gì? Lợi ích so với Promise chains?

## Question (EN)
What is async/await in Node.js? What are its advantages over Promise chains?

## Đáp án chi tiết (VI)
async/await là syntactic sugar trên Promise — `async function` luôn return Promise, `await` pause execution của function đó (không block thread) cho đến khi Promise settle. Error handling: try/catch bắt rejected Promise như exception thông thường — `try { const data = await fetch(url).then(r =\u003e r.json()); } catch(e) { /* network error, JSON parse error */ }`. Parallel execution: sequential `await a(); await b()` tổng thời gian = a + b; parallel `const [ra, rb] = await Promise.all([a(), b()])` tổng thời gian = max(a, b). Lưu ý #1 — sequential await trong loop: `for (const id of ids) { await fetchUser(id); }` chạy tuần tự, chậm. Fix: `await Promise.all(ids.map(id =\u003e fetchUser(id)))`. Lưu ý #2 — error không được handle: `async function foo() { await riskyOp(); }` gọi `foo()` mà không await/catch = unhandled rejection. Top-level await: ESM modules hỗ trợ `await` ở top level (ngoài function) — hữu ích cho dynamic imports, DB init. Khi debug: stack traces của async/await rõ ràng hơn Promise chains nhiều.

## Detailed Answer (EN)
$88
