---
id: co-may-cach-lien-ket-label-voi-input-dung-placeholder-thay-label-duoc-khong
position: backend
technology: labels
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có mấy cách liên kết `\u003clabel\u003e` với input? Dùng `placeholder` thay label được không?

## Question (EN)
What are the ways to associate a `\u003clabel\u003e` with an input? Can `placeholder` replace a label?

## Đáp án chi tiết (VI)
Hai cách liên kết chuẩn:\
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
Cách 1 được ưu tiên vì linh hoạt về layout và tương thích rộng hơn với trợ năng. Lưu ý `for` khớp với **`id`**, không phải `name`.\
\
Liên kết đúng cho ba lợi ích: screen reader đọc được nhãn khi focus vào ô, click vào chữ thì focus nhảy vào ô, và vùng bấm rộng hơn trên mobile.\
\
**`placeholder` không thay được label:**\
- Nó **biến mất** khi người dùng bắt đầu gõ → mất ngữ cảnh khi kiểm tra lại form.\
- Màu mặc định nhạt, thường **fail contrast**.\
- Hỗ trợ trợ năng không đồng nhất giữa các trình duyệt/screen reader.\
\
Nếu thiết kế bắt buộc không hiện chữ, vẫn giữ `\u003clabel\u003e` nhưng ẩn về mặt thị giác bằng class `sr-only` (clip 1px), hoặc dùng `aria-label` trên input. Không dùng `display: none` — nó gỡ luôn khỏi accessibility tree.

## Detailed Answer (EN)
$85
