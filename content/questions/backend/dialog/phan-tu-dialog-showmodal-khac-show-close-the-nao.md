---
id: phan-tu-dialog-showmodal-khac-show-close-the-nao
position: backend
technology: dialog
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phần tử `\u003cdialog\u003e`: `showModal()` khác `show()` / `close()` thế nào?

## Question (EN)
The `\u003cdialog\u003e` element: how does `showModal()` differ from `show()` / `close()`?

## Đáp án chi tiết (VI)
Phần tử `\u003cdialog\u003e` mở được ở **hai chế độ**:\
\
- **`showModal()`** — mở dạng **modal**: đưa dialog lên **top layer**, có pseudo-element `::backdrop` phủ nền, **bẫy focus** trong dialog, nhấn **Esc** để đóng, và phần nền trở nên **inert** (không tương tác được).\
- **`show()`** — mở dạng **non-modal**: không có backdrop, không bẫy focus, không đóng bằng Esc; nền vẫn tương tác bình thường (kiểu popover cạnh nội dung).\
\
`close([value])` đóng dialog ở cả hai chế độ và có thể gán `returnValue`; nút `\u003cbutton\u003e` trong `\u003cform method=\\"dialog\\"\u003e` cũng tự đóng và ghi giá trị.\
\
```js\
dlg.showModal()   // modal + backdrop + focus trap\
dlg.close(\\"ok\\")   // đóng, dlg.returnValue === \\"ok\\"\
```

## Detailed Answer (EN)
A `\u003cdialog\u003e` opens in **two modes**:\
\
- **`showModal()`** — opens as a **modal**: promotes the dialog to the **top layer**, renders a `::backdrop` behind it, **traps focus** inside, closes on **Esc**, and makes the rest of the page **inert** (non-interactive).\
- **`show()`** — opens as **non-modal**: no backdrop, no focus trap, no Esc-to-close; the page stays interactive (popover-style beside content).\
\
`close([value])` closes either mode and can set `returnValue`; a `\u003cbutton\u003e` inside `\u003cform method=\\"dialog\\"\u003e` also closes it and records the value.\
\
```js\
dlg.showModal()   // modal + backdrop + focus trap\
dlg.close(\\"ok\\")   // closes, dlg.returnValue === \\"ok\\"\
```
