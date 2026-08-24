---
id: aaa-pattern-arrange-act-assert-trong-testing-la-gi
position: backend
technology: strategy-\u0026-practices
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
AAA pattern (Arrange-Act-Assert) trong testing là gì?

## Question (EN)
What is the AAA pattern (Arrange-Act-Assert) in testing?

## Đáp án chi tiết (VI)
AAA là cấu trúc chuẩn cho mỗi unit test, giúp test dễ đọc và maintain. **Arrange** (chuẩn bị): khởi tạo data, mocks, objects cần thiết — đây là phần dài nhất. **Act** (thực hiện): gọi function/method đang test — chỉ một dòng, test một behavior duy nhất. **Assert** (kiểm tra kết quả): verify output hoặc side effect. Ví dụ: `// Arrange` `const cart = new Cart(); cart.addItem({ id: 1, price: 100 });` `// Act` `const total = cart.getTotal();` `// Assert` `expect(total).toBe(100)`. Lợi ích: phân chia rõ ràng giúp debug nhanh (Arrange sai → test data lỗi, Act sai → function không tồn tại, Assert sai → logic bug). Nếu Act phần có nhiều dòng, đó là dấu hiệu function đang test quá nhiều trách nhiệm. Lưu ý: `expect` trong Arrange (assert setup đúng) làm mờ ranh giới — chỉ assert kết quả cuối trong Assert section. AAA tương đương Given-When-Then của BDD — cùng concept, khác naming.

## Detailed Answer (EN)
AAA is the standard structure for unit tests, making them readable and maintainable. **Arrange**: set up data, mocks, and objects needed — usually the longest section. **Act**: call the function/method being tested — single line, testing one behavior. **Assert**: verify the output or side effects. Example: `// Arrange` `const cart = new Cart(); cart.addItem({ id: 1, price: 100 });` `// Act` `const total = cart.getTotal();` `// Assert` `expect(total).toBe(100)`. Benefits: clear separation speeds up debugging (bad Arrange → test data issue, bad Act → missing function, bad Assert → logic bug). If the Act section has many lines, it signals the function under test has too many responsibilities. Pitfall: placing `expect` in the Arrange section blurs boundaries — only assert the final result in the Assert section. AAA is equivalent to BDD's Given-When-Then — same concept, different naming.
