---
id: su-kien-dom-lan-truyen-the-nao-capturing-va-bubbling-event-delegation-la-gi
position: backend
technology: dom-events
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự kiện DOM lan truyền thế nào (capturing và bubbling)? Event delegation là gì?

## Question (EN)
How do DOM events propagate (capturing vs bubbling)? What is event delegation?

## Đáp án chi tiết (VI)
Một sự kiện đi qua **3 pha**: **capturing** (từ `window` đi xuống phần tử đích), **target** (tại chính phần tử), rồi **bubbling** (nổi ngược lên `window`). Mặc định `addEventListener` nghe ở pha bubbling; truyền `{ capture: true }` để nghe ở pha đi xuống.\
\
**Event delegation** là gắn **một** listener ở phần tử cha rồi dựa vào bubbling để xử lý cho toàn bộ con.\
\
```js\
document.querySelector('#list').addEventListener('click', (e) =\u003e {\
  const btn = e.target.closest('[data-id]')\
  if (!btn) return\
  remove(btn.dataset.id)\
})\
```\
\
**Lợi ích:** ít listener hơn (nhẹ bộ nhớ), và **item thêm động sau đó vẫn chạy** mà không phải gắn lại listener — đây là lý do chính người ta dùng nó cho danh sách render động.\
\
Phân biệt hai hàm hay bị nhầm:\
- `e.stopPropagation()` — chặn sự kiện lan tiếp lên cha.\
- `e.preventDefault()` — chặn hành vi mặc định (submit form, mở link), sự kiện **vẫn lan tiếp**.\
\
Lưu ý: `focus`, `blur`, `mouseenter` **không bubble**; dùng `focusin`/`focusout`/`mouseover` nếu cần delegate.

## Detailed Answer (EN)
$85
