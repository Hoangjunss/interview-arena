---
id: container-va-may-ao-vm-khac-nhau-the-nao
position: backend
technology: docker
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Container và máy ảo (VM) khác nhau thế nào?

## Question (EN)
What is the difference between a container and a virtual machine (VM)?

## Đáp án chi tiết (VI)
Khác nhau ở **mức ảo hóa**:\
\
- **VM**: ảo hóa **phần cứng** qua hypervisor. Mỗi VM chạy **một OS đầy đủ** (guest kernel riêng) → nặng vài GB, khởi động chậm (tính bằng phút), nhưng **cách ly mạnh**.\
- **Container**: ảo hóa **hệ điều hành**. Các container **dùng chung kernel của host**, chỉ đóng gói app + thư viện phụ thuộc → nhẹ (tính bằng MB), khởi động nhanh (tính bằng giây), mật độ cao. Cách ly ở mức tiến trình (namespace + cgroups), yếu hơn VM.\
\
Hệ quả: container hợp cho **microservice, CI/CD, scale nhanh**; VM hợp khi cần **cách ly mạnh** hoặc chạy **OS/kernel khác**. Không loại trừ nhau — thực tế thường chạy container **bên trong** VM (như node của cloud).

## Detailed Answer (EN)
They differ in the **level of virtualization**:\
\
- **VM**: virtualizes the **hardware** via a hypervisor. Each VM runs a **full OS** (its own guest kernel) → several GB, slow to boot (minutes), but **strong isolation**.\
- **Container**: virtualizes the **operating system**. Containers **share the host kernel** and only package the app + its dependencies → lightweight (MB), fast to start (seconds), high density. Isolation is at the process level (namespaces + cgroups), weaker than a VM.\
\
Consequence: containers fit **microservices, CI/CD, fast scaling**; VMs fit when you need **strong isolation** or a **different OS/kernel**. They are not mutually exclusive — in practice containers often run **inside** VMs (like cloud nodes).
