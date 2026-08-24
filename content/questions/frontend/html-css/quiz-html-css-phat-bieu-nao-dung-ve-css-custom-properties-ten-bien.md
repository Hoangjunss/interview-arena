---
id: quiz-html-css-phat-bieu-nao-dung-ve-css-custom-properties-ten-bien
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào đúng về CSS custom properties (--ten-bien)?

## Đáp án trắc nghiệm
- [ ] Chúng được biên dịch thành giá trị tĩnh lúc build giống biến SASS
- [x] Tham gia cascade và inheritance, đổi được lúc runtime bằng JS
- [ ] Chỉ khai báo được trong :root, không đặt được ở selector khác
- [ ] JavaScript không đọc hay ghi được giá trị của chúng

## Giải thích (VI)
CSS custom properties là thuộc tính CSS runtime: khai báo --primary: #2563eb (thường trong :root cho global, nhưng đặt được ở mọi selector), dùng qua var(--primary), có fallback var(--x, blue). Chúng tham gia cascade và inheritance, đổi được bằng JS lúc runtime — khác biến SASS vốn biến mất sau khi compile.

### Giải thích các phương án:
- **Chúng được biên dịch thành giá trị tĩnh lúc build giống biến SASS** (Sai): Đây là điểm khác biệt cốt lõi với SASS: biến SASS biến mất sau khi compile, còn custom property sống trong trình duyệt lúc runtime.
- **Tham gia cascade và inheritance, đổi được lúc runtime bằng JS** (Đúng): Custom property là thuộc tính CSS thật sự: kế thừa xuống con, override theo cascade, đọc/ghi bằng getPropertyValue/setProperty, và var(--x, fallback) có giá trị dự phòng. var() còn hỗ trợ giá trị fallback.
- **Chỉ khai báo được trong :root, không đặt được ở selector khác** (Sai): :root chỉ là quy ước cho scope toàn cục; khai báo được ở bất kỳ selector nào và giá trị áp cho subtree đó (cơ chế theming theo vùng).
- **JavaScript không đọc hay ghi được giá trị của chúng** (Sai): JS thao tác bình thường: getComputedStyle(el).getPropertyValue("--x") để đọc, el.style.setProperty("--x", value) để ghi.
