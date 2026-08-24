---
id: buildcontext-la-gi-va-dung-de-lam-gi
position: backend
technology: widgets
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
BuildContext là gì và dùng để làm gì?

## Question (EN)
What is BuildContext and what is it used for?

## Đáp án chi tiết (VI)
`BuildContext` là **tham chiếu tới vị trí của một widget trong cây element** — thực chất chính là `Element` tương ứng.\
\
Dùng để:\
- Tra ngược lên cây tìm widget tổ tiên: `Theme.of(context)`, `MediaQuery.of(context)`, `Navigator.of(context)`.\
- Đăng ký phụ thuộc vào `InheritedWidget` để tự dựng lại khi dữ liệu đó đổi.\
\
Lưu ý hay bị hỏi:\
- Mỗi widget có context **riêng**; context của cha khác con.\
- **Không dùng context sau `await`** mà chưa kiểm tra `mounted` — widget có thể đã bị gỡ, gây lỗi. Cũng không nên cache context lâu dài.

## Detailed Answer (EN)
`BuildContext` is a **reference to a widget's location in the element tree** — effectively the corresponding `Element`.\
\
Used to:\
- Look up ancestor widgets: `Theme.of(context)`, `MediaQuery.of(context)`, `Navigator.of(context)`.\
- Register a dependency on an `InheritedWidget` so this widget rebuilds when that data changes.\
\
Common follow-ups:\
- Each widget has its **own** context; a parent's differs from a child's.\
- **Do not use a context after an `await`** without checking `mounted` — the widget may be gone, causing errors. Do not cache a context long-term either.
