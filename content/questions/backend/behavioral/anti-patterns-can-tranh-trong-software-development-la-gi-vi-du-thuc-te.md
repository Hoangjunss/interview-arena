---
id: anti-patterns-can-tranh-trong-software-development-la-gi-vi-du-thuc-te
position: backend
technology: behavioral
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Anti-patterns cần tránh trong software development là gì? Ví dụ thực tế?

## Question (EN)
What are the most important anti-patterns to avoid in software development? Real-world examples?

## Đáp án chi tiết (VI)
Anti-patterns là solutions thoạt nhìn hợp lý nhưng thực ra gây hại về lâu dài.\
\
(1) **God Object/Class**: một class biết và làm quá nhiều — vi phạm SRP, khó test, bottleneck khi scale. (2) **Spaghetti Code**: logic phân tán, tangled dependencies, không có structure rõ ràng. (3) **Golden Hammer**: dùng quen một tool/pattern cho mọi vấn đề dù không phù hợp. (4) **Premature Optimization**: tối ưu trước khi có evidence về bottleneck — lãng phí thời gian, tăng complexity. (5) **Copy-Paste Programming**: vi phạm DRY, bug fix ở một chỗ không fix chỗ khác. (6) **Magic Numbers/Strings**: hardcode `if (status === 3)` thay vì `if (status === OrderStatus.SHIPPED)`. (7) **Shotgun Surgery**: một thay đổi require sửa nhiều class nhỏ — ngược lại God Object. (8) **Callback Hell** trong JavaScript: Promise chain và async/await giải quyết.\
\
Nhận biết: code smell là dấu hiệu sớm của anti-pattern.

## Detailed Answer (EN)
$87
