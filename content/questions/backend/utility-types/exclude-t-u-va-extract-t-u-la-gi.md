---
id: exclude-t-u-va-extract-t-u-la-gi
position: backend
technology: utility-types
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Exclude\u003cT, U\u003e` và `Extract\u003cT, U\u003e` là gì?

## Question (EN)
What are `Exclude\u003cT, U\u003e` and `Extract\u003cT, U\u003e`?

## Đáp án chi tiết (VI)
`Exclude\u003cT, U\u003e` loại bỏ khỏi union T những types có thể assign cho U: `Exclude\u003c'a'|'b'|'c', 'a'\u003e` cho ra `'b'|'c'`. `Extract\u003cT, U\u003e` ngược lại — giữ lại những types assign được cho U: `Extract\u003cstring|number|boolean, string|number\u003e` cho ra `string|number`. Ví dụ thực tế: `type NonString\u003cT\u003e = Exclude\u003cT, string\u003e` để lọc string ra khỏi union. Mẹo nhớ: Exclude = loại ra (exclude từ vocabulary), Extract = trích ra phần giao nhau. Nền tảng của `NonNullable\u003cT\u003e` chính là `Exclude\u003cT, null | undefined\u003e`.

## Detailed Answer (EN)
`Exclude\u003cT, U\u003e` removes from union T the types assignable to U: `Exclude\u003c'a'|'b'|'c', 'a'\u003e` gives `'b'|'c'`. `Extract\u003cT, U\u003e` is the opposite — keeps the types assignable to U: `Extract\u003cstring|number|boolean, string|number\u003e` gives `string|number`. Practical example: `type NonString\u003cT\u003e = Exclude\u003cT, string\u003e` to filter strings from a union. Memory tip: Exclude = remove, Extract = keep the intersection. `NonNullable\u003cT\u003e` is built on: `Exclude\u003cT, null | undefined\u003e`.
