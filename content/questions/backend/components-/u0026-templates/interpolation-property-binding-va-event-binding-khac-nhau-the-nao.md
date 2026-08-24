---
id: interpolation-property-binding-va-event-binding-khac-nhau-the-nao
position: backend
technology: components-\u0026-templates
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Interpolation, property binding và event binding khác nhau thế nào?

## Question (EN)
How do interpolation, property binding and event binding differ?

## Đáp án chi tiết (VI)
Interpolation `{{ value }}` render text ra template.\
\
Property binding `[disabled]=\\"isSaving()\\"` set property DOM/component input theo expression. Event binding `(click)=\\"save()\\"` lắng nghe event và gọi method. Quy tắc nhanh: dùng `{{ }}` cho text, `[ ]` để đẩy dữ liệu xuống view/component con, `( )` để nhận event từ view/component con.

## Detailed Answer (EN)
Interpolation `{{ value }}` renders text in the template.\
\
Property binding `[disabled]=\\"isSaving()\\"` sets a DOM property or component input from an expression. Event binding `(click)=\\"save()\\"` listens to an event and calls a method. Quick rule: use `{{ }}` for text, `[ ]` to push data down to the view/child component, and `( )` to receive events from the view/child component.
