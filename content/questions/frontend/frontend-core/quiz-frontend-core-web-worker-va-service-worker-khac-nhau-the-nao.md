---
id: quiz-frontend-core-web-worker-va-service-worker-khac-nhau-the-nao
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Web Worker và Service Worker khác nhau thế nào?

## Đáp án trắc nghiệm
- [x] Web Worker chạy tính toán trên luồng riêng; Service Worker là proxy giữa trang và mạng
- [ ] Web Worker vẫn tiếp tục chạy sau khi đã đóng hết tab của trang
- [ ] Cả hai đều truy cập được DOM nên có thể cập nhật giao diện trực tiếp
- [ ] Service Worker chạy nhanh hơn Web Worker nên hợp dùng cho mọi tác vụ tính toán nặng ở client

## Giải thích (VI)
Web Worker chạy JavaScript trên luồng riêng để tính toán nặng không làm treo giao diện — trang và worker trao đổi bằng postMessage, worker không đụng được DOM. Service Worker là một proxy giữa trang và mạng: chặn request, phục vụ từ cache, cho phép hoạt động ngoại tuyến và nhận push. Nó sống độc lập với tab, chỉ chạy trên HTTPS (hoặc localhost).

### Giải thích các phương án:
- **Web Worker chạy tính toán trên luồng riêng; Service Worker là proxy giữa trang và mạng** (Đúng): Đúng: một bên giải quyết CPU, một bên chặn và xử lý request mạng. Service Worker sống độc lập với tab nên dùng được cho cache ngoại tuyến và push notification.
- **Web Worker vẫn tiếp tục chạy sau khi đã đóng hết tab của trang** (Sai): Web Worker gắn với vòng đời trang; Service Worker mới sống độc lập.
- **Cả hai đều truy cập được DOM nên có thể cập nhật giao diện trực tiếp** (Sai): Không worker nào truy cập DOM; chúng trao đổi với trang qua thông điệp.
- **Service Worker chạy nhanh hơn Web Worker nên hợp dùng cho mọi tác vụ tính toán nặng ở client** (Sai): Service Worker không dành cho tính toán; nó là lớp trung gian cho request mạng.
