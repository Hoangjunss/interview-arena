---
id: graceful-shutdown-trong-spring-boot-la-gi-cau-hinh-the-nao
position: backend
technology: operations
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Graceful shutdown trong Spring Boot là gì? Cấu hình thế nào?

## Question (EN)
What is graceful shutdown in Spring Boot and how do you configure it?

## Đáp án chi tiết (VI)
Graceful shutdown là chế độ khi nhận tín hiệu dừng (`SIGTERM`), web server **ngừng nhận request mới** nhưng vẫn cho các request đang xử lý chạy hết trong một khoảng ân hạn rồi mới tắt. Không có nó, container bị kill giữa chừng sẽ trả lỗi cho các request đang dở — vấn đề hay gặp khi deploy rolling update trên Kubernetes.\
\
```properties\
# Spring Boot 2.3 - 3.3: must be turned on explicitly\
server.shutdown=graceful\
# grace period for in-flight requests\
spring.lifecycle.timeout-per-shutdown-phase=30s\
```\
\
- Từ **Spring Boot 3.4** graceful shutdown đã **bật mặc định**; muốn quay về hành vi cũ thì đặt `server.shutdown=immediate`.\
- Tomcat, Jetty và Reactor Netty ngừng nhận kết nối ở tầng network.\
- Hết `timeout-per-shutdown-phase` mà request chưa xong thì server tắt luôn.\
\
Muốn chạy đúng trên Kubernetes thì `terminationGracePeriodSeconds` của pod phải **lớn hơn** giá trị timeout này, nếu không kubelet sẽ `SIGKILL` trước khi app kịp dọn.

## Detailed Answer (EN)
Graceful shutdown means that on a stop signal (`SIGTERM`) the web server **stops accepting new requests** but lets in-flight requests finish within a grace period before shutting down. Without it, a container killed mid-flight returns errors for requests already in progress — a common problem during rolling updates on Kubernetes.\
\
```properties\
# Spring Boot 2.3 - 3.3: must be turned on explicitly\
server.shutdown=graceful\
# grace period for in-flight requests\
spring.lifecycle.timeout-per-shutdown-phase=30s\
```\
\
- Since **Spring Boot 3.4** graceful shutdown is **enabled by default**; set `server.shutdown=immediate` to restore the old behaviour.\
- Tomcat, Jetty and Reactor Netty stop accepting connections at the network layer.\
- When `timeout-per-shutdown-phase` elapses with requests still running, the server shuts down anyway.\
\
On Kubernetes the pod's `terminationGracePeriodSeconds` must be **larger** than this timeout, otherwise kubelet sends `SIGKILL` before the app can drain.
