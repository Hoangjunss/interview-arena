---
id: derived-state-la-gi-va-nhung-van-de-thuong-gap
position: backend
technology: props-\u0026-state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Derived state là gì và những vấn đề thường gặp?

## Question (EN)
What is derived state and what are the common pitfalls?

## Đáp án chi tiết (VI)
**Derived State** là những state được tính toán (bắt nguồn) từ `props` truyền vào.\
\
**Vấn đề thường gặp (Anti-pattern):**\
Nhiều lập trình viên có thói quen copy `props` vào `state` (ví dụ: gán `useState(props.data)`) hoặc lạm dụng `getDerivedStateFromProps` / `useEffect` để đồng bộ data. Điều này rất dễ gây ra bug khi `props` thay đổi nhưng `state` không được cập nhật kịp thời, dẫn đến UI bị \\"mất đồng bộ\\".\
\
**Giải pháp React khuyến nghị:**\
- **Tính toán trực tiếp trong lúc render:** Nếu tính toán đơn giản, hãy tính thẳng nó ra một biến trước hàm `return`.\
- **Sử dụng `useMemo`:** Nếu tính toán nặng, hãy dùng `useMemo` để cache lại kết quả dựa trên `props`.\
- **Dùng `key` để reset state:** Nếu bạn thực sự muốn reset lại toàn bộ state nội bộ của một component khi `props` (như `id`) thay đổi, hãy truyền `key={id}` cho component đó.

## Detailed Answer (EN)
**Derived State** is state that is computed (derived) from incoming `props`.\
\
**Common Pitfalls (Anti-pattern):**\
Many developers have a habit of copying `props` into `state` (e.g., initializing `useState(props.data)`) or misusing `getDerivedStateFromProps` / `useEffect` to sync data. This often leads to bugs where `props` change but the `state` doesn't update properly, causing an out-of-sync UI.\
\
**React Recommended Solutions:**\
- **Compute directly during render:** If the calculation is simple, just compute it directly into a variable before the `return` statement.\
- **Use `useMemo`:** If the calculation is expensive, wrap it in `useMemo` to cache the result based on the `props`.\
- **Use `key` to reset state:** If you actually need to completely reset a component's internal state when a prop (like an `id`) changes, pass a `key={id}` to that component.
