---
id: cac-micro-frontend-giao-tiep-voi-nhau-nhu-the-nao
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các micro-frontend giao tiếp với nhau như thế nào?

## Question (EN)
How do micro-frontends communicate with each other?

## Đáp án chi tiết (VI)
Nguyên tắc: ưu tiên coupling lỏng. Ba cách thường dùng: (1) gửi sự kiện/message — browser CustomEvent hoặc một event bus (pub/sub) nhỏ, các mảnh không gọi thẳng nhau; (2) shell truyền props và callback xuống từng micro-frontend (rõ hợp đồng nhất); (3) đồng bộ qua URL — URL là \\"shared state\\" tự nhiên và an toàn để nhiều mảnh cùng đọc. Martin Fowler khuyên gửi message/event và tránh shared state giữa các micro-frontend. Lưu ý: dùng một global object trên `window` hay một shared store làm kênh giao tiếp chính sẽ tạo coupling chặt và khó biết \\"hợp đồng\\" giữa các bên — chỉ nên dùng event/props với payload tối thiểu và contract rõ ràng.

## Detailed Answer (EN)
Principle: favor loose coupling. Three common ways: (1) send events/messages — a browser CustomEvent or a small event bus (pub/sub), so pieces don't call each other directly; (2) the shell passes props and callbacks down to each micro-frontend (clearest contract); (3) sync via the URL — the URL is a natural, safe \\"shared state\\" that many pieces can read. Martin Fowler recommends sending messages/events and avoiding shared state between micro-frontends. Note: using a global object on `window` or a shared store as the primary channel creates tight coupling and makes the contract between parties hard to see — prefer events/props with minimal payloads and an explicit contract.
