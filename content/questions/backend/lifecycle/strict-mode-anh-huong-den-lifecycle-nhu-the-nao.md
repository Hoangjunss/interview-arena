---
id: strict-mode-anh-huong-den-lifecycle-nhu-the-nao
position: backend
technology: lifecycle
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Strict Mode ảnh hưởng đến lifecycle như thế nào?

## Question (EN)
How does Strict Mode affect lifecycle methods?

## Đáp án chi tiết (VI)
React.StrictMode trong development gọi một số lifecycle methods và hooks hai lần (mount, unmount, re-mount) để phát hiện side effects không thuần. componentDidMount và componentDidUpdate được gọi hai lần trong dev, nhưng một lần trong production. Hữu ích để catch bugs do side effects trong render phase.

## Detailed Answer (EN)
In development, React.StrictMode intentionally calls certain lifecycle methods and hooks twice (mount → unmount → remount) to detect impure side effects. componentDidMount and componentDidUpdate run twice in dev but only once in production. This helps catch bugs caused by side effects leaking into the render phase.
