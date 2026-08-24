---
id: vi-sao-mo-link-tab-moi-nen-kem-rel-noopener-cung-target-blank
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao mở link tab mới nên kèm `rel=\\"noopener\\"` cùng `target=\\"_blank\\"`?

## Question (EN)
Why should opening a link in a new tab include `rel=\\"noopener\\"` with `target=\\"_blank\\"`?

## Đáp án chi tiết (VI)
Khi dùng `target=\\"_blank\\"`, trang mới nhận được tham chiếu `window.opener` trỏ ngược về trang gốc. Trang đích (nhất là link ngoài không kiểm soát) có thể lợi dụng để **`window.opener.location = \\"trang-giả\\"`** — kỹ thuật **reverse tabnabbing** (đánh tráo tab cũ sang trang lừa đảo). Ngoài ra hai tab còn chung tiến trình, ảnh hưởng hiệu năng.\
\
**`rel=\\"noopener\\"`** cắt liên kết đó: trang mới nhận `window.opener === null`. Thêm **`noreferrer`** nếu muốn ẩn luôn header `Referer`.\
\
```html\
\u003ca href=\\"https://ngoai.example\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\u003eMở\u003c/a\u003e\
```\
\
Trình duyệt hiện đại đã ngầm áp `noopener` cho `target=\\"_blank\\"`, nhưng ghi rõ vẫn là thói quen an toàn (hỗ trợ trình duyệt cũ).

## Detailed Answer (EN)
With `target=\\"_blank\\"`, the new page receives a `window.opener` reference back to the original page. A destination page (especially an untrusted external link) can abuse it via **`window.opener.location = \\"phishing-page\\"`** — the **reverse tabnabbing** attack (swapping your old tab for a fake). The two tabs may also share a process, hurting performance.\
\
**`rel=\\"noopener\\"`** severs that link: the new page gets `window.opener === null`. Add **`noreferrer`** to also strip the `Referer` header.\
\
```html\
\u003ca href=\\"https://external.example\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"\u003eOpen\u003c/a\u003e\
```\
\
Modern browsers already imply `noopener` for `target=\\"_blank\\"`, but stating it explicitly is a safe habit (supports older browsers).
