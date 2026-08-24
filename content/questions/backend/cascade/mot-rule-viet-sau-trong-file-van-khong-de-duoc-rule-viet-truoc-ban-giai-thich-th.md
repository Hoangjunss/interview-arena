---
id: mot-rule-viet-sau-trong-file-van-khong-de-duoc-rule-viet-truoc-ban-giai-thich-th
position: backend
technology: cascade
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một rule viết sau trong file vẫn không đè được rule viết trước. Bạn giải thích thứ tự thắng thua của CSS thế nào?

## Question (EN)
A rule written later in the file still loses to an earlier one. How do you explain CSS's winner-takes-all order?

## Đáp án chi tiết (VI)
Trình duyệt chọn giá trị theo **thứ tự ba tầng**, chỉ khi hoà ở tầng trên mới xét tầng dưới:\
\
1. **Nguồn và mức quan trọng** — user-agent \u003c author \u003c `!important` (đảo ngược thứ tự).\
2. **Độ cụ thể (specificity)** — bộ ba `(inline, id, class/attribute/pseudo-class, element/pseudo-element)`.\
3. **Thứ tự khai báo** — cái đứng sau thắng, chỉ khi hai tầng trên bằng nhau.\
\
Cách đếm specificity: mỗi `#id` cộng vào cột id, mỗi `.class` / `[attr]` / `:hover` cộng vào cột class, mỗi tag / `::before` cộng vào cột element. So sánh từ trái sang, cột trái lớn hơn là thắng ngay — 11 class vẫn thua 1 id.\
\
```css\
#sidebar .title { color: red; }   /* (1,1,0) */\
.page .card .title { color: blue; } /* (0,3,0) -\u003e thua dù viết sau */\
```\
\
Vì vậy rule viết sau không đè được là do rule kia **cụ thể hơn**. Cách sửa đúng: hạ specificity của rule cũ (bỏ bớt `#id`), hoặc viết selector cùng mức rồi đặt sau — không phải thêm `!important`. Trong DevTools, giá trị bị gạch ngang chính là khai báo thua ở bước này.

## Detailed Answer (EN)
$83
