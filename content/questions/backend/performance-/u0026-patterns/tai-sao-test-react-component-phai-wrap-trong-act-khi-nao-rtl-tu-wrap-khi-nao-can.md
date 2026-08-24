---
id: tai-sao-test-react-component-phai-wrap-trong-act-khi-nao-rtl-tu-wrap-khi-nao-can
position: backend
technology: performance-\u0026-patterns
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao test React component phải wrap trong `act()`? Khi nào RTL tự wrap, khi nào cần `waitFor`/`findBy`?

## Question (EN)
Why must React component tests be wrapped in `act()`? When does RTL wrap automatically, and when should you use `waitFor`/`findBy`?

## Đáp án chi tiết (VI)
**`act()`** đảm bảo React **flush mọi state update + effect** trước khi assertion chạy — mô phỏng đúng behavior browser. Không có `act` → console warning \\"An update was not wrapped in act(...)\\" và assertion có thể đọc state cũ.\
\
**React Testing Library tự wrap `act()` cho bạn** trong: `render()`, `userEvent`, `fireEvent`. Đa số case **không cần gọi `act()` thủ công**.\
\
```jsx\
import { render, screen, fireEvent } from '@testing-library/react'\
\
// BAD: Double-wrap không cần — fireEvent đã wrap act\
act(() =\u003e { fireEvent.click(button) })\
\
// OK: Standard\
fireEvent.click(button)\
expect(screen.getByText('Updated')).toBeInTheDocument()\
\
// OK: Async update — KHÔNG dùng manual act(async () =\u003e {})\
// Thay bằng findBy* hoặc waitFor (đã handle act + retry)\
const item = await screen.findByText('Loaded')\
\
await waitFor(() =\u003e {\
  expect(api.fetch).toHaveBeenCalled()\
})\
```\
\
**Quy tắc:** nếu thấy warning \\"not wrapped in act\\

## Detailed Answer (EN)
**`act()`** ensures React **flushes all state updates + effects** before assertions run — mimicking real browser behavior. Without it → \\"An update was not wrapped in act(...)\\" warning, and assertions may read stale state.\
\
**React Testing Library wraps `act()` for you** inside: `render()`, `userEvent`, `fireEvent`. In most cases you do **not need to call `act()` manually**.\
\
```jsx\
import { render, screen, fireEvent } from '@testing-library/react'\
\
// BAD: Unnecessary double-wrap — fireEvent already wraps act\
act(() =\u003e { fireEvent.click(button) })\
\
// OK: Standard\
fireEvent.click(button)\
expect(screen.getByText('Updated')).toBeInTheDocument()\
\
// OK: Async updates — do NOT use manual act(async () =\u003e {})\
// Use findBy* or waitFor (they handle act + retry)\
const item = await screen.findByText('Loaded')\
\
await waitFor(() =\u003e {\
  expect(api.fetch).toHaveBeenCalled()\
})\
```\
\
**Rule:** if you see \\"not wrapped in act\\" warnings, the cause is usually a missing `await` on an async query — not a missing `act()` call.
