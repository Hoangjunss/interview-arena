---
id: variable-nhan-gia-tri-theo-thu-tu-uu-tien-nao-va-secret-nen-truyen-kieu-gi
position: backend
technology: variables
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Variable nhận giá trị theo thứ tự ưu tiên nào, và secret nên truyền kiểu gì?

## Question (EN)
What is variable precedence, and how should secrets be passed?

## Đáp án chi tiết (VI)
Từ thấp lên cao: `default` trong block `variable`, rồi `TF_VAR_*`, rồi `terraform.tfvars` / `*.auto.tfvars`, rồi `-var-file`, cao nhất là `-var` trên CLI.\
\
```bash\
export TF_VAR_db_password=...                  # env, thấp\
terraform apply -var-file=prod.tfvars          # cao hơn\
terraform apply -var=\\"instance_type=t3.large\\"  # thắng tất cả\
```\
\
Cấu trúc thường dùng: mỗi env một file `prod.tfvars` / `staging.tfvars`, commit vào repo, trừ secret. Khác biệt giữa hai env nằm rõ trong diff file đó.\
\
Secret thì **không đặt trong tfvars đã commit**. Ba cách phổ biến:\
- `TF_VAR_*` inject từ CI secret store.\
- `data \\"aws_secretsmanager_secret_version\\"` đọc động lúc apply.\
- Cho AWS tự sinh (`manage_master_user_password = true`) rồi chỉ tham chiếu ARN.\
\
Đánh `sensitive = true` chỉ che output, **không mã hoá**, giá trị vẫn nằm nguyên trong state.

## Detailed Answer (EN)
From lowest to highest: `default` in the `variable` block, then `TF_VAR_*`, then `terraform.tfvars` / `*.auto.tfvars`, then `-var-file`, with `-var` on the CLI highest.\
\
```bash\
export TF_VAR_db_password=...                  # env, low\
terraform apply -var-file=prod.tfvars          # higher\
terraform apply -var=\\"instance_type=t3.large\\"  # beats everything\
```\
\
A common layout: one file per environment, `prod.tfvars` / `staging.tfvars`, committed except for secrets. Differences between environments show up in that file diff.\
\
Secrets **do not belong in committed tfvars**. Three common options:\
- `TF_VAR_*` injected from the CI secret store.\
- `data \\"aws_secretsmanager_secret_version\\"` read at apply time.\
- Let AWS generate it (`manage_master_user_password = true`) and reference the ARN.\
\
Marking `sensitive = true` only hides output, it **does not encrypt** — the value still sits in state.
