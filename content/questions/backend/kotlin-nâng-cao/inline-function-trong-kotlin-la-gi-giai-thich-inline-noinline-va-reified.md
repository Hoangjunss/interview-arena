---
id: inline-function-trong-kotlin-la-gi-giai-thich-inline-noinline-va-reified
position: backend
technology: kotlin-nâng-cao
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Inline function trong Kotlin là gì? Giải thích `inline`, `noinline` và `reified`.

## Question (EN)
What are inline functions in Kotlin? Explain `inline`, `noinline`, and `reified`.

## Đáp án chi tiết (VI)
Khi đánh dấu một hàm bậc cao là `inline`, compiler **chép thẳng thân hàm và thân lambda vào chỗ gọi** thay vì tạo object cho lambda. Điều này loại bỏ chi phí cấp phát object cho function type ở mỗi lần gọi — hữu ích cho các hàm nhận lambda gọi nhiều lần (như scope function).\
\
```kotlin\
inline fun measure(block: () -\u003e Unit) {\
    val start = System.nanoTime()\
    block()\
    println(System.nanoTime() - start)\
}\
```\
\
- **`noinline`**: đặt trước một tham số lambda cụ thể trong hàm `inline` để **không** inline lambda đó — cần khi bạn muốn lưu lambda vào biến hoặc truyền nó đi tiếp.\
- **`reified`**: chỉ dùng được trong hàm `inline`, giữ lại **kiểu generic thật lúc runtime** (vượt qua type erasure), cho phép `T::class`, `is T`, `as T`. Ví dụ điển hình: `inline fun \u003creified T\u003e Gson.fromJson(json: String): T`.\
\
Lưu ý: inline làm phình bytecode nếu lạm dụng cho hàm lớn — dùng cho hàm nhỏ nhận lambda, không phải mọi hàm.

## Detailed Answer (EN)
$85
