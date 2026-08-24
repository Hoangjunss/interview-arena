---
id: error-boundary-trong-react-la-gi-no-bat-duoc-loi-loai-nao
position: backend
technology: error-boundaries
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Error boundary trong React là gì? Nó bắt được lỗi loại nào?

## Question (EN)
What is a React error boundary? Which errors does it catch?

## Đáp án chi tiết (VI)
Error boundary = một **class component** cài `static getDerivedStateFromError()` và/hoặc `componentDidCatch()`, nó **bắt lỗi render của cây con** rồi hiện UI dự phòng thay vì làm sập cả app (màn trắng).\
\
**Bắt được**: lỗi khi render, trong lifecycle, và constructor của các component **con**.\
\
**KHÔNG bắt**:\
- Lỗi trong **event handler** (dùng `try/catch` thường).\
- Code **bất đồng bộ** (`setTimeout`, callback fetch).\
- Lỗi ở **SSR**.\
- Lỗi ném ra từ **chính** error boundary.\
\
React chưa có bản hook chính thức → thực tế dùng thư viện `react-error-boundary`. Đặt nhiều boundary theo tầng (route, widget) để **cô lập** sự cố cục bộ.

## Detailed Answer (EN)
An error boundary is a **class component** implementing `static getDerivedStateFromError()` and/or `componentDidCatch()`; it **catches rendering errors in its child tree** and shows fallback UI instead of crashing the whole app (blank screen).\
\
**Catches**: errors during render, in lifecycle methods, and in the constructors of **child** components.\
\
**Does NOT catch**:\
- Errors inside **event handlers** (use a normal `try/catch`).\
- **Asynchronous** code (`setTimeout`, fetch callbacks).\
- Errors during **SSR**.\
- Errors thrown in the **boundary itself**.\
\
There is no official hook version yet → in practice people use the `react-error-boundary` library. Place several boundaries by layer (route, widget) to **isolate** local failures.
