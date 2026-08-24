---
id: tai-sao-async-function-luon-tra-ve-promise-goi-no-ma-khong-await-thi-chuyen-gi-x
position: backend
technology: async-function
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao `async function` luôn trả về Promise? Gọi nó mà không `await` thì chuyện gì xảy ra?

## Question (EN)
Why does an `async function` always return a Promise? What happens if you call it without `await`?

## Đáp án chi tiết (VI)
Đặc tả quy định `async function` **luôn** bọc giá trị trả về vào một Promise. `return 1` cho ra `Promise` đã fulfilled với giá trị `1`; `throw err` cho ra `Promise` đã **rejected** chứ không ném đồng bộ.\
\
```js\
async function load() {\
  return 1\
}\
console.log(load())        // Promise { 1 } — không phải 1\
console.log(await load())  // 1\
```\
\
Nếu bên trong `return` một Promise, kết quả **không** bị lồng hai lớp — Promise được \\"làm phẳng\\" (adopt), nên `await load()` vẫn ra giá trị cuối.\
\
**Gọi mà không await** (fire-and-forget):\
- Hàm vẫn chạy, code sau vẫn tiếp tục ngay lập tức.\
- Nếu hàm ném lỗi, không ai bắt → thành **unhandled rejection**. Ở Node.js mặc định làm crash process.\
- Không cách nào biết khi nào nó xong → hay gây test flaky, hoặc component đã unmount mà callback vẫn setState.\
\
Muốn cố tình fire-and-forget thì phải gắn `.catch()` để nuốt lỗi có chủ đích:\
\
```js\
void trackEvent(payload).catch((err) =\u003e console.error(err))\
```

## Detailed Answer (EN)
The spec says an `async function` **always** wraps its result in a Promise. `return 1` produces a Promise fulfilled with `1`; `throw err` produces a **rejected** Promise rather than throwing synchronously.\
\
```js\
async function load() {\
  return 1\
}\
console.log(load())        // Promise { 1 } — not 1\
console.log(await load())  // 1\
```\
\
Returning a Promise from inside does **not** create a double wrapper — the promise is adopted (flattened), so `await load()` still yields the final value.\
\
**Calling without await** (fire-and-forget):\
- The function still runs; the code after it continues immediately.\
- If it throws, nobody catches it → **unhandled rejection**. In Node.js that crashes the process by default.\
- You cannot tell when it finished → flaky tests, or callbacks that update an already-unmounted component.\
\
If fire-and-forget is intentional, attach a `.catch()` so the failure is swallowed deliberately:\
\
```js\
void trackEvent(payload).catch((err) =\u003e console.error(err))\
```
