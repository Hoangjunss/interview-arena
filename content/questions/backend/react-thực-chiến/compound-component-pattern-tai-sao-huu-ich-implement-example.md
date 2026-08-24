---
id: compound-component-pattern-tai-sao-huu-ich-implement-example
position: backend
technology: react-thực-chiến
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Compound component pattern. Tại sao hữu ích? Implement example?

## Question (EN)
The compound component pattern. Why is it useful? Show an implementation example.

## Đáp án chi tiết (VI)
Compound component là pattern trong đó component cha quản lý state nội bộ và chia sẻ cho các component con thông qua Context, tạo nên một nhóm component hoạt động cùng nhau. \
\
**Ví dụ:** \u003cTabs\u003e là cha quản lý tab đang active, \u003cTab\u003e và \u003cTabPanel\u003e là con truy cập state qua context để hiển thị đúng nội dung. Lợi ích lớn nhất là API linh hoạt — người dùng component có thể sắp xếp, thêm bớt component con tùy ý mà không cần truyền hàng loạt props phức tạp (tránh prop explosion). Pattern này phổ biến trong các thư viện UI như Radix UI, Headless UI, dùng kết hợp React.cloneElement hoặc Context.

## Detailed Answer (EN)
The compound component pattern has a parent component manage internal state and share it with child components through Context, forming a group of components that work together. \
\
**Example:** `\u003cTabs\u003e` manages the active tab; `\u003cTab\u003e` and `\u003cTabPanel\u003e` access that state via context to display the correct content. The biggest benefit is a flexible API — consumers can arrange, add, or remove child components freely without passing a long list of complex props (avoiding prop explosion). This pattern is popular in UI libraries like Radix UI and Headless UI, implemented with Context or React.cloneElement.
