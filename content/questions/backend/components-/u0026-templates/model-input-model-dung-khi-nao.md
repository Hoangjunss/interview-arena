---
id: model-input-model-dung-khi-nao
position: backend
technology: components-\u0026-templates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Model input `model()` dùng khi nào?

## Question (EN)
When should you use model input `model()`?

## Đáp án chi tiết (VI)
`model()` định nghĩa input có thể ghi, đồng thời tạo output `\u003cname\u003eChange` để hỗ trợ two-way binding cho custom component.\
\
Ví dụ checkbox tự emit thay đổi:\
```typescript\
@Component({ template: `\u003cbutton (click)=\\"checked.update(v =\u003e !v)\\"\u003e{{ checked() }}\u003c/button\u003e` })\
export class ToggleButton {\
  checked = model(false)\
}\
```\
Dùng cho component chỉnh sửa một giá trị như checkbox/date picker; nếu component chỉ render dữ liệu, dùng `input()` read-only rõ hơn.

## Detailed Answer (EN)
`model()` defines a writable input and also creates a `\u003cname\u003eChange` output to support two-way binding for custom components.\
\
Example checkbox-like component:\
```typescript\
@Component({ template: `\u003cbutton (click)=\\"checked.update(v =\u003e !v)\\"\u003e{{ checked() }}\u003c/button\u003e` })\
export class ToggleButton {\
  checked = model(false)\
}\
```\
Use it for components that edit one value, such as checkboxes/date pickers; if a component only renders data, read-only `input()` is clearer.
