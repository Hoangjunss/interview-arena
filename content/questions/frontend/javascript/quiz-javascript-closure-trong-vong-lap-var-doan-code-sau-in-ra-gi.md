---
id: quiz-javascript-closure-trong-vong-lap-var-doan-code-sau-in-ra-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Closure trong vòng lặp var — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] 0 0 0
- [x] 3 3 3
- [ ] 0 1 2
- [ ] undefined undefined undefined

## Giải thích (VI)
In ra 3 3 3. Với var, cả ba closure chia sẻ một biến i duy nhất (function-scoped). Vòng lặp kết thúc khi i === 3, nên khi gọi các hàm sau đó tất cả đều đọc ra 3. Đổi var thành let sẽ cho 0 1 2 vì mỗi vòng lặp có binding i riêng.

### Giải thích các phương án:
- **0 0 0** (Sai): Closure đọc giá trị i tại thời điểm gọi, không phải lúc tạo; lúc gọi i đã là 3.
- **3 3 3** (Đúng): var i có một binding duy nhất chia sẻ cho cả 3 closure; sau vòng lặp i bằng 3 nên cả ba hàm đọc ra 3.
- **0 1 2** (Sai): Sẽ đúng nếu dùng let i (mỗi vòng có binding riêng); với var thì cả ba chia sẻ cùng một i.
- **undefined undefined undefined** (Sai): i đã được gán trong vòng lặp nên không phải undefined; nó giữ giá trị cuối là 3.
