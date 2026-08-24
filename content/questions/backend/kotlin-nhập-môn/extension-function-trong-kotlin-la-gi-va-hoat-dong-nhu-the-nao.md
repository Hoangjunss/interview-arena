---
id: extension-function-trong-kotlin-la-gi-va-hoat-dong-nhu-the-nao
position: backend
technology: kotlin-nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Extension function trong Kotlin là gì và hoạt động như thế nào?

## Question (EN)
What are extension functions in Kotlin and how do they work?

## Đáp án chi tiết (VI)
Extension function cho phép bạn thêm method mới vào class có sẵn mà không cần kế thừa hay sửa code gốc. Ví dụ có thể thêm method thẳng vào class `String`: `fun String.isPhoneNumber(): Boolean { return this.length == 10 }`. Tên hàm được đặt trước bằng tên class cần mở rộng, và `this` trỏ đến instance đang gọi. Cực kỳ hữu ích trong Android khi cần tạo helper method cho các class của platform.

## Detailed Answer (EN)
Extension functions allow you to add new methods to existing classes without inheritance or modifying the original class. For example: `fun String.isPhoneNumber(): Boolean { return this.length == 10 }`. The function name is prefixed with the class you're extending, and `this` refers to the calling instance. They're extremely useful in Android for creating helper methods on platform classes.
