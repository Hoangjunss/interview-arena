---
id: quiz-typescript-tai-dong-return-valtofixed2-typescript-suy-ra-kieu-cua-val-la-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại dòng return val.toFixed(2), TypeScript suy ra kiểu của val là gì?

## Đáp án trắc nghiệm
- [ ] number | Date — instanceof không phải type guard hợp lệ
- [x] number — hai nhánh trước đã loại string (typeof) và Date (instanceof), union chỉ còn lại number
- [ ] unknown — compiler không xác định được nên rơi về kiểu an toàn nhất
- [ ] string | number | Date — kiểu khai báo ban đầu không đổi trong thân hàm

## Giải thích (VI)
Kiểu là number. TypeScript dùng control flow analysis: guard typeof val === "string" loại string, guard val instanceof Date loại Date — cả hai nhánh đều return nên xuống dưới union chỉ còn number, cho phép gọi .toFixed() an toàn.

### Giải thích các phương án:
- **number | Date — instanceof không phải type guard hợp lệ** (Sai): instanceof là type guard built-in; nhánh đó đã return nên Date bị loại khỏi phần còn lại.
- **number — hai nhánh trước đã loại string (typeof) và Date (instanceof), union chỉ còn lại number** (Đúng): Control flow analysis loại dần từng nhánh: sau guard typeof và instanceof có return, phần còn lại của union là number.
- **unknown — compiler không xác định được nên rơi về kiểu an toàn nhất** (Sai): Compiler xác định được chính xác bằng phép loại trừ trên union; không có cơ chế rơi về unknown.
- **string | number | Date — kiểu khai báo ban đầu không đổi trong thân hàm** (Sai): TypeScript narrow kiểu theo từng nhánh code (control flow analysis), không giữ nguyên kiểu khai báo.
