---
id: quiz-javascript-destructuring-voi-default-va-rest-doan-code-sau-in-ra-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Destructuring với default và rest — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [x] 1 5 [] 7 9
- [ ] 1 5 [] undefined 9
- [ ] 1 5 undefined 7 9
- [ ] 1 undefined [] 7 9

## Giải thích (VI)
In 1 5 [] rồi 7 9. Array destructuring: a=1, b thiếu phần tử nên nhận default 5, ...rest gom phần dư thành []. Object destructuring: { p: renamed } đổi tên key p sang biến renamed (7), còn q không tồn tại nên nhận default 9. Default chỉ kích hoạt khi giá trị là undefined.

### Giải thích các phương án:
- **1 5 [] 7 9** (Đúng): a lấy phần tử đầu (1); b thiếu phần tử → dùng default 5; ...rest gom phần còn lại → []. Object: p: renamed đổi tên p→renamed (7); q không có key → default 9.
- **1 5 [] undefined 9** (Sai): Sai renamed: cú pháp { p: renamed } lấy giá trị của key p rồi gán vào biến renamed, nên renamed = 7 (không phải tìm key tên "renamed").
- **1 5 undefined 7 9** (Sai): Sai rest: rest element luôn gom về một mảng (rỗng nếu hết phần tử), là [] chứ không phải undefined.
- **1 undefined [] 7 9** (Sai): Sai b: khi vị trí tương ứng là undefined (mảng chỉ có 1 phần tử), default value kích hoạt nên b = 5, không phải undefined.
