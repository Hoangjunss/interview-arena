---
id: suspense-component-la-gi
position: backend
technology: performance
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Suspense component là gì?

## Question (EN)
What is the Suspense component?

## Đáp án chi tiết (VI)
`\u003cSuspense\u003e` cho phép render fallback content trong khi async component đang resolve — xử lý async setup():\
```vue\
\u003cSuspense\u003e\
  \u003ctemplate #default\u003e\
    \u003cAsyncDashboard /\u003e  \u003c!-- async setup() --\u003e\
  \u003c/template\u003e\
  \u003ctemplate #fallback\u003e\
    \u003cLoadingSpinner /\u003e\
  \u003c/template\u003e\
\u003c/Suspense\u003e\
```\
`AsyncDashboard` có thể có `async setup()` với await bên trong. `\u003cSuspense\u003e` catch async và show fallback cho đến khi resolve. Tích hợp với `\u003cKeepAlive\u003e` và lazy components. Lưu ý: Một số edge case (nhiều async deps, nested Suspense với SSR) có thể behave không như kỳ vọng — test kỹ. Tag \\"experimental\\" đã được xóa khỏi Vue 3 docs.

## Detailed Answer (EN)
`\u003cSuspense\u003e` renders fallback content while async components resolve — handles async `setup()`:\
```vue\
\u003cSuspense\u003e\
  \u003ctemplate #default\u003e\
    \u003cAsyncDashboard /\u003e  \u003c!-- async setup() --\u003e\
  \u003c/template\u003e\
  \u003ctemplate #fallback\u003e\
    \u003cLoadingSpinner /\u003e\
  \u003c/template\u003e\
\u003c/Suspense\u003e\
```\
`AsyncDashboard` can have `async setup()` with awaits inside. `\u003cSuspense\u003e` catches the async and shows fallback until resolved. Integrates with `\u003cKeepAlive\u003e` and lazy components. Pitfall: Some edge cases (multiple async deps, nested Suspense with SSR) may behave unexpectedly — test thoroughly. The \\"experimental\\" label was removed from Vue 3 docs in Vue 3.5.
