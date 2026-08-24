---
id: important-dung-khi-nao-tai-sao-nen-tranh
position: backend
technology: nhập-môn
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
!important dùng khi nào? Tại sao nên tránh?

## Question (EN)
When should you use !important? Why should you avoid it?

## Đáp án chi tiết (VI)
`!important` đưa một khai báo lên **nhóm ưu tiên riêng**, đứng trên mọi specificity trong cùng origin.\
\
```css\
.btn { color: blue !important; }\
#page .btn.primary { color: red; }   /* thua, dù specificity cao hơn nhiều */\
```\
\
Vì sao nên tránh: cách duy nhất để ghi đè một `!important` là **một `!important` khác có specificity cao hơn**. Trong một dự án đang chạy, việc đó lan rất nhanh — mỗi lần sửa lại thêm một `!important`, đến lúc không ai biết giá trị nào đang thắng.\
\
Hai chỗ dùng được:\
1. **Utility class** phải thắng mọi thứ theo thiết kế (`.hidden { display: none !important }`).\
2. **Ghi đè CSS inline của thư viện ngoài** khi không sửa được nguồn — inline style chỉ thua `!important`.\
\
Giải pháp hiện đại thay cho nó là `@layer`:\
\
```css\
@layer vendor, app;\
@layer vendor { /* CSS thư viện */ }\
@layer app    { .btn { color: red; } }   /* thắng, không cần !important */\
```\
\
**Chốt phỏng vấn:** trả lời \\"tránh vì khó bảo trì\\" là đủ mức trung bình. Nói thêm được `@layer` là cách xử lý gốc rễ mới tạo khác biệt.

## Detailed Answer (EN)
`!important` moves a declaration into a **separate priority bucket** that outranks any specificity within the same origin.\
\
```css\
.btn { color: blue !important; }\
#page .btn.primary { color: red; }   /* loses, despite far higher specificity */\
```\
\
Why avoid it: the only way to override an `!important` is **another `!important` with higher specificity**. In a live codebase that spreads fast — every fix adds one more, until nobody can tell which value wins.\
\
Two places it is fine:\
1. **Utility classes** that must win by design (`.hidden { display: none !important }`).\
2. **Overriding a third-party inline style** you cannot edit — inline styles lose only to `!important`.\
\
The modern replacement is `@layer`:\
\
```css\
@layer vendor, app;\
@layer vendor { /* library CSS */ }\
@layer app    { .btn { color: red; } }   /* wins, no !important needed */\
```\
\
**Interview takeaway:** \\"avoid it, it is hard to maintain\\" is an average answer. Naming `@layer` as the structural fix is what stands out.
