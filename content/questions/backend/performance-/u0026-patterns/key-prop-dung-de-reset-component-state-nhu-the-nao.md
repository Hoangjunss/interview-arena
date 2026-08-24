---
id: key-prop-dung-de-reset-component-state-nhu-the-nao
position: backend
technology: performance-\u0026-patterns
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Key prop dùng để reset component state như thế nào?

## Question (EN)
How can the key prop be used to reset component state?

## Đáp án chi tiết (VI)
Thay đổi key của component khiến React unmount component cũ và mount component mới hoàn toàn, reset tất cả state. Kỹ thuật hữu ích để: reset form sau submit `\u003cForm key={formKey} /\u003e`, reset uncontrolled component khi data source thay đổi. Đây là cách React có ý muốn để 'reset' component state từ bên ngoài.

## Detailed Answer (EN)
Changing a component's key causes React to unmount the old instance and mount a completely new one, resetting all state. This is useful for: resetting a form after submission `\u003cForm key={formKey} /\u003e`, or resetting an uncontrolled component when its data source changes. This is the intentional React pattern for resetting a component's state from outside.
