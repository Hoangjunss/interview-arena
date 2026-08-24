---
id: quiz-javascript-template-literal-chuoi-trong-dau-backtick-khac-chuoi-trong-dau-nhay-thuong-o-die
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Template literal (chuỗi trong dấu backtick ` ``) khác chuỗi trong dấu nháy thường ở điểm nào?

## Đáp án trắc nghiệm
- [ ] ${...} hoạt động trong mọi loại chuỗi, kể cả nháy đơn và nháy kép
- [ ] Template literal chạy nhanh hơn nên luôn phải thay thế chuỗi nháy thường
- [x] Cho phép nhúng biểu thức bằng ${...} và viết chuỗi nhiều dòng trực tiếp
- [ ] Chỉ là cách viết khác của dấu nháy đơn, không có tính năng gì thêm

## Giải thích (VI)
Template literal dùng backtick ` ` và có hai tính năng chính: **nội suy biểu thức** ${expression} (ví dụ Hello ${name}, 1+1=${1+1} ) và **chuỗi nhiều dòng** viết trực tiếp không cần \n. Chuỗi nháy đơn/kép in nguyên văn ${name}` chứ không đánh giá. Ngoài ra còn tagged template cho trường hợp nâng cao.

### Giải thích các phương án:
- **${...} hoạt động trong mọi loại chuỗi, kể cả nháy đơn và nháy kép** (Sai): Trong nháy đơn/kép, 'Hello ${name}' in ra nguyên văn chuỗi ${name}; chỉ template literal mới đánh giá biểu thức bên trong.
- **Template literal chạy nhanh hơn nên luôn phải thay thế chuỗi nháy thường** (Sai): Khác biệt là tính năng cú pháp, không phải hiệu năng; chuỗi tĩnh không cần nội suy vẫn dùng nháy thường bình thường.
- **Cho phép nhúng biểu thức bằng ${...} và viết chuỗi nhiều dòng trực tiếp** (Đúng): Đúng hai tính năng chính: interpolation ${expression} và xuống dòng ngay trong chuỗi mà không cần \n hay nối chuỗi.
- **Chỉ là cách viết khác của dấu nháy đơn, không có tính năng gì thêm** (Sai): Backtick thêm hẳn tính năng mới: ${} được đánh giá như biểu thức JS, còn chuỗi nháy thường in nguyên văn ${name}.
