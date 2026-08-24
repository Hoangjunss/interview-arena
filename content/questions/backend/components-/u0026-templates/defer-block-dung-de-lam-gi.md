---
id: defer-block-dung-de-lam-gi
position: backend
technology: components-\u0026-templates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`@defer` block dùng để làm gì?

## Question (EN)
What is the `@defer` block used for?

## Đáp án chi tiết (VI)
`@defer` cho phép trì hoãn load/render một phần template và dependencies của nó theo trigger như viewport, interaction, hover, timer hoặc idle.\
\
Ví dụ:\
```html\
@defer (on viewport; prefetch on idle) {\
  \u003capp-heavy-chart /\u003e\
} @placeholder {\
  \u003capp-chart-skeleton /\u003e\
} @loading {\
  \u003cp\u003eLoading chart...\u003c/p\u003e\
} @error {\
  \u003cp\u003eCannot load chart\u003c/p\u003e\
}\
```\
Dùng cho UI chưa cần ngay để giảm initial bundle và cải thiện Core Web Vitals.

## Detailed Answer (EN)
`@defer` lets you delay loading/rendering part of a template and its dependencies based on triggers such as viewport, interaction, hover, timer or idle.\
\
Example:\
```html\
@defer (on viewport; prefetch on idle) {\
  \u003capp-heavy-chart /\u003e\
} @placeholder {\
  \u003capp-chart-skeleton /\u003e\
} @loading {\
  \u003cp\u003eLoading chart...\u003c/p\u003e\
} @error {\
  \u003cp\u003eCannot load chart\u003c/p\u003e\
}\
```\
Use it for UI that is not immediately needed to reduce initial bundle size and improve Core Web Vitals.
