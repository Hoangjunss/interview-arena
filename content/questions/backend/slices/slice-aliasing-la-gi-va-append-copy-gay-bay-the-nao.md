---
id: slice-aliasing-la-gi-va-append-copy-gay-bay-the-nao
position: backend
technology: slices
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Slice aliasing là gì, và `append`/`copy` gây bẫy thế nào?

## Question (EN)
What is slice aliasing, and how do `append`/`copy` create pitfalls?

## Đáp án chi tiết (VI)
Một slice là **view** gồm (con trỏ, len, cap) trỏ vào một backing array. Nhiều slice có thể **share cùng array** → sửa qua slice này, slice kia thấy theo.\
\
Điểm bẫy nằm ở `append`:\
- Còn **cap dư** → `append` ghi **in-place** lên array chung, có thể **đè phần tử** của slice khác.\
- **Vượt cap** → cấp array **mới**, copy sang, và cắt liên kết với array cũ.\
\
Vì kết quả phụ thuộc cap, bug rất khó lường. Muốn cô lập, dùng `copy` sang slice mới, hoặc full-slice expression `s[a:b:b]` để ép cap = len.\
\
```go\
a := []int{1, 2, 3, 4}\
b := a[:2]           // share array với a, cap = 4\
b = append(b, 99)    // còn cap → ghi đè a[2]!\
// a == [1 2 99 4]\
```

## Detailed Answer (EN)
A slice is a **view** of (pointer, len, cap) into a backing array. Multiple slices can **share the same array** → mutating through one is visible through the other.\
\
The trap is in `append`:\
- With **spare cap** → `append` writes **in place** onto the shared array, possibly **overwriting elements** of another slice.\
- **Beyond cap** → it allocates a **new** array, copies over, and severs the link to the old one.\
\
Because the outcome depends on cap, the bug is unpredictable. To isolate, `copy` into a fresh slice, or use the full-slice expression `s[a:b:b]` to force cap = len.\
\
```go\
a := []int{1, 2, 3, 4}\
b := a[:2]           // shares array with a, cap = 4\
b = append(b, 99)    // spare cap → overwrites a[2]!\
// a == [1 2 99 4]\
```
