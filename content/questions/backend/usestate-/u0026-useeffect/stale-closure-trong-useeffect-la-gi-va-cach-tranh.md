---
id: stale-closure-trong-useeffect-la-gi-va-cach-tranh
position: backend
technology: usestate-\u0026-useeffect
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Stale closure trong useEffect là gì và cách tránh?

## Question (EN)
What is a stale closure in useEffect and how do you avoid it?

## Đáp án chi tiết (VI)
Stale closure xảy ra khi effect capture giá trị cũ của state hoặc props vì closure bị tạo lúc render trước. Giải pháp: thêm dependencies bị thiếu vào array, dùng useRef để lưu giá trị mới nhất không cần re-run effect, hoặc dùng functional updater `setState(prev =\u003e ...)` để không cần reference state trong closure.

## Detailed Answer (EN)
A stale closure occurs when an effect captures an outdated value of state or props because the closure was created during a previous render. Solutions: add the missing values to the dependency array, use useRef to always access the latest value without re-running the effect, or use the functional updater form `setState(prev =\u003e ...)` so you do not need to reference state inside the closure.
