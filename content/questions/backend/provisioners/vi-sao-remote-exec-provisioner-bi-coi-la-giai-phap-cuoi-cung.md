---
id: vi-sao-remote-exec-provisioner-bi-coi-la-giai-phap-cuoi-cung
position: backend
technology: provisioners
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao `remote-exec` provisioner bị coi là giải pháp cuối cùng?

## Question (EN)
Why is the `remote-exec` provisioner considered a last resort?

## Đáp án chi tiết (VI)
Kết quả của lệnh **không được ghi vào state**, nên Terraform chỉ biết provisioner đã chạy hay chưa, không biết máy đang ở cấu hình nào. Lệnh fail giữa chừng để lại resource `tainted`.\
\
```hcl\
# tranh\
provisioner \\"remote-exec\\" {\
  inline = [\\"apt-get install -y nginx\\"]\
}\
```\
\
Thay bằng, theo thứ tự ưu tiên:\
1. **AMI dựng sẵn** bằng Packer — Terraform chỉ launch máy từ image. Máy chủ thành thứ thay thế được: đổi cấu hình thì build AMI mới và replace instance.\
2. **`user_data` / cloud-init** — chạy lúc boot, được provider quản lý.\
3. **Ansible/Chef chạy sau** khi máy đã tạo, tách hẳn khỏi Terraform.\
\
Ngoại lệ chấp nhận được: `local-exec` gọi một webhook báo deploy xong. Nhưng nhớ rằng nó không idempotent, nên đừng đặt logic quan trọng vào đấy.

## Detailed Answer (EN)
Command results **are not recorded in state**, so Terraform only knows whether the provisioner ran, not what configuration the machine is in. A command failing midway leaves the resource `tainted`.\
\
```hcl\
# avoid\
provisioner \\"remote-exec\\" {\
  inline = [\\"apt-get install -y nginx\\"]\
}\
```\
\
Replace it, in order of preference:\
1. **A prebuilt AMI** via Packer — Terraform only launches from the image. Servers become replaceable: changing configuration means a new AMI and replaced instances.\
2. **`user_data` / cloud-init** — runs at boot and is managed by the provider.\
3. **Ansible or Chef afterwards**, fully separate from Terraform.\
\
An acceptable exception: a `local-exec` calling a webhook to announce the deploy. But it is not idempotent, so no important logic belongs there.
