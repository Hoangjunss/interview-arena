---
id: new-va-make-trong-go-khac-nhau-o-dau
position: backend
technology: fundamentals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`new` và `make` trong Go khác nhau ở đâu?

## Question (EN)
How do `new` and `make` differ in Go?

## Đáp án chi tiết (VI)
Cả hai đều cấp phát, nhưng cho mục đích khác nhau:\
\
- **`new(T)`** — dùng cho **mọi kiểu**. Cấp phát một T đã zeroed và trả về **con trỏ** `*T`. Nó không khởi tạo gì thêm.\
- **`make(T, ...)`** — chỉ cho **slice, map, channel**. Khởi tạo cấu trúc bên trong (backing array, hash table, buffer) và trả về **giá trị T đã sẵn sàng dùng**, không phải con trỏ.\
\
Hình dung: `new([]int)` cho `*[]int` trỏ tới một slice `nil` — gần như vô dụng. Muốn slice thật thì dùng `make`.\
\
```go\
p := new(int)              // *int, *p == 0\
m := make(map[string]int)  // map dùng được ngay\
s := make([]int, 0, 8)     // len 0, cap 8\
```

## Detailed Answer (EN)
Both allocate, but for different purposes:\
\
- **`new(T)`** — works for **any type**. It allocates a zeroed T and returns a **pointer** `*T`. It initializes nothing further.\
- **`make(T, ...)`** — only for **slices, maps, channels**. It initializes the internal structure (backing array, hash table, buffer) and returns a **ready-to-use value of T**, not a pointer.\
\
Picture it: `new([]int)` gives a `*[]int` pointing at a `nil` slice — nearly useless. For a real slice, use `make`.\
\
```go\
p := new(int)              // *int, *p == 0\
m := make(map[string]int)  // usable map right away\
s := make([]int, 0, 8)     // len 0, cap 8\
```
