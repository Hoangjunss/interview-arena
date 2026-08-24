---
id: range-loop-trong-go-dung-the-nao
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Range loop trong Go dùng thế nào?

## Question (EN)
How is the range loop used in Go?

## Đáp án chi tiết (VI)
`range` là cú pháp duy nhất để iterate qua collection trong Go, hoạt động khác nhau theo từng kiểu dữ liệu:\
\
- **Slice / array:** `for i, v := range slice { }` — trả về index và value.\
- **Map:** `for k, v := range m { }` — trả về key và value, thứ tự không xác định.\
- **String:** `for i, r := range \\"hello\\" { }` — trả về byte index và rune (Unicode code point).\
- **Channel:** `for v := range ch { }` — đọc đến khi channel close.\
- **Integer (Go 1.22+):** `for i := range 10 { }` — range over integer, tương đương `for i := 0; i \u003c 10; i++`.\
- **Bỏ qua giá trị:** dùng blank identifier — `for _, v := range items { }`.\
\
**Lưu ý:** range copy value sang biến loop, không phải reference. Nếu cần mutate phần tử, dùng `slice[i]` thay vì `v`.

## Detailed Answer (EN)
`range` is Go's only iteration syntax, with different semantics per collection type:\
\
- **Slice / array:** `for i, v := range slice { }` — yields index and value.\
- **Map:** `for k, v := range m { }` — yields key and value; order is unspecified.\
- **String:** `for i, r := range \\"hello\\" { }` — yields byte index and rune (Unicode code point).\
- **Channel:** `for v := range ch { }` — reads until the channel is closed.\
- **Integer (Go 1.22+):** `for i := range 10 { }` — range over integer, equivalent to `for i := 0; i \u003c 10; i++`.\
- **Discard a value:** use the blank identifier — `for _, v := range items { }`.\
\
**Note:** range copies values into the loop variable; it is not a reference. To mutate elements, use `slice[i]` instead of `v`.
