---
id: semantic-html-la-gi-tai-sao-quan-trong
position: backend
technology: semantic
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Semantic HTML là gì? Tại sao quan trọng?

## Question (EN)
What is semantic HTML? Why does it matter?

## Đáp án chi tiết (VI)
Semantic HTML là dùng thẻ **mô tả đúng vai trò nội dung** thay vì `\u003cdiv\u003e`/`\u003cspan\u003e` trung tính.\
\
```html\
\u003c!-- không semantic --\u003e\
\u003cdiv class=\\"header\\"\u003e\
  \u003cdiv class=\\"nav\\"\u003e...\u003c/div\u003e\
\u003c/div\u003e\
\u003cdiv class=\\"content\\"\u003e\
  \u003cdiv class=\\"post\\"\u003e...\u003c/div\u003e\
\u003c/div\u003e\
\
\u003c!-- semantic --\u003e\
\u003cheader\u003e\
  \u003cnav\u003e...\u003c/nav\u003e\
\u003c/header\u003e\
\u003cmain\u003e\
  \u003carticle\u003e...\u003c/article\u003e\
\u003c/main\u003e\
```\
\
Bốn lý do nó đáng giá:\
1. **Accessibility** — screen reader nhảy thẳng tới landmark (`main`, `nav`, `header`); với `\u003cdiv\u003e` thì không có gì để nhảy tới.\
2. **SEO** — search engine hiểu đâu là nội dung chính, đâu là điều hướng.\
3. **Bảo trì** — đọc cấu trúc là hiểu, không phải dò tên class.\
4. **Hành vi mặc định** — `\u003cbutton\u003e` có sẵn focus, Enter/Space, trạng thái disabled; `\u003cdiv onclick\u003e` phải tự làm lại tất cả.\
\
**Chốt:** thẻ semantic bị hỏi nhiều nhất trong phỏng vấn không phải `\u003carticle\u003e` mà là `\u003cbutton\u003e` vs `\u003cdiv onclick\u003e` — trả lời được ý số 4 là ăn điểm.

## Detailed Answer (EN)
Semantic HTML means using tags that **describe the role of the content** instead of neutral `\u003cdiv\u003e`/`\u003cspan\u003e`.\
\
```html\
\u003c!-- not semantic --\u003e\
\u003cdiv class=\\"header\\"\u003e\
  \u003cdiv class=\\"nav\\"\u003e...\u003c/div\u003e\
\u003c/div\u003e\
\u003cdiv class=\\"content\\"\u003e\
  \u003cdiv class=\\"post\\"\u003e...\u003c/div\u003e\
\u003c/div\u003e\
\
\u003c!-- semantic --\u003e\
\u003cheader\u003e\
  \u003cnav\u003e...\u003c/nav\u003e\
\u003c/header\u003e\
\u003cmain\u003e\
  \u003carticle\u003e...\u003c/article\u003e\
\u003c/main\u003e\
```\
\
Four reasons it pays off:\
1. **Accessibility** — a screen reader can jump straight to a landmark (`main`, `nav`, `header`); with `\u003cdiv\u003e` there is nothing to jump to.\
2. **SEO** — search engines can tell the main content from the navigation.\
3. **Maintainability** — the structure reads as documentation; no need to decode class names.\
4. **Built-in behaviour** — `\u003cbutton\u003e` already has focus, Enter/Space handling and a disabled state; `\u003cdiv onclick\u003e` has to reimplement all of it.\
\
**Takeaway:** the semantic element interviewers ask about most is not `\u003carticle\u003e` but `\u003cbutton\u003e` vs `\u003cdiv onclick\u003e` — point 4 is what earns the mark.
