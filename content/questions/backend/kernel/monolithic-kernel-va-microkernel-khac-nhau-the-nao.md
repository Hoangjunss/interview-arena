---
id: monolithic-kernel-va-microkernel-khac-nhau-the-nao
position: backend
technology: kernel
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Monolithic kernel và microkernel khác nhau thế nào?

## Question (EN)
How do a monolithic kernel and a microkernel differ?

## Đáp án chi tiết (VI)
Khác nhau ở việc bao nhiêu chức năng OS chạy trong không gian nhân (kernel space).\
\
**Monolithic kernel**: gần như toàn bộ dịch vụ — quản lý tiến trình, bộ nhớ, file system, driver, network stack — chạy chung trong kernel space, gọi nhau trực tiếp qua function call.\
- Ưu: hiệu năng cao (ít chuyển ngữ cảnh, không IPC giữa các thành phần).\
- Nhược: kernel lớn, một driver lỗi có thể sập cả hệ thống; khó bảo trì.\
- Ví dụ: Linux, Unix truyền thống (Linux nạp module động được nhưng vẫn là monolithic).\
\
**Microkernel**: giữ trong nhân phần tối thiểu — lập lịch cơ bản, quản lý bộ nhớ cấp thấp, IPC. Các dịch vụ khác (file system, driver, network) chạy như tiến trình ở user space, giao tiếp qua message passing.\
- Ưu: nhỏ gọn, cách ly lỗi tốt (driver sập chỉ ảnh hưởng service đó), dễ mở rộng, an toàn hơn.\
- Nhược: IPC qua ranh giới user/kernel nhiều lần → overhead, hiệu năng thường thấp hơn.\
- Ví dụ: QNX, Mach, MINIX; macOS (XNU) và Windows là hybrid.

## Detailed Answer (EN)
The difference is how much OS functionality runs in kernel space.\
\
**Monolithic kernel**: nearly all services — process and memory management, file system, drivers, network stack — run together in kernel space and call each other directly via function calls.\
- Pros: high performance (few context switches, no IPC between components).\
- Cons: a large kernel; one buggy driver can crash the whole system; harder to maintain.\
- Examples: Linux, traditional Unix (Linux loads modules dynamically but is still monolithic).\
\
**Microkernel**: keeps only the minimum in the kernel — basic scheduling, low-level memory management, IPC. Other services (file system, drivers, network) run as user-space processes communicating via message passing.\
- Pros: small, good fault isolation (a driver crash affects only that service), extensible, more secure.\
- Cons: repeated IPC across the user/kernel boundary → overhead, usually lower performance.\
- Examples: QNX, Mach, MINIX; macOS (XNU) and Windows are hybrids.
