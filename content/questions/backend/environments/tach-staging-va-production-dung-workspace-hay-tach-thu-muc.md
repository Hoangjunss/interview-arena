---
id: tach-staging-va-production-dung-workspace-hay-tach-thu-muc
position: backend
technology: environments
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tách staging và production: dùng workspace hay tách thư mục?

## Question (EN)
Separating staging and production: workspaces or separate directories?

## Đáp án chi tiết (VI)
Dự án lớn thường **tách thư mục**, mỗi env một state riêng, cùng gọi chung module. Workspace hợp cho env tạm và ngắn hạn.\
\
```text\
envs/\
  prod/     main.tf  prod.tfvars     backend key = prod/terraform.tfstate\
  staging/  main.tf  staging.tfvars  backend key = staging/terraform.tfstate\
modules/\
  network/  service/\
```\
\
Vì sao thư mục thắng ở production:\
- Khác biệt giữa hai env **hiện ra trong code**, review được.\
- Backend, IAM role và quyền apply tách hẳn nhau.\
- Không có rủi ro `terraform workspace select` nhầm rồi apply vào production.\
\
```bash\
terraform workspace new pr-1234   # hop cho env tam theo branch\
```\
\
Điểm phải giữ dù chọn cách nào: khác biệt giữa hai env là **giá trị được khai báo rõ** (instance type, replica count), không phải khác về cấu trúc. Cấu trúc đã khác thì staging không còn kiểm chứng được gì.

## Detailed Answer (EN)
Large projects usually **split directories**, one state per environment, all calling shared modules. Workspaces suit short-lived temporary environments.\
\
```text\
envs/\
  prod/     main.tf  prod.tfvars     backend key = prod/terraform.tfstate\
  staging/  main.tf  staging.tfvars  backend key = staging/terraform.tfstate\
modules/\
  network/  service/\
```\
\
Why directories win in production:\
- Differences between environments **appear in code** and can be reviewed.\
- Backend, IAM role and apply permissions are fully separated.\
- No risk of a wrong `terraform workspace select` followed by an apply into production.\
\
```bash\
terraform workspace new pr-1234   # good for a per-branch temporary environment\
```\
\
What to preserve either way: differences must be **declared values** (instance type, replica count), not structural. Once structures diverge, staging validates nothing.
