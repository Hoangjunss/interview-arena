---
id: lam-the-nao-de-test-custom-hooks
position: backend
technology: custom-hooks
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm thế nào để test custom hooks?

## Question (EN)
How do you test custom hooks?

## Đáp án chi tiết (VI)
Dùng @testing-library/react với `renderHook` utility: `const { result } = renderHook(() =\u003e useMyHook()); expect(result.current.value).toBe(expected)`. Để test interactions: `act(() =\u003e { result.current.setValue('new') })`. Với async hooks dùng `waitFor`. `renderHook` tạo component test wrapper để hooks có React context đầy đủ.

## Detailed Answer (EN)
Use @testing-library/react with the `renderHook` utility: `const { result } = renderHook(() =\u003e useMyHook()); expect(result.current.value).toBe(expected)`. To test interactions: `act(() =\u003e { result.current.setValue('new') })`. For async hooks use `waitFor`. `renderHook` creates a test component wrapper so hooks have full React context.
