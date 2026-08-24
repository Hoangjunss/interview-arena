---
id: web-accessibility-a11y-vai-tro-cua-semantic-html-va-aria
position: backend
technology: accessibility
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Web accessibility (a11y): vai trò của semantic HTML và ARIA?

## Question (EN)
Web accessibility (a11y): what are the roles of semantic HTML and ARIA?

## Đáp án chi tiết (VI)
**Semantic HTML trước tiên**: `\u003cbutton\u003e`, `\u003ca\u003e`, `\u003cnav\u003e`, `\u003cmain\u003e`, `\u003clabel\u003e`, heading đúng cấp — chúng có sẵn **role**, focus, điều khiển bàn phím, và ý nghĩa cho screen reader. Quy tắc ARIA số 1: **đừng dùng ARIA nếu đã có element HTML gốc làm được** (một `\u003cdiv onClick\u003e` không bằng một `\u003cbutton\u003e`).\
\
**ARIA** (Accessible Rich Internet Applications) bổ sung ngữ nghĩa khi buộc phải dùng element phi ngữ nghĩa hoặc widget động: `role`, `aria-label`, `aria-expanded`, `aria-hidden`, `aria-live`.\
\
Điểm mấu chốt: ARIA chỉ đổi **accessibility tree**, **không** tự thêm hành vi → bạn vẫn phải tự xử lý keyboard và focus. Cơ bản khác: `alt` cho ảnh, `\u003clabel\u003e` cho input, focus nhìn thấy được, tương phản màu đủ.

## Detailed Answer (EN)
**Semantic HTML first**: `\u003cbutton\u003e`, `\u003ca\u003e`, `\u003cnav\u003e`, `\u003cmain\u003e`, `\u003clabel\u003e`, properly ranked headings — these come with built-in **roles**, focus, keyboard control, and meaning for screen readers. ARIA rule #1: **do not use ARIA if a native HTML element already does the job** (a `\u003cdiv onClick\u003e` is not a `\u003cbutton\u003e`).\
\
**ARIA** (Accessible Rich Internet Applications) adds semantics when you are forced to use a non-semantic element or a dynamic widget: `role`, `aria-label`, `aria-expanded`, `aria-hidden`, `aria-live`.\
\
The crux: ARIA only changes the **accessibility tree**, it adds **no** behavior → you still wire up keyboard and focus yourself. Other basics: `alt` on images, `\u003clabel\u003e` on inputs, visible focus, sufficient color contrast.
