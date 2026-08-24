---
id: array-fromasync-es2024-khac-array-from-va-promise-all-nhu-the-nao
position: backend
technology: es2024---async
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Array.fromAsync() (ES2024) khác Array.from() và Promise.all() như thế nào?

## Question (EN)
How does Array.fromAsync() (ES2024) differ from Array.from() and Promise.all()?

## Đáp án chi tiết (VI)
`Array.fromAsync()` xây một mảng từ **async iterable** (hoặc sync iterable chứa promise), trả về một **Promise**.\
\
- Lặp **tuần tự** và `await` từng phần tử — khác `Promise.all()` chạy song song. Hợp khi nguồn là stream/paginated và bạn muốn xử lý lần lượt.\
- Hỗ trợ async iterator (`Symbol.asyncIterator`), thứ mà `Array.from()` không xử lý được.\
\
```js\
async function* gen() { yield 1; yield 2; yield 3; }\
await Array.fromAsync(gen());            // [1, 2, 3]\
\
// có mapFn (cũng được await)\
await Array.fromAsync([p1, p2], async (x) =\u003e x * 2);\
```\
\
**So sánh nhanh:**\
- `Array.from(iter, fn)` — đồng bộ, không await.\
- `Promise.all([...])` — song song, cần sẵn mảng promise.\
- `Array.fromAsync` — **tuần tự**, await từng cái, nhận cả async iterable.\
\
**Lưu ý:** vì tuần tự nên chậm hơn `Promise.all` khi các tác vụ độc lập — chọn theo nhu cầu thứ tự vs tốc độ.

## Detailed Answer (EN)
`Array.fromAsync()` builds an array from an **async iterable** (or a sync iterable of promises) and returns a **Promise**.\
\
- Iterates **sequentially**, awaiting each element — unlike `Promise.all()`, which runs in parallel. Good for streamed/paginated sources processed one at a time.\
- Handles async iterators (`Symbol.asyncIterator`), which `Array.from()` cannot.\
\
```js\
async function* gen() { yield 1; yield 2; yield 3; }\
await Array.fromAsync(gen());            // [1, 2, 3]\
\
await Array.fromAsync([p1, p2], async (x) =\u003e x * 2);\
```\
\
**Quick contrast:**\
- `Array.from(iter, fn)` — sync, no await.\
- `Promise.all([...])` — parallel, needs an array of promises ready.\
- `Array.fromAsync` — **sequential**, awaits each, accepts async iterables.\
\
**Note:** being sequential, it's slower than `Promise.all` for independent tasks — choose by ordering vs speed.
