---
id: dynamic-form-fields-them-xoa-input-fields-duoc-implement-nhu-the-nao
position: backend
technology: forms-\u0026-error
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dynamic form fields (thêm xóa input fields) được implement như thế nào?

## Question (EN)
How do you implement dynamic form fields (add/remove inputs)?

## Đáp án chi tiết (VI)
Lưu array of field objects trong state. Render với map, mỗi field có unique id làm key. Thêm: `setFields(prev =\u003e [...prev, { id: uuid(), value: '' }])`. Xóa: `setFields(prev =\u003e prev.filter(f =\u003e f.id !== id))`. React Hook Form cung cấp useFieldArray hook xử lý pattern này với performance tốt hơn.

## Detailed Answer (EN)
Store an array of field objects in state. Render them with map, giving each a unique id as the key. Add: `setFields(prev =\u003e [...prev, { id: uuid(), value: '' }])`. Remove: `setFields(prev =\u003e prev.filter(f =\u003e f.id !== id))`. React Hook Form provides the useFieldArray hook that handles this pattern with better performance.
