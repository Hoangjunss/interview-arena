---
id: vi-sao-moi-text-trong-rn-phai-nam-trong-text
position: backend
technology: core
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao mọi text trong RN phải nằm trong `\u003cText\u003e`?

## Question (EN)
Why must every piece of text in RN sit inside `\u003cText\u003e`?

## Đáp án chi tiết (VI)
Trên iOS và Android, **string không phải là một loại view**. UIView không biết cách render ký tự — chỉ `UILabel`/`TextView` mới làm được. RN buộc bạn bao text trong `\u003cText\u003e` để binding sang đúng native component.\
\
Nếu viết `\u003cView\u003eHello\u003c/View\u003e`, RN throw runtime error: *\\"Text strings must be rendered within a `\u003cText\u003e` component.\\"* Trên web, `\u003cdiv\u003eHello\u003c/div\u003e` chạy được vì DOM cho phép text node bất cứ đâu.\
\
Khác biệt phụ kéo theo:\
- Style font, color, lineHeight chỉ áp dụng được trên `\u003cText\u003e` — set trên `\u003cView\u003e` không có tác dụng.\
- `\u003cText\u003e` lồng trong `\u003cText\u003e` thì kế thừa style cha (giống `\u003cspan\u003e` trong `\u003cp\u003e`); nhưng `\u003cText\u003e` lồng trong `\u003cView\u003e` thì **không** kế thừa.\
- `numberOfLines`, `ellipsizeMode` chỉ tồn tại trên `\u003cText\u003e`.

## Detailed Answer (EN)
On iOS and Android, **a string is not a view**. UIView cannot render characters — only `UILabel`/`TextView` can. RN forces you to wrap text in `\u003cText\u003e` so it binds to the correct native component.\
\
`\u003cView\u003eHello\u003c/View\u003e` throws *\\"Text strings must be rendered within a `\u003cText\u003e` component.\\"* On the web, `\u003cdiv\u003eHello\u003c/div\u003e` works because the DOM allows text nodes anywhere.\
\
Knock-on differences:\
- Font/color/lineHeight only apply on `\u003cText\u003e` — they do nothing on `\u003cView\u003e`.\
- A `\u003cText\u003e` nested in another `\u003cText\u003e` inherits style from the parent (like `\u003cspan\u003e` in `\u003cp\u003e`); a `\u003cText\u003e` inside `\u003cView\u003e` does **not** inherit.\
- `numberOfLines` and `ellipsizeMode` exist only on `\u003cText\u003e`.
