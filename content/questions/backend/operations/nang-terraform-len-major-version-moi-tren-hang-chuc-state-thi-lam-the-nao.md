---
id: nang-terraform-len-major-version-moi-tren-hang-chuc-state-thi-lam-the-nao
position: backend
technology: operations
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Nâng Terraform lên major version mới trên hàng chục state thì làm thế nào?

## Question (EN)
How do you upgrade Terraform to a new major version across dozens of states?

## Đáp án chi tiết (VI)
Nâng **từng state một, bắt đầu từ dev/staging**. State format được nâng cấp khi chạy lần đầu bằng version mới, và version cũ có thể không đọc lại được.\
\
```bash\
cp terraform.tfstate backup-$(git rev-parse --short HEAD).tfstate\
tfenv use 1.9.0\
terraform init -upgrade\
terraform plan            # phai ra \\"No changes\\" truoc khi qua state tiep theo\
```\
\
Chuẩn bị: đọc upgrade guide cho breaking change, backup state, và pin version trong `required_version` để mọi máy và CI dùng đồng nhất sau khi nâng.\
\
```hcl\
terraform { required_version = \\"~\u003e 1.9.0\\" }\
```\
\
Điểm về teamwork: sau khi một người chạy version mới trên một state, **người khác dùng version cũ sẽ không chạy được nữa**. Việc nâng phải được thông báo và làm dứt điểm cho từng state.\
\
Nhịp độ: nâng đều theo từng minor để mỗi lần chỉ tốn ít công. Để tụt lại nhiều major khiến việc nâng cấp thành một dự án riêng.

## Detailed Answer (EN)
Upgrade **one state at a time, starting with dev and staging**. The state format is upgraded on the first run with the new version, and the old version may no longer read it.\
\
```bash\
cp terraform.tfstate backup-$(git rev-parse --short HEAD).tfstate\
tfenv use 1.9.0\
terraform init -upgrade\
terraform plan            # must report \\"No changes\\" before moving on\
```\
\
Preparation: read the upgrade guide for breaking changes, back up state, and pin `required_version` so machines and CI stay consistent afterwards.\
\
```hcl\
terraform { required_version = \\"~\u003e 1.9.0\\" }\
```\
\
A teamwork point: once someone runs the new version against a state, **others on the old version can no longer run it**. The upgrade must be announced and finished per state.\
\
Cadence: upgrade steadily minor by minor so each step is small. Falling several majors behind turns the upgrade into its own project.
