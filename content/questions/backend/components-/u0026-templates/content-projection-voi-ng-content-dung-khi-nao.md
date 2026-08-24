---
id: content-projection-voi-ng-content-dung-khi-nao
position: backend
technology: components-\u0026-templates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Content projection với `ng-content` dùng khi nào?

## Question (EN)
When should you use content projection with `ng-content`?

## Đáp án chi tiết (VI)
`ng-content` cho phép parent truyền markup vào layout của child component, tương tự slot.\
\
Ví dụ card có slot tiêu đề và nội dung:\
```html\
\u003cheader\u003e\u003cng-content select=\\"[card-title]\\" /\u003e\u003c/header\u003e\
\u003csection\u003e\u003cng-content /\u003e\u003c/section\u003e\
```\
```html\
\u003capp-card\u003e\
  \u003ch2 card-title\u003eProfile\u003c/h2\u003e\
  \u003capp-profile /\u003e\
\u003c/app-card\u003e\
```\
Dùng khi xây component wrapper như card, modal, tabs, layout shell, nơi child quyết định khung còn parent quyết định nội dung. Tránh API slot quá phức tạp nếu component chỉ cần vài input đơn giản.

## Detailed Answer (EN)
`ng-content` lets a parent pass markup into a child component layout, similar to slots.\
\
Example card with title and body slots:\
```html\
\u003cheader\u003e\u003cng-content select=\\"[card-title]\\" /\u003e\u003c/header\u003e\
\u003csection\u003e\u003cng-content /\u003e\u003c/section\u003e\
```\
```html\
\u003capp-card\u003e\
  \u003ch2 card-title\u003eProfile\u003c/h2\u003e\
  \u003capp-profile /\u003e\
\u003c/app-card\u003e\
```\
Use it for wrapper components such as cards, modals, tabs or layout shells, where the child controls the frame and the parent controls the content. Avoid overly complex slot APIs when a component only needs a few simple inputs.
