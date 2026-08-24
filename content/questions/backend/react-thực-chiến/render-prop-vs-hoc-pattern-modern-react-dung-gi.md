---
id: render-prop-vs-hoc-pattern-modern-react-dung-gi
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Render prop vs HOC pattern. Modern React dùng gì?

## Question (EN)
Render prop vs HOC pattern. What does modern React use instead?

## Đáp án chi tiết (VI)
Render prop là pattern component nhận một function làm prop (hoặc children) và gọi function đó với dữ liệu cần thiết để render UI. HOC (Higher-Order Component) là function nhận một component và trả về component mới đã được bổ sung logic. Cả hai đều giúp tái sử dụng logic, nhưng dễ gây wrapper hell khi lồng nhiều tầng và khó debug.\
\
Trong React hiện đại, Custom Hook là giải pháp thay thế tốt hơn vì cho phép chia sẻ logic trực tiếp mà không cần bọc thêm component, code phẳng và dễ đọc hơn. Tuy nhiên render prop và HOC vẫn xuất hiện trong nhiều thư viện cũ nên cần hiểu để đọc code.

## Detailed Answer (EN)
Render props: a component accepts a function as a prop (or as children) and calls it with the data needed to render UI. HOC (Higher-Order Component): a function that takes a component and returns a new component with added logic. Both enable logic reuse but can cause wrapper hell with deep nesting and are hard to debug. In modern React, Custom Hooks are the preferred replacement — they share logic directly without adding component layers, resulting in flatter, more readable code. Render props and HOCs still appear in older libraries, so understanding them is important for reading legacy code.
