---
id: trong-app-router-tai-sao-css-in-js-runtime-styled-components-emotion-gap-kho-voi
position: backend
technology: styling
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong App Router, tại sao CSS-in-JS runtime (styled-components, Emotion) gặp khó với Server Components, còn CSS Modules và Tailwind thì không?

## Question (EN)
In App Router, why do runtime CSS-in-JS libraries (styled-components, Emotion) struggle with Server Components while CSS Modules and Tailwind don't?

## Đáp án chi tiết (VI)
**CSS Modules và Tailwind** xử lý style **lúc build** (compile ra file CSS tĩnh) → hoạt động tự nhiên với Server Components, không cần JS runtime ở client. Đây là lựa chọn khuyến nghị cho App Router.\
\
```tsx\
// CSS Module — chạy thẳng trong Server Component\
import styles from './card.module.css'\
export default function Card() {\
  return \u003cdiv className={styles.card}\u003e...\u003c/div\u003e\
}\
```\
\
**CSS-in-JS runtime (styled-components, Emotion)** sinh CSS **lúc render bằng JS**, dựa vào React context và `useState`/hooks ở client. Mà **Server Components không chạy hooks và không gửi JS xuống client** → thư viện không thể inject style đúng, dễ lỗi style nhấp nháy (FOUC) khi SSR.\
\
**Giải pháp nếu vẫn muốn dùng:** chỉ dùng trong Client Component (`'use client'`) và cấu hình một **style registry** với `useServerInsertedHTML` để inject CSS lúc SSR. Phức tạp hơn hẳn — nên với App Router, ưu tiên Tailwind / CSS Modules.

## Detailed Answer (EN)
**CSS Modules and Tailwind** process styles **at build time** (compiling to a static CSS file) → they work naturally with Server Components, no client JS runtime needed. This is the recommended approach for App Router.\
\
```tsx\
// CSS Module — works directly in a Server Component\
import styles from './card.module.css'\
export default function Card() {\
  return \u003cdiv className={styles.card}\u003e...\u003c/div\u003e\
}\
```\
\
**Runtime CSS-in-JS (styled-components, Emotion)** generates CSS **at render time using JS**, relying on React context and `useState`/hooks on the client. But **Server Components don't run hooks and don't ship JS to the client** → the library can't inject styles correctly, causing FOUC during SSR.\
\
**Workaround if you must:** use it only inside a Client Component (`'use client'`) and configure a **style registry** with `useServerInsertedHTML` to inject CSS during SSR. Considerably more complex — so for App Router, prefer Tailwind / CSS Modules.
