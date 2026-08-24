---
id: ansible-la-gi-khac-terraform-the-nao
position: backend
technology: iac
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ansible là gì? Khác Terraform thế nào?

## Question (EN)
What is Ansible and how does it differ from Terraform?

## Đáp án chi tiết (VI)
Ansible là công cụ **automation / configuration management** — cấu hình máy, cài phần mềm, deploy ứng dụng bằng cách khai báo.\
\
Đặc điểm chính:\
- **Agentless**: không cần cài agent trên máy đích, chỉ cần **SSH + Python** — kết nối, đẩy module, thực thi rồi ngắt.\
- **Playbook YAML**: mô tả trạng thái mong muốn dạng dễ đọc; **inventory** liệt kê host.\
- **Idempotent**: chạy lại nhiều lần cho **cùng kết quả**, không làm hỏng nếu đã ở trạng thái đúng.\
\
Khác **Terraform**:\
- **Terraform** mạnh về **provisioning hạ tầng** (tạo VPC, EC2, load balancer...) theo mô hình **declarative + state file**.\
- **Ansible** mạnh về **cấu hình bên trong máy** (cài package, sửa file config, khởi động service), thiên hướng theo bước (task tuần tự).\
\
Thực tế hay **dùng chung**: Terraform dựng hạ tầng, rồi Ansible cấu hình phần mềm bên trong.

## Detailed Answer (EN)
Ansible is an **automation / configuration management** tool — it configures machines, installs software and deploys apps declaratively.\
\
Key traits:\
- **Agentless**: no agent on the target, just **SSH + Python** — connect, push modules, execute, disconnect.\
- **YAML playbooks**: describe the desired state in a readable form; an **inventory** lists hosts.\
- **Idempotent**: running it repeatedly yields the **same result**, doing no harm if already in the right state.\
\
Vs **Terraform**:\
- **Terraform** excels at **infrastructure provisioning** (creating VPCs, EC2, load balancers...) with a **declarative + state file** model.\
- **Ansible** excels at **in-machine configuration** (install packages, edit config files, start services), leaning toward sequential tasks.\
\
In practice they are **used together**: Terraform provisions the infrastructure, then Ansible configures the software inside.
