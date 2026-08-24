---
id: string-va-stringbuilder-khac-nhau-nhu-the-nao-va-khi-nao-nen-dung-cai-nao
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
String và StringBuilder khác nhau như thế nào và khi nào nên dùng cái nào?

## Question (EN)
What is the difference between String and StringBuilder and when should you use each?

## Đáp án chi tiết (VI)
`String` là immutable — mỗi lần ghép chuỗi tạo ra một object mới, tốn bộ nhớ và CPU. `StringBuilder` là mutable và sửa đổi in-place, hiệu quả hơn nhiều khi ghép nhiều đoạn. Trong vòng lặp ghép chuỗi, `StringBuilder` nhanh hơn hẳn. Dùng `StringBuilder` khi xây dựng chuỗi động từ nhiều phần; dùng `String` cho các thao tác đơn giản.

## Detailed Answer (EN)
`String` is immutable — concatenation creates new objects, consuming memory and CPU. `StringBuilder` is mutable and modifies in-place, dramatically outperforming string concatenation in loops. Use `StringBuilder` when building dynamic strings from multiple pieces; use `String` for simple, infrequent operations.
