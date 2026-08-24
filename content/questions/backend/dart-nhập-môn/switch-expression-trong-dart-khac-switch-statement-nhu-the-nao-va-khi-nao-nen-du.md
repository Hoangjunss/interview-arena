---
id: switch-expression-trong-dart-khac-switch-statement-nhu-the-nao-va-khi-nao-nen-du
position: backend
technology: dart-nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Switch expression trong Dart khác switch statement như thế nào và khi nào nên dùng?

## Question (EN)
How does a switch expression differ from a switch statement in Dart, and when should you use it?

## Đáp án chi tiết (VI)
Switch expression trả về giá trị trực tiếp và bắt buộc phải exhaustive (phủ hết mọi trường hợp). Cú pháp dùng `=\u003e`: `String grade = score switch { \u003e 90 =\u003e 'A', \u003e 80 =\u003e 'B', _ =\u003e 'F' };`. Switch statement thì không trả về giá trị, phù hợp khi cần thực thi side effect. Dùng switch expression khi bạn muốn transform một giá trị sang giá trị khác—code gọn và compiler sẽ báo lỗi nếu thiếu case.

## Detailed Answer (EN)
Switch expressions return a value directly and require exhaustiveness. Syntax uses `=\u003e`: `String grade = score switch { \u003e 90 =\u003e 'A', \u003e 80 =\u003e 'B', _ =\u003e 'F' };`. Switch statements execute side effects without returning values. Use switch expressions for value transformation — the compiler enforces exhaustiveness, catching missing cases at compile-time.
