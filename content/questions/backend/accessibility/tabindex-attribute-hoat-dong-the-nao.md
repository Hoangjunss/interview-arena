---
id: tabindex-attribute-hoat-dong-the-nao
position: backend
technology: accessibility
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
tabindex attribute hoạt động thế nào?

## Question (EN)
How does the tabindex attribute work?

## Đáp án chi tiết (VI)
`tabindex` quyết định element có nằm trong thứ tự Tab hay không.\
\
```html\
\u003cdiv tabindex=\\"0\\"\u003eTab tới được, theo đúng thứ tự DOM\u003c/div\u003e\
\u003cdiv tabindex=\\"-1\\" id=\\"panel\\"\u003eKhông tab tới, nhưng focus bằng JS được\u003c/div\u003e\
\u003cbutton tabindex=\\"3\\"\u003eÉp lên trước — nên tránh\u003c/button\u003e\
```\
\
| Giá trị | Vào tab order | `element.focus()` |\
|---|---|---|\
| `0` | có, theo thứ tự DOM | được |\
| `-1` | không | **được** |\
| `\u003e 0` | có, **nhảy lên trước tất cả** | được |\
\
Link, button, input, select, textarea **đã focus được sẵn** — thêm `tabindex=\\"0\\"` là thừa.\
\
Dùng `-1` cho những chỗ cần đưa focus tới bằng code nhưng không nên có trong luồng Tab:\
\
```js\
// sau khi chuyển route trong SPA\
document.getElementById('page-title').focus()   // element đó có tabindex=\\"-1\\"\
```\
\
**Lưu ý:** `tabindex` dương làm **thứ tự Tab lệch hẳn khỏi thứ tự nhìn thấy**. Chỉ cần một element `tabindex=\\"1\\"` là toàn bộ trang bị xáo: nó được duyệt trước mọi element `tabindex=\\"0\\"`, kể cả những element đứng trên nó. Muốn đổi thứ tự thì sửa thứ tự DOM.

## Detailed Answer (EN)
`tabindex` decides whether an element participates in the Tab order.\
\
```html\
\u003cdiv tabindex=\\"0\\"\u003eTabbable, in DOM order\u003c/div\u003e\
\u003cdiv tabindex=\\"-1\\" id=\\"panel\\"\u003eNot tabbable, but focusable from JS\u003c/div\u003e\
\u003cbutton tabindex=\\"3\\"\u003eForced early — avoid this\u003c/button\u003e\
```\
\
| Value | In tab order | `element.focus()` |\
|---|---|---|\
| `0` | yes, in DOM order | yes |\
| `-1` | no | **yes** |\
| `\u003e 0` | yes, **jumps ahead of everything** | yes |\
\
Links, buttons, inputs, selects and textareas are **already focusable** — adding `tabindex=\\"0\\"` to them is noise.\
\
Use `-1` where code needs to move focus but the Tab flow should not include it:\
\
```js\
// after an SPA route change\
document.getElementById('page-title').focus()   // that element has tabindex=\\"-1\\"\
```\
\
**Note:** a positive `tabindex` **detaches the Tab order from the visual order**. One `tabindex=\\"1\\"` reorders the whole page: it is visited before every `tabindex=\\"0\\"` element, including ones above it. If you need a different order, change the DOM order.
