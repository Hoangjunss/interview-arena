---
id: history-api-dung-de-lam-gi
position: backend
technology: html5
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
History API dùng để làm gì?

## Question (EN)
What is the History API used for?

## Đáp án chi tiết (VI)
History API cho phép **đổi URL mà không load lại trang** — nền tảng của mọi router SPA.\
\
```js\
// thêm entry mới: nút Back quay lại được\
history.pushState({ page: 2 }, '', '/products?page=2')\
\
// thay entry hiện tại: Back bỏ qua bước này (hợp cho filter, sort)\
history.replaceState({ sort: 'price' }, '', '/products?sort=price')\
\
// browser Back/Forward bắn popstate — tự render lại theo state\
window.addEventListener('popstate', (e) =\u003e {\
  render(e.state)     // e.state là object đã truyền vào pushState\
})\
```\
\
| | `pushState` | `replaceState` |\
|---|---|---|\
| Thêm bước vào history | có | không |\
| Dùng cho | chuyển trang | cập nhật filter/tab |\
\
**Lưu ý 1:** `pushState` **không bắn `popstate`**. Gọi xong phải tự render — rất nhiều bug router đến từ chỗ này.\
\
**Lưu ý 2:** URL mới phải **cùng origin**, nếu không browser ném `SecurityError`.\
\
**Lưu ý 3:** URL đổi nhưng server phải biết phục vụ nó khi user F5 — thiếu rewrite là ra 404, lỗi thường gặp khi deploy SPA.

## Detailed Answer (EN)
$79
