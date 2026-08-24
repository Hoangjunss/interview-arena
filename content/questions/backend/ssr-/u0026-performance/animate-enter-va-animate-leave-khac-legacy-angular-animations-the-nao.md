---
id: animate-enter-va-animate-leave-khac-legacy-angular-animations-the-nao
position: backend
technology: ssr-\u0026-performance
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`animate.enter` và `animate.leave` khác legacy Angular animations thế nào?

## Question (EN)
How are `animate.enter` and `animate.leave` different from legacy Angular animations?

## Đáp án chi tiết (VI)
`animate.enter` và `animate.leave` là API animation mới được compiler hỗ trợ trực tiếp, dùng CSS class hoặc callback khi element vào/rời DOM. Docs Angular hiện tại khuyến nghị native CSS với hai API này cho code mới; nhiều API trong `@angular/animations` legacy đã bị deprecate.\
\
Ví dụ:\
```html\
@if (open()) {\
  \u003csection animate.enter=\\"fade-in\\" animate.leave=\\"fade-out\\"\u003ePanel\u003c/section\u003e\
}\
```\
Điểm cần nhớ: nếu dùng callback cho `animate.leave`, phải gọi `animationComplete()` để Angular remove element đúng lúc.

## Detailed Answer (EN)
`animate.enter` and `animate.leave` are newer animation APIs directly supported by the compiler, using CSS classes or callbacks when an element enters/leaves the DOM. Current Angular docs recommend native CSS with these APIs for new code; many legacy `@angular/animations` APIs are deprecated.\
\
Example:\
```html\
@if (open()) {\
  \u003csection animate.enter=\\"fade-in\\" animate.leave=\\"fade-out\\"\u003ePanel\u003c/section\u003e\
}\
```\
Key point: if you use a callback for `animate.leave`, call `animationComplete()` so Angular removes the element at the right time.
