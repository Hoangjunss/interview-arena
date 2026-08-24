---
id: label-element-quan-trong-the-nao
position: backend
technology: forms
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`\u003clabel\u003e` element quan trọng thế nào?

## Question (EN)
Why is the `\u003clabel\u003e` element important?

## Đáp án chi tiết (VI)
`\u003clabel\u003e` nối phần chữ mô tả với control. Hai cách viết:\
\
```html\
\u003c!-- 1. explicit: for trỏ tới id của input --\u003e\
\u003clabel for=\\"email\\"\u003eEmail\u003c/label\u003e\
\u003cinput id=\\"email\\" type=\\"email\\"\u003e\
\
\u003c!-- 2. implicit: bọc input trong label --\u003e\
\u003clabel\u003eEmail \u003cinput type=\\"email\\"\u003e\u003c/label\u003e\
```\
\
Ba thứ có được ngay:\
1. **Click vào chữ = focus/tick input** — vùng bấm rộng ra rất nhiều trên mobile, đặc biệt với checkbox nhỏ.\
2. **Screen reader đọc đúng tên field** khi focus tới.\
3. **Test bền hơn** — `getByLabelText('Email')` không vỡ khi đổi class hay cấu trúc DOM.\
\
**Lỗi phổ biến nhất:** dùng `placeholder` thay label.\
\
```html\
\u003cinput type=\\"email\\" placeholder=\\"Email\\"\u003e   \u003c!-- sai --\u003e\
```\
\
Placeholder **biến mất ngay khi gõ**, nên người dùng quên field này là gì; độ tương phản thấp; và một số screen reader không đọc. Placeholder là **ví dụ định dạng** (`you@example.com`), không phải nhãn.\
\
**Chốt:** cần ẩn nhãn vì lý do thiết kế thì dùng CSS `.sr-only`, đừng bỏ hẳn `\u003clabel\u003e`.

## Detailed Answer (EN)
$81
