---
id: patterns-hay-duoc-dung-trong-custom-hooks-la-gi
position: backend
technology: custom-hooks
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Patterns hay được dùng trong custom hooks là gì?

## Question (EN)
What patterns are commonly used when building custom hooks?

## Đáp án chi tiết (VI)
Các patterns phổ biến:\
\
- (1) State + Actions pattern: return state và handlers.\
- (2) Observer pattern: subscribe/unsubscribe.\
- (3) Factory pattern: nhận config tạo ra hook instance khác nhau.\
- (4) Composition: gọi nhiều hooks nhỏ bên trong.\
- (5) Bridge pattern: kết nối external library với React world.\
\
usehooks.com là nguồn tham khảo tốt.

## Detailed Answer (EN)
Common patterns:\
\
- (1) State + Actions — return state and handlers together.\
- (2) Observer — subscribe/unsubscribe to external sources.\
- (3) Factory — accept config to produce different hook instances.\
- (4) Composition — call multiple smaller hooks internally.\
- (5) Bridge — connect an external library to the React world.\
\
usehooks.com is a great reference for well-tested implementations.
