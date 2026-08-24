---
id: web-worker-va-service-worker-khac-nhau-the-nao-dung-moi-loai-khi-nao
position: backend
technology: browser-\u0026-network
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Web Worker và Service Worker khác nhau thế nào? Dùng mỗi loại khi nào?

## Question (EN)
How do Web Workers and Service Workers differ? When do you use each?

## Đáp án chi tiết (VI)
Cả hai đều là script chạy trên **thread riêng**, tách khỏi main thread và không truy cập được DOM — nhưng vai trò khác hẳn:\
\
- **Web Worker**: thread tính toán cho **một trang**. Dùng để đẩy việc nặng CPU (parse file lớn, xử lý ảnh, tính toán dữ liệu) ra khỏi main thread → UI vẫn phản hồi. Giao tiếp bằng `postMessage`; vòng đời gắn với trang — trang đóng thì worker chết.\
- **Service Worker**: đóng vai **proxy giữa app và network**, đăng ký theo **scope/origin** và phục vụ chung mọi tab. Chặn sự kiện `fetch` để trả response từ **Cache Storage** → offline support (nền tảng của **PWA**), cùng push notification và background sync. **Event-driven**: trình duyệt đánh thức khi có sự kiện rồi tắt đi, không sống thường trực; chỉ chạy trên **HTTPS**.\
\
Chọn nhanh: cần **tính toán song song** → Web Worker; cần **offline/cache/push** → Service Worker. Chúng không thay thế nhau và có thể dùng đồng thời.

## Detailed Answer (EN)
Both are scripts running on a **separate thread**, off the main thread and without DOM access — but their roles differ entirely:\
\
- **Web Worker**: a computation thread for **one page**. Use it to move CPU-heavy work (parsing large files, image processing, data crunching) off the main thread → the UI stays responsive. Communicates via `postMessage`; its lifetime is tied to the page — close the page and the worker dies.\
- **Service Worker**: acts as a **proxy between the app and the network**, registered per **scope/origin** and shared across all tabs. It intercepts `fetch` events and can answer from **Cache Storage** → offline support (the foundation of **PWAs**), plus push notifications and background sync. **Event-driven**: the browser wakes it for an event then shuts it down — it is not long-lived; HTTPS only.\
\
Quick pick: need **parallel computation** → Web Worker; need **offline/cache/push** → Service Worker. They do not replace each other and can be used together.
