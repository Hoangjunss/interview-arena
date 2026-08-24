---
id: container-khac-virtual-machine-o-diem-nao
position: backend
technology: docker
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Container khác Virtual Machine ở điểm nào?

## Question (EN)
How is a container different from a virtual machine?

## Đáp án chi tiết (VI)
VM ảo hóa cả phần cứng: mỗi VM chạy một guest OS đầy đủ trên hypervisor. Container ảo hóa ở tầng OS: nhiều container chia sẻ chung kernel của host, mỗi container chỉ đóng gói app cùng dependencies và một userspace riêng.\
\
Hệ quả:\
- **Kích thước / khởi động**: image container tính bằng MB, start trong mili-giây; VM tính bằng GB, boot mất giây tới phút.\
- **Cô lập**: VM cô lập mạnh hơn (ranh giới kernel riêng); container nhẹ hơn nhưng ranh giới yếu hơn vì dùng chung kernel.\
- **Mật độ**: một host chạy được nhiều container hơn VM nhờ không lặp lại guest OS.\
\
Hình dung: VM là một căn nhà riêng có móng riêng; container là các phòng trong cùng một tòa nhà, dùng chung hạ tầng nhưng có cửa khóa riêng.

## Detailed Answer (EN)
A VM virtualizes hardware: each VM runs a full guest OS on a hypervisor. A container virtualizes at the OS level: many containers share the host kernel, and each container only packages the app with its dependencies and its own userspace.\
\
Consequences:\
- **Size / startup**: container images are in MB and start in milliseconds; VMs are in GB and boot in seconds to minutes.\
- **Isolation**: VMs isolate more strongly (a separate kernel boundary); containers are lighter but have a weaker boundary because they share the kernel.\
- **Density**: one host runs more containers than VMs because the guest OS is not duplicated.\
\
Picture it: a VM is a standalone house with its own foundation; containers are rooms in one building that share infrastructure but each have their own lock.
