---
id: container-va-may-ao-vm-khac-nhau-the-nao-docker-giai-quyet-van-de-gi
position: backend
technology: containers
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Container và máy ảo (VM) khác nhau thế nào? Docker giải quyết vấn đề gì?

## Question (EN)
How do containers differ from virtual machines, and what problem does Docker solve?

## Đáp án chi tiết (VI)
- **Máy ảo (VM)**: ảo hóa **phần cứng** qua hypervisor; mỗi VM chạy **hệ điều hành khách đầy đủ** riêng. Cô lập mạnh, nhưng nặng (hàng GB, khởi động chậm hàng chục giây).\
- **Container**: ảo hóa ở tầng **hệ điều hành**; các container **dùng chung kernel của host** nhưng chạy trong không gian tiến trình/tệp cô lập. Nhẹ (hàng MB), khởi động trong mili-giây, chạy được nhiều container hơn trên cùng phần cứng.\
\
**Docker** đóng gói ứng dụng **cùng toàn bộ phụ thuộc** (thư viện, runtime, config) vào một **image** bất biến; image chạy giống nhau ở mọi nơi hỗ trợ container. Điều này giải quyết vấn đề thường gặp \\"chạy được trên máy tôi mà\\" — môi trường dev/test/prod đồng nhất.\
\
Đánh đổi: container **cô lập yếu hơn VM** vì chung kernel — cần cân nhắc với workload nhạy cảm về bảo mật/đa khách hàng.

## Detailed Answer (EN)
- **Virtual machine (VM)**: virtualizes **hardware** via a hypervisor; each VM runs a **full guest OS**. Strong isolation, but heavy (gigabytes, tens of seconds to boot).\
- **Container**: virtualizes at the **OS level**; containers **share the host kernel** but run in isolated process/filesystem space. Lightweight (megabytes), boots in milliseconds, packs more per machine.\
\
**Docker** bundles an application **with all its dependencies** (libraries, runtime, config) into an immutable **image** that runs identically anywhere containers are supported. This solves the classic \\"works on my machine\\" problem — dev/test/prod environments match.\
\
Trade-off: containers have **weaker isolation than VMs** because they share the kernel — weigh that for security-sensitive/multi-tenant workloads.
