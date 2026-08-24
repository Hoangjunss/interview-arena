---
id: tuple-valuetuple-la-gi-deconstruction-dung-the-nao
position: backend
technology: types
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tuple / ValueTuple là gì? Deconstruction dùng thế nào?

## Question (EN)
What are tuples / ValueTuple? How is deconstruction used?

## Đáp án chi tiết (VI)
**ValueTuple** (`(int, string)`) là kiểu **value type** nhẹ để nhóm nhiều giá trị lại **mà không cần khai báo class/struct riêng** — hữu ích khi muốn trả nhiều giá trị từ một method.\
\
```csharp\
(int count, string name) GetUser() =\u003e (42, \\"Định\\");\
var u = GetUser();\
Console.WriteLine(u.count);   // 42 — truy cập qua tên field\
```\
\
Khác `Tuple\u003c\u003e` cũ: `Tuple\u003c\u003e` là **reference type**, bất biến, chỉ có `Item1`, `Item2`... khó đọc. `ValueTuple` là value type, **có tên field**, và **có thể sửa**.\
\
**Deconstruction** tách tuple thành các biến rời:\
\
```csharp\
var (count, name) = GetUser();     // count = 42, name = \\"Định\\"\
(int a, int b) = (1, 2);\
```\
\
Kiểu tự viết cũng deconstruct được nếu định nghĩa method `Deconstruct`:\
\
```csharp\
record Point(int X, int Y);\
var (x, y) = new Point(3, 4);      // record sinh sẵn Deconstruct\
```\
\
Dùng ValueTuple cho kết quả tạm, nội bộ; nếu giá trị có ý nghĩa domain lâu dài, một `record`/`class` đặt tên rõ vẫn tốt hơn.

## Detailed Answer (EN)
$82
