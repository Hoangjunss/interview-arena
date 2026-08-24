---
id: mo-hinh-osi-7-tang-la-gi-moi-tang-co-chuc-nang-gi
position: backend
technology: osi-\u0026-tcp-ip
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mô hình OSI 7 tầng là gì? Mỗi tầng có chức năng gì?

## Question (EN)
What is the OSI 7-layer model? What is the function of each layer?

## Đáp án chi tiết (VI)
Mô hình OSI (Open Systems Interconnection) chia giao tiếp mạng thành 7 tầng từ dưới lên: Physical (truyền bit qua cáp/sóng), Data Link (đóng gói frame, MAC address, phát hiện lỗi), Network (định tuyến gói tin qua IP), Transport (kiểm soát luồng \u0026 lỗi, TCP/UDP), Session (quản lý phiên kết nối), Presentation (mã hóa/giải mã, nén dữ liệu), Application (giao thức ứng dụng HTTP/FTP/SMTP).\
\
Trong thực tế, lập trình viên chủ yếu làm việc với tầng 4–7: tầng Transport xác định TCP hay UDP, tầng Application chứa logic nghiệp vụ HTTP/WebSocket. Mô hình OSI mang tính lý thuyết giúp debug và thiết kế hệ thống — ví dụ khi gói tin bị mất có thể trace từng tầng để xác định vấn đề nằm ở đâu (card mạng lỗi = tầng 1, ARP storm = tầng 2, routing sai = tầng 3).

## Detailed Answer (EN)
The OSI (Open Systems Interconnection) model divides network communication into 7 layers from bottom to top: Physical (transmits raw bits over cables/radio), Data Link (frames packets, handles MAC addresses and error detection), Network (routes packets via IP), Transport (flow control and error recovery, TCP/UDP), Session (manages connection sessions), Presentation (encoding/decoding, data compression), Application (application protocols like HTTP/FTP/SMTP).\
\
In practice, developers mainly work with layers 4–7: the Transport layer determines TCP vs UDP, while the Application layer contains HTTP/WebSocket business logic. OSI is a theoretical reference model useful for debugging and system design — when packets are dropped you can trace each layer to pinpoint the issue (faulty NIC = layer 1, ARP storm = layer 2, misconfigured routing = layer 3).
