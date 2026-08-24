---
id: quiz-typescript-kieu-cua-type-x-string-number-la-gi-va-vi-sao
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểu của type X = string & number là gì, và vì sao?

## Đáp án trắc nghiệm
- [ ] any — compiler không xử lý được nên bỏ kiểm tra
- [ ] string — kiểu đứng trước được ưu tiên
- [x] never — không giá trị nào có thể đồng thời là string và number
- [ ] string | number — hai cách viết & và | tương đương với primitive

## Giải thích (VI)
Kết quả là never. Intersection A & B yêu cầu giá trị thuộc cả A lẫn B; không giá trị nào vừa là string vừa là number nên tập giao rỗng. Với object thì & gộp property của cả hai — đây là cách dùng chính: type AdminUser = User & { adminRole: string }.

### Giải thích các phương án:
- **any — compiler không xử lý được nên bỏ kiểm tra** (Sai): Compiler xử lý được và cho kết quả xác định là never; không có cơ chế rơi về any ở đây.
- **string — kiểu đứng trước được ưu tiên** (Sai): Intersection không có thứ tự ưu tiên; nó là phép giao tập hợp, không phải phép chọn.
- **never — không giá trị nào có thể đồng thời là string và number** (Đúng): Intersection rỗng. Intersection yêu cầu giá trị thoả cả hai kiểu; hai primitive không giao nhau cho ra tập rỗng — chính là never.
- **string | number — hai cách viết & và | tương đương với primitive** (Sai): Union (|) là "hoặc", intersection (&) là "và" — hai phép hoàn toàn khác nhau, với primitive không tương thích & cho ra never.
