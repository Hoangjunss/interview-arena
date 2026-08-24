---
id: heading-hierarchy-h1-h6-tai-sao-quan-trong
position: backend
technology: accessibility
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Heading hierarchy (h1-h6) tại sao quan trọng?

## Question (EN)
Why is the heading hierarchy (h1-h6) important?

## Đáp án chi tiết (VI)
Heading không phải để chỉnh cỡ chữ — nó là **mục lục của trang**.\
\
Người dùng screen reader duyệt trang chủ yếu bằng cách nhảy giữa các heading (phím `H` trong NVDA/JAWS, rotor trong VoiceOver). Cấp heading sai làm mục lục đó sai.\
\
```html\
\u003c!-- ĐÚNG: liên tục, không nhảy cấp --\u003e\
\u003ch1\u003eHướng dẫn tối ưu hiệu năng React\u003c/h1\u003e\
  \u003ch2\u003eĐo trước khi tối ưu\u003c/h2\u003e\
    \u003ch3\u003eReact Profiler\u003c/h3\u003e\
  \u003ch2\u003eGiảm re-render\u003c/h2\u003e\
\
\u003c!-- SAI: nhảy từ h1 xuống h3 vì \\"h3 nhìn vừa mắt hơn\\" --\u003e\
\u003ch1\u003eTiêu đề\u003c/h1\u003e\
  \u003ch3\u003eMục con\u003c/h3\u003e\
```\
\
Quy tắc:\
- **Một `\u003ch1\u003e` cho mỗi trang**, là chủ đề chính.\
- Chỉ **xuống một cấp** mỗi lần; lên thì nhảy mấy cấp cũng được.\
- Cần chữ nhỏ hơn thì **dùng CSS**, đừng đổi cấp heading.\
\
```css\
h2.section-title { font-size: 1rem; }   /* đúng cấp, đúng cỡ */\
```\
\
**Lưu ý:** dùng `\u003cdiv class=\\"title\\"\u003e` cho tiêu đề vì không muốn style mặc định — với screen reader, trang đó **không có mục lục nào cả**.\
\
**Chốt:** `\u003ch1\u003e` không bắt buộc là dòng đầu tiên nhìn thấy, nhưng phải là nội dung quan trọng nhất của trang.

## Detailed Answer (EN)
$82
