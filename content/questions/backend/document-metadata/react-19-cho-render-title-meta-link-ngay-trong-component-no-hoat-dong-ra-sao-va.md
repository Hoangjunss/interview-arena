---
id: react-19-cho-render-title-meta-link-ngay-trong-component-no-hoat-dong-ra-sao-va
position: backend
technology: document-metadata
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React 19 cho render `\u003ctitle\u003e`, `\u003cmeta\u003e`, `\u003clink\u003e` ngay trong component. Nó hoạt động ra sao và có thay được `react-helmet` không?

## Question (EN)
React 19 lets you render `\u003ctitle\u003e`, `\u003cmeta\u003e`, `\u003clink\u003e` right inside a component. How does that work, and does it replace `react-helmet`?

## Đáp án chi tiết (VI)
Từ React 19, khi component render một thẻ `\u003ctitle\u003e`, `\u003cmeta\u003e` hoặc `\u003clink\u003e`, React **tự động nhấc thẻ đó lên `\u003chead\u003e`** của tài liệu, kể cả khi component nằm sâu trong cây.\
\
```jsx\
function ArticlePage({ post }) {\
  return (\
    \u003carticle\u003e\
      \u003ctitle\u003e{post.title}\u003c/title\u003e\
      \u003cmeta name=\\"description\\" content={post.excerpt} /\u003e\
      \u003clink rel=\\"canonical\\" href={post.url} /\u003e\
      \u003ch1\u003e{post.title}\u003c/h1\u003e\
    \u003c/article\u003e\
  )\
}\
```\
\
**Điểm cần biết:**\
- Hoạt động cả khi render phía server (thẻ nằm sẵn trong HTML trả về, crawler đọc được) lẫn client.\
- Component unmount thì React gỡ thẻ đó khỏi `\u003chead\u003e`.\
- Nếu hai nhánh cùng render `\u003ctitle\u003e`, thẻ render sau ghi đè — React **không** hợp nhất theo kiểu ưu tiên như Helmet.\
\
Với ứng dụng React thuần, nó thay được `react-helmet` cho phần lớn nhu cầu. Với Next.js App Router thì vẫn nên dùng `export const metadata` / `generateMetadata` vì Next quản lý metadata ở tầng route (dedupe, template, Open Graph image).

## Detailed Answer (EN)
From React 19, when a component renders a `\u003ctitle\u003e`, `\u003cmeta\u003e`, or `\u003clink\u003e` tag, React **automatically hoists it into the document `\u003chead\u003e`**, even if the component sits deep in the tree.\
\
```jsx\
function ArticlePage({ post }) {\
  return (\
    \u003carticle\u003e\
      \u003ctitle\u003e{post.title}\u003c/title\u003e\
      \u003cmeta name=\\"description\\" content={post.excerpt} /\u003e\
      \u003clink rel=\\"canonical\\" href={post.url} /\u003e\
      \u003ch1\u003e{post.title}\u003c/h1\u003e\
    \u003c/article\u003e\
  )\
}\
```\
\
**Things to know:**\
- It works on the server (the tag ships inside the returned HTML, so crawlers see it) as well as on the client.\
- When the component unmounts, React removes the tag from `\u003chead\u003e`.\
- If two branches render a `\u003ctitle\u003e`, the later one wins — React does **not** merge by priority the way Helmet does.\
\
For a plain React app it covers most of what `react-helmet` was used for. In the Next.js App Router, keep using `export const metadata` / `generateMetadata`, since Next manages metadata at the route level (dedupe, templates, Open Graph images).
