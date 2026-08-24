---
id: cach-xu-ly-authentication-trong-playwright-e2e-tests
position: backend
technology: frameworks
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cách xử lý authentication trong Playwright E2E tests?

## Question (EN)
How do you handle authentication in Playwright E2E tests?

## Đáp án chi tiết (VI)
Playwright dùng storageState để lưu và tái sử dụng trạng thái đăng nhập giữa các test — tránh login lặp lại.\
\
- **globalSetup** — chạy một lần trước toàn bộ test: login qua UI hoặc API rồi lưu `await context.storageState({ path: 'auth/user.json' })`.\
- **Reuse** — trong `playwright.config.ts`: `use: { storageState: 'auth/user.json' }` — mỗi test bắt đầu ở trạng thái đã đăng nhập.\
- **Nhiều role** — lưu storageState riêng cho admin, user thường, guest; dùng `projects` trong config để chạy cùng bộ test với các role khác nhau.\
- **Auth qua API nhanh hơn UI login** — `await request.post('/api/login', { data: { email, password } })` rồi `page.context().addCookies([...])` — tránh flakiness của UI.\
- **Fixtures** — `test.extend({ loggedInPage: async ({ page }, use) =\u003e { await loginUser(page); await use(page) } })` — pre-setup state, gọn và composable.\
- **Test độc lập** — mỗi test không phụ thuộc state của test trước; reset state trong beforeEach.

## Detailed Answer (EN)
Playwright uses storageState to save and reuse authentication state between tests — avoiding repeated logins.\
\
- **globalSetup** — runs once before all tests: log in via UI or API, then save `await context.storageState({ path: 'auth/user.json' })`.\
- **Reuse** — in `playwright.config.ts`: `use: { storageState: 'auth/user.json' }` — every test starts already authenticated.\
- **Multiple roles** — save separate storageStates for admin, regular user, guest; use `projects` in the config to run the same tests with different roles.\
- **API-based auth is faster than UI login** — `await request.post('/api/login', { data: { email, password } })` then `page.context().addCookies([...])` — avoids UI flakiness.\
- **Fixtures** — `test.extend({ loggedInPage: async ({ page }, use) =\u003e { await loginUser(page); await use(page) } })` — pre-set state, concise and composable.\
- **Independent tests** — no test should depend on state from a previous test; reset state in beforeEach.
