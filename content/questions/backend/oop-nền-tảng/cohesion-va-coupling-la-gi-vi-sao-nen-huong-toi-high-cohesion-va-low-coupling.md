---
id: cohesion-va-coupling-la-gi-vi-sao-nen-huong-toi-high-cohesion-va-low-coupling
position: backend
technology: oop-nền-tảng
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cohesion và Coupling là gì? Vì sao nên hướng tới high cohesion và low coupling?

## Question (EN)
What are cohesion and coupling? Why aim for high cohesion and low coupling?

## Đáp án chi tiết (VI)
- **Cohesion (độ gắn kết)**: mức độ các phần bên trong một module cùng phục vụ **một mục đích rõ ràng**. High cohesion = mọi hàm/thuộc tính trong module liên quan chặt tới một trách nhiệm (gần với SRP).\
- **Coupling (độ phụ thuộc)**: mức độ một module **lệ thuộc** vào chi tiết của module khác. Low coupling = các module giao tiếp qua interface ổn định, ít biết nội bộ của nhau.\
\
**Vì sao high cohesion + low coupling**:\
- Dễ **hiểu**: mỗi module có một lý do tồn tại rõ ràng.\
- Dễ **sửa/thay**: đổi một module ít lan sang module khác (giảm ripple effect).\
- Dễ **test \u0026 tái sử dụng**: module tự chứa, mock dependency đơn giản.\
\
**Hình dung**: high cohesion là các thứ liên quan nằm gần nhau; low coupling là các nhóm đó nối với nhau bằng \\"dây mảnh\\

## Detailed Answer (EN)
- **Cohesion**: how strongly the parts inside a module serve **one clear purpose**. High cohesion = every function/field in the module relates tightly to a single responsibility (close to SRP).\
- **Coupling**: how much a module **depends on the internals** of another. Low coupling = modules talk through stable interfaces and know little about each other's internals.\
\
**Why high cohesion + low coupling**:\
- Easier to **understand**: each module has one clear reason to exist.\
- Easier to **change**: modifying one module rarely ripples into others (less ripple effect).\
- Easier to **test \u0026 reuse**: a self-contained module is simple to mock and lift out.\
\
**Mental picture**: high cohesion keeps related things together; low coupling connects those groups with \\"thin wires\\" rather than gluing them. These are the core measures of good modular design (Constantine/Yourdon, echoed in Clean Architecture).
