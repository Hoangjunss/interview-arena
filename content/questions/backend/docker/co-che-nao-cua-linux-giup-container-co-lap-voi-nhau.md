---
id: co-che-nao-cua-linux-giup-container-co-lap-voi-nhau
position: backend
technology: docker
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cơ chế nào của Linux giúp container cô lập với nhau?

## Question (EN)
Which Linux mechanisms let containers stay isolated from each other?

## Đáp án chi tiết (VI)
Docker không chạy một hypervisor. Nó dựa trên hai nhóm tính năng của Linux kernel:\
\
- **Namespaces** — cô lập *góc nhìn* của process. Mỗi container có namespace riêng cho `pid` (danh sách process), `net` (interface, IP, port), `mnt` (filesystem), `uts` (hostname), `ipc` và `user`. Nhờ đó process trong container thấy như đang chạy một mình, không thấy process hay mạng của container khác.\
- **cgroups** (control groups) — giới hạn và tính toán *tài nguyên* mỗi container được dùng: CPU, memory, block I/O, số process. Đây là cơ chế đứng sau `--memory`, `--cpus`.\
\
Gói lại: **namespaces quyết định container thấy gì**, **cgroups quyết định container dùng được bao nhiêu**. Kết hợp thêm capabilities và seccomp để giảm quyền. Vì tất cả dùng chung kernel host, một lỗ hổng kernel có thể phá vỡ ranh giới này, nên container cô lập yếu hơn VM.

## Detailed Answer (EN)
Docker does not run a hypervisor. It builds on two Linux kernel feature groups:\
\
- **Namespaces** — isolate a process's *view*. Each container gets its own namespaces for `pid` (process list), `net` (interfaces, IP, ports), `mnt` (filesystem), `uts` (hostname), `ipc` and `user`. A process inside a container therefore seems to run alone and cannot see other containers' processes or network.\
- **cgroups** (control groups) — limit and account for the *resources* each container may use: CPU, memory, block I/O, process count. This is the mechanism behind `--memory` and `--cpus`.\
\
In short: **namespaces decide what a container can see**, **cgroups decide how much it can use**. Capabilities and seccomp further reduce privileges. Because everything shares the host kernel, a kernel vulnerability can break this boundary, so containers isolate more weakly than VMs.
