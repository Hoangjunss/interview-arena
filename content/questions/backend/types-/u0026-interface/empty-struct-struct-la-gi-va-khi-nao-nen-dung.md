---
id: empty-struct-struct-la-gi-va-khi-nao-nen-dung
position: backend
technology: types-\u0026-interface
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Empty struct `struct{}` là gì, và khi nào nên dùng?

## Question (EN)
What is the empty struct `struct{}`, and when should you use it?

## Đáp án chi tiết (VI)
`struct{}` là struct không có field nào → chiếm **0 byte**. Mọi giá trị `struct{}{}` share cùng một địa chỉ, nên dùng nó ở đâu chỉ cần \\"sự hiện diện\\" chứ không cần dữ liệu.\
\
Ba chỗ thường gặp:\
- **Set**: `map[string]struct{}` — tiết kiệm hơn `map[string]bool` vì value không tốn byte.\
- **Signal channel**: `chan struct{}` — báo hiệu bằng `close`/gửi, không mang payload.\
- **Method-only type / marker** — receiver không cần state.\
\
```go\
set := map[string]struct{}{}\
set[\\"a\\"] = struct{}{}\
_, ok := set[\\"a\\"]        // ok == true\
\
done := make(chan struct{})\
close(done)              // báo hiệu, không kèm dữ liệu\
```

## Detailed Answer (EN)
`struct{}` is a struct with no fields → it occupies **zero bytes**. Every `struct{}{}` value shares one address, so use it wherever you only need \\"presence\\
