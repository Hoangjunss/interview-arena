---
id: input-va-output-trong-angular-component-dung-de-lam-gi
position: backend
technology: components-\u0026-templates
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Input và Output trong Angular component dùng để làm gì?

## Question (EN)
What are component inputs and outputs used for in Angular?

## Đáp án chi tiết (VI)
`input()` hoặc `@Input()` nhận data từ parent xuống child.\
\
`output()` hoặc `@Output()` phát event từ child lên parent. Pattern chuẩn là one-way data flow: parent sở hữu state, child nhận input và emit event khi user tương tác. Tránh để child mutate object input trực tiếp vì dễ tạo side effect khó debug.

## Detailed Answer (EN)
`input()` or `@Input()` receives data from a parent into a child.\
\
`output()` or `@Output()` emits events from a child back to a parent. The standard pattern is one-way data flow: the parent owns state, the child receives inputs and emits events when users interact. Avoid mutating input objects directly in the child because it creates side effects that are hard to debug.
