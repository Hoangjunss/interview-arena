---
id: ansible-inventory-basics
position: devops
technology: terraform-iac
level: junior
tags: [ansible, inventory, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Inventory trong Ansible là gì? Phân biệt static inventory và dynamic inventory, khi nào nên dùng loại nào?

## Question (EN)
What is an Ansible inventory? Distinguish static inventory from dynamic inventory, and when should each be used?

## Đáp án chi tiết (VI)
**Inventory** là danh sách các máy đích (host) mà Ansible sẽ kết nối tới và thực thi playbook, có thể nhóm các host lại thành **group** để áp dụng cấu hình khác nhau.

**Static inventory** — file tĩnh viết tay, định dạng INI hoặc YAML:
```ini
# inventory.ini
[webservers]
web01 ansible_host=10.0.1.10
web02 ansible_host=10.0.1.11

[dbservers]
db01 ansible_host=10.0.2.10

[webservers:vars]
ansible_user=deploy
ansible_ssh_private_key_file=~/.ssh/deploy.pem

[all:children]
webservers
dbservers
```
Chạy: `ansible-playbook -i inventory.ini site.yml`

**Dynamic inventory** — script hoặc plugin **tự động truy vấn** danh sách host từ nguồn thật (AWS EC2 API, GCP, Azure, hoặc CMDB nội bộ) thay vì gõ tay:
```yaml
# aws_ec2.yml (plugin inventory)
plugin: aws_ec2
regions:
  - ap-southeast-1
filters:
  tag:Environment: production
keyed_groups:
  - key: tags.Role
    prefix: role
```
Chạy: `ansible-inventory -i aws_ec2.yml --graph` để xem cây host được sinh ra tự động.

**So sánh:**
| Tiêu chí | Static | Dynamic |
|---|---|---|
| Cách quản lý | Sửa tay file | Tự động sync từ cloud API |
| Phù hợp với | Hạ tầng cố định, số lượng ít, on-prem | Cloud, auto-scaling, số lượng host thay đổi liên tục |
| Rủi ro | Dễ bị outdated (host bị xóa nhưng vẫn còn trong file) | Phụ thuộc quyền IAM/API, cần cấu hình filter đúng |
| Bảo trì | Thủ công, dễ sai khi team lớn | Ít bảo trì hơn, nhưng cần hiểu rõ tagging convention |

**Tại sao dynamic inventory quan trọng khi kết hợp Terraform:** trong pipeline thực tế, Terraform tạo ra EC2 instance với tag (`Role=webserver`, `Environment=production`), sau đó Ansible dùng dynamic inventory (plugin `aws_ec2`) để tự động phát hiện các instance mới này mà **không cần cập nhật tay** file inventory — đây là mẫu hình phổ biến "Terraform provision hạ tầng, Ansible configure bên trong hạ tầng đó".

**Gotcha thường gặp:** quên set `ansible_user` hoặc `ansible_ssh_private_key_file` đúng cho từng group trong static inventory, dẫn đến lỗi "Permission denied (publickey)" mà nhìn traceback dễ tưởng nhầm là lỗi mạng.

## Detailed Answer (EN)
An **inventory** is the list of target hosts Ansible connects to and runs playbooks against, and hosts can be organized into **groups** to apply different configuration.

**Static inventory** — a hand-written static file, INI or YAML format:
```ini
# inventory.ini
[webservers]
web01 ansible_host=10.0.1.10
web02 ansible_host=10.0.1.11

[dbservers]
db01 ansible_host=10.0.2.10

[webservers:vars]
ansible_user=deploy
ansible_ssh_private_key_file=~/.ssh/deploy.pem

[all:children]
webservers
dbservers
```
Run: `ansible-playbook -i inventory.ini site.yml`

**Dynamic inventory** — a script or plugin that **automatically queries** the host list from a real source (AWS EC2 API, GCP, Azure, or an internal CMDB) instead of typing it by hand:
```yaml
# aws_ec2.yml (inventory plugin)
plugin: aws_ec2
regions:
  - ap-southeast-1
filters:
  tag:Environment: production
keyed_groups:
  - key: tags.Role
    prefix: role
```
Run: `ansible-inventory -i aws_ec2.yml --graph` to see the auto-generated host tree.

**Comparison:**
| Criteria | Static | Dynamic |
|---|---|---|
| Management style | Manual file editing | Auto-synced from cloud API |
| Best for | Fixed infrastructure, small count, on-prem | Cloud, auto-scaling, constantly changing host count |
| Risk | Easily goes stale (host removed but still in the file) | Depends on IAM/API permissions, needs correct filters |
| Maintenance | Manual, error-prone at scale | Less upkeep, but requires understanding the tagging convention |

**Why dynamic inventory matters alongside Terraform:** in a real pipeline, Terraform creates EC2 instances tagged (`Role=webserver`, `Environment=production`), and Ansible then uses a dynamic inventory (the `aws_ec2` plugin) to automatically discover these new instances **without manually updating an inventory file** — a common pattern of "Terraform provisions the infrastructure, Ansible configures inside it."

**Common gotcha:** forgetting to set `ansible_user` or `ansible_ssh_private_key_file` correctly per group in a static inventory causes "Permission denied (publickey)" errors, which are easy to misdiagnose as a network problem.
