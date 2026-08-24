---
id: tai-sao-track-trong-for-quan-trong
position: backend
technology: components-\u0026-templates
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao `track` trong `@for` quan trọng?

## Question (EN)
Why is `track` important in `@for`?

## Đáp án chi tiết (VI)
`track` cho Angular biết item nào là cùng một entity khi list thay đổi, giúp reuse DOM/component instance thay vì destroy/recreate sai cách.\
\
Ví dụ đúng với dữ liệu có id:\
```html\
@for (user of users(); track user.id) {\
  \u003capp-user-row [user]=\\"user\\" /\u003e\
}\
```\
Với list tĩnh có thể track item; hạn chế dùng index nếu list có sort/filter/insert. Sai `track` thường gây mất focus input, reset child state hoặc animation bị giật.

## Detailed Answer (EN)
`track` tells Angular which item represents the same entity when a list changes, allowing DOM/component instances to be reused instead of incorrectly destroyed and recreated.\
\
Correct example for data with ids:\
```html\
@for (user of users(); track user.id) {\
  \u003capp-user-row [user]=\\"user\\" /\u003e\
}\
```\
For static lists you can track the item; avoid index when the list can be sorted, filtered or inserted into. Bad tracking often causes lost input focus, reset child state or jumpy animations.
