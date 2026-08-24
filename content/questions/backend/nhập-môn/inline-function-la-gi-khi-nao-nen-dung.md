---
id: inline-function-la-gi-khi-nao-nen-dung
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Inline function là gì? Khi nào nên dùng?

## Question (EN)
What is an inline function in C++? When should you use it?

## Đáp án chi tiết (VI)
`inline` gợi ý compiler **chèn thân hàm** tại điểm gọi thay vì tạo stack frame mới — giảm overhead function call với hàm nhỏ.\
\
**Khi nên dùng:** hàm rất nhỏ (1–3 dòng), được gọi nhiều trong hot path.\
**Khi không nên:** hàm lớn — code bloat tăng, cache instruction miss nhiều hơn.\
\
Lưu ý: `inline` chỉ là *hint* — compiler tự quyết định có expand hay không. Hàm `virtual` không thể inline (dispatch time là lúc chạy).

## Detailed Answer (EN)
`inline` hints the compiler to **insert the function body** at the call site instead of creating a new stack frame — reducing call overhead for small functions.\
\
**When to use:** very small functions (1–3 lines) called frequently in a hot path.\
**When to avoid:** large functions — code bloat increases instruction cache misses.\
\
Note: `inline` is only a *hint* — the compiler decides. `virtual` functions cannot be inlined (dispatch is resolved at runtime).
