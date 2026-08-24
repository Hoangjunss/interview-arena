---
id: compositionlocal-la-gi-va-hoat-dong-nhu-the-nao
position: backend
technology: jetpack-compose
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`CompositionLocal` là gì và hoạt động như thế nào?

## Question (EN)
What are CompositionLocals and how do they work?

## Đáp án chi tiết (VI)
`CompositionLocal` là cách truyền giá trị ngầm định xuống cây composable mà không cần truyền qua tham số ở mỗi cấp. Dùng `CompositionLocalProvider(LocalValue provides value) { Content() }` để cung cấp giá trị. Truy cập bằng `LocalValue.current`. Hữu ích cho theme color, navigation controller, hay các giá trị cần dùng xuyên suốt cây. Tuy nhiên lạm dụng sẽ làm code khó theo dõi.

## Detailed Answer (EN)
`CompositionLocal` is a way to pass values down the composable tree implicitly without passing them as parameters. Use `CompositionLocalProvider(LocalValue provides value) { Content() }` to provide values and `LocalValue.current` to access them. They're useful for theme colors, navigation controllers, or other globally needed values. However, overuse makes code hard to follow.
