---
id: css-reset-va-normalize-khac-nhau-nhu-the-nao
position: backend
technology: css-reset
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CSS reset và normalize khác nhau như thế nào?

## Question (EN)
How do a CSS reset and normalize differ?

## Đáp án chi tiết (VI)
Cả hai xử lý việc trình duyệt có **default styles** khác nhau (margin `\u003cbody\u003e`, cỡ `\u003ch1\u003e`, style `\u003cul\u003e`...), nhưng theo hai triết lý ngược nhau:\
\
- **Reset** (vd Meyer reset): **xóa sạch** hầu hết style mặc định về 0 — margin, padding, font-size... **Nền trắng hoàn toàn**, bạn phải dựng lại mọi thứ từ đầu. Nhất quán tuyệt đối nhưng tốn công.\
- **Normalize** (normalize.css): **giữ lại** các mặc định hữu ích và chỉ **san phẳng khác biệt** giữa các trình duyệt, sửa từng bug cụ thể. Ít phá vỡ, giữ semantic sẵn có (`\u003ch1\u003e` vẫn to đậm).\
\
Ngày nay nhiều dev dùng một **custom reset nhỏ** (đặt `box-sizing: border-box`, bỏ margin mặc định) — lai giữa hai hướng.

## Detailed Answer (EN)
Both address browsers shipping different **default styles** (`\u003cbody\u003e` margin, `\u003ch1\u003e` size, `\u003cul\u003e` styling...), but with opposite philosophies:\
\
- **Reset** (e.g. Meyer reset): **strips** most defaults to zero — margins, padding, font-size... A **blank slate**; you rebuild everything from scratch. Total consistency but more work.\
- **Normalize** (normalize.css): **keeps** useful defaults and only **smooths out cross-browser differences**, fixing specific bugs. Less disruptive, preserves built-in semantics (`\u003ch1\u003e` stays big and bold).\
\
Today many devs use a **small custom reset** (set `box-sizing: border-box`, drop default margins) — a hybrid of the two.
