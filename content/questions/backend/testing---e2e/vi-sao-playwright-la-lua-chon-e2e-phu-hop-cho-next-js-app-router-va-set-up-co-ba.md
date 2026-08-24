---
id: vi-sao-playwright-la-lua-chon-e2e-phu-hop-cho-next-js-app-router-va-set-up-co-ba
position: backend
technology: testing---e2e
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao Playwright là lựa chọn E2E phù hợp cho Next.js App Router, và set up cơ bản trông như thế nào?

## Question (EN)
Why is Playwright a good E2E choice for Next.js App Router, and what does a basic setup look like?

## Đáp án chi tiết (VI)
Playwright chạy app **trong trình duyệt thật** (Chromium/Firefox/WebKit), nên nó test đúng những gì người dùng thấy — kể cả **Server Components, streaming, Server Actions** mà unit test không chạm tới được.\
\
**Hình dung:** Playwright là một con bot mở browser, click và đọc DOM như người dùng; còn Jest chỉ render component trong bộ nhớ.\
\
```ts\
// e2e/home.spec.ts\
import { test, expect } from '@playwright/test'\
\
test('trang chủ hiển thị tiêu đề', async ({ page }) =\u003e {\
  await page.goto('http://localhost:3000')\
  await expect(page.getByRole('heading', { name: /Luyện phỏng vấn/ })).toBeVisible()\
})\
```\
\
Trong `playwright.config.ts` thường có `webServer` để Playwright tự chạy `next start` trước khi test.\
\
**Lưu ý quan trọng:** test E2E nên chạy trên **production build** (`next build \u0026\u0026 next start`), không phải dev — dev có Fast Refresh, log thừa và hành vi cache khác, dễ flaky.

## Detailed Answer (EN)
Playwright runs the app **in a real browser** (Chromium/Firefox/WebKit), so it tests exactly what users see — including **Server Components, streaming, and Server Actions** that unit tests can't reach.\
\
**Picture it:** Playwright is a bot that opens a browser, clicks, and reads the DOM like a user; Jest only renders components in memory.\
\
```ts\
// e2e/home.spec.ts\
import { test, expect } from '@playwright/test'\
\
test('home page shows the heading', async ({ page }) =\u003e {\
  await page.goto('http://localhost:3000')\
  await expect(page.getByRole('heading', { name: /Interview prep/ })).toBeVisible()\
})\
```\
\
`playwright.config.ts` usually has a `webServer` block so Playwright auto-runs `next start` before tests.\
\
**Important:** run E2E against a **production build** (`next build \u0026\u0026 next start`), not dev — dev has Fast Refresh, extra logging, and different cache behavior, which makes tests flaky.
