---
id: lam-sao-chia-se-state-toan-cuc-giua-cac-micro-frontend-mot-cach-an-toan
position: backend
technology: micro-frontend
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao chia sẻ state toàn cục giữa các micro-frontend một cách an toàn?

## Question (EN)
How do you safely share global state across micro-frontends?

## Đáp án chi tiết (VI)
Nguyên tắc: tránh một shared mutable store dùng chung xuyên các micro-frontend, vì nó tạo coupling chặt và khóa version (mọi mảnh phải dùng cùng phiên bản store). Thứ tự ưu tiên: (1) suy ra state từ URL hoặc từ backend (nguồn sự thật chung, không cần đồng bộ thủ công); (2) phát event/message khi có thay đổi để mảnh khác tự cập nhật state riêng của nó; (3) browser storage (localStorage/cookie) cho dữ liệu thô như token. Mỗi micro-frontend nên giữ state nội bộ của mình. Lưu ý: nếu buộc phải chia sẻ một mẩu state, hãy định nghĩa contract rõ ràng và payload tối thiểu — đừng để cấu trúc state nội bộ của một mảnh lộ ra thành phụ thuộc của các mảnh khác.

## Detailed Answer (EN)
Principle: avoid a single shared mutable store across micro-frontends, since it creates tight coupling and version lock (every piece must use the same store version). Order of preference: (1) derive state from the URL or the backend (a shared source of truth, no manual syncing); (2) emit events/messages on change so other pieces update their own state; (3) browser storage (localStorage/cookies) for raw data like tokens. Each micro-frontend should keep its own internal state. Note: if you must share a piece of state, define a clear contract and a minimal payload — don't let one piece's internal state shape become a dependency of the others.
