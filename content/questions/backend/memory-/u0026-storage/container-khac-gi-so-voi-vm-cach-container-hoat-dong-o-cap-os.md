---
id: container-khac-gi-so-voi-vm-cach-container-hoat-dong-o-cap-os
position: backend
technology: memory-\u0026-storage
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Container khác gì so với VM? Cách container hoạt động ở cấp OS?

## Question (EN)
How do containers differ from VMs? How do containers work at the OS level?

## Đáp án chi tiết (VI)
VM (Virtual Machine) dùng hypervisor (VMware, KVM, VirtualBox) virtualize toàn bộ hardware, mỗi VM có OS kernel riêng — strong isolation, có thể chạy Windows trên Linux host; overhead: mỗi VM tốn hàng GB RAM cho OS, boot time hàng phút. Container share kernel của host OS, chỉ isolate userspace — nhỏ hơn (MB thay vì GB), start trong milliseconds, dense packing (hàng trăm containers/host).\
\
Container không phải magic: đó chỉ là Linux process với namespace isolation và cgroup resource limits. Docker thực ra tạo: (1) Namespaces: PID namespace (container có PID 1 riêng), Network namespace (interface riêng), Mount namespace (filesystem riêng), UTS (hostname riêng), IPC, User namespace; (2) cgroups giới hạn CPU/memory/disk I/O/network; (3) Union filesystem (overlay2) cho image layers. `docker run` thực sự gọi `clone(CLONE_NEWPID | CLONE_NEWNET | ...)`.\
\
Bảo mật: container escape là lỗ hổng khai thác syscall để thoát namespace; privileged container nguy hiểm vì bỏ qua nhiều restriction.

## Detailed Answer (EN)
$88
