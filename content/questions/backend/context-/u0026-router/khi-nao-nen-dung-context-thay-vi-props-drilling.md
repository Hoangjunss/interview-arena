---
id: khi-nao-nen-dung-context-thay-vi-props-drilling
position: backend
technology: context-\u0026-router
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên dùng Context thay vì props drilling?

## Question (EN)
When should you use Context instead of prop drilling?

## Đáp án chi tiết (VI)
Dùng Context khi: dữ liệu cần ở nhiều levels sâu (theme, locale, auth), data được nhiều components dùng, props chỉ passed qua để forward (không dùng ở cấp trung gian). Không nên dùng cho state thay đổi thường xuyên vì gây nhiều re-renders. Props drilling 2-3 cấp thì không cần Context.

## Detailed Answer (EN)
Use Context when: data is needed many levels deep (theme, locale, auth), many components need the same data, or props are only being passed through intermediate levels without being used there. Avoid Context for frequently changing state because it causes many re-renders. Prop drilling across 2-3 levels does not warrant Context.
