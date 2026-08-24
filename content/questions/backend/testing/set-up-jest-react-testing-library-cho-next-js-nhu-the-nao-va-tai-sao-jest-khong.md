---
id: set-up-jest-react-testing-library-cho-next-js-nhu-the-nao-va-tai-sao-jest-khong
position: backend
technology: testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Set up Jest + React Testing Library cho Next.js như thế nào, và tại sao Jest không test trực tiếp được async Server Components?

## Question (EN)
How do you set up Jest + React Testing Library for Next.js, and why can't Jest directly test async Server Components?

## Đáp án chi tiết (VI)
Next.js cung cấp helper `next/jest` để tự lo cấu hình (transform SWC, mock CSS/ảnh, env).\
\
```js\
// jest.config.js\
const nextJest = require('next/jest')\
const createJestConfig = nextJest({ dir: './' })\
module.exports = createJestConfig({\
  testEnvironment: 'jsdom',\
  setupFilesAfterEnv: ['\u003crootDir\u003e/jest.setup.js'],\
})\
```\
\
Dùng cho **unit / component test**: render Client Component bằng RTL, query theo role, fire event.\
\
**Tại sao async Server Components là vấn đề:** chúng là **`async function` trả Promise** và có thể `await` data/`fetch` thật trên server. Jest (jsdom) không có môi trường server đầy đủ để resolve các luồng RSC này. Khuyến nghị chính thức:\
- **Server Components async** → test bằng **E2E (Playwright)** vì chúng cần môi trường server thật.\
- **Logic thuần** (helpers, sync components) → unit test với Jest.\
\
**Lưu ý:** RTL không chạy được trên Vitest/Jest cho async RSC — đừng cố mock cả pipeline, đẩy phần đó sang E2E.

## Detailed Answer (EN)
Next.js provides a `next/jest` helper that handles config for you (SWC transform, CSS/image mocks, env).\
\
```js\
// jest.config.js\
const nextJest = require('next/jest')\
const createJestConfig = nextJest({ dir: './' })\
module.exports = createJestConfig({\
  testEnvironment: 'jsdom',\
  setupFilesAfterEnv: ['\u003crootDir\u003e/jest.setup.js'],\
})\
```\
\
Use it for **unit / component tests**: render Client Components with RTL, query by role, fire events.\
\
**Why async Server Components are a problem:** they're **`async function`s returning a Promise** and may `await` real data/`fetch` on the server. Jest (jsdom) lacks a full server environment to resolve these RSC flows. Official recommendation:\
- **Async Server Components** → test with **E2E (Playwright)** since they need a real server environment.\
- **Pure logic** (helpers, sync components) → unit test with Jest.\
\
**Note:** RTL can't run async RSC under Vitest/Jest — don't try to mock the whole pipeline, push that to E2E.
