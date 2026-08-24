---
id: terraform-variables-and-tfvars
position: devops
technology: terraform-iac
level: junior
tags: [terraform, variables, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Terraform có những cách nào để truyền giá trị vào biến (`variable`)? Thứ tự ưu tiên giữa các cách đó là gì?

## Question (EN)
What are the different ways to set variable values in Terraform? What is the precedence order between them?

## Đáp án chi tiết (VI)
Khai báo biến trong Terraform:
```hcl
variable "instance_type" {
  type        = string
  description = "EC2 instance type"
  default     = "t3.micro"
}

variable "db_password" {
  type      = string
  sensitive = true
}
```

**Các cách truyền giá trị (từ ưu tiên thấp đến cao — cái sau ghi đè cái trước):**
1. **`default`** trong block `variable` — giá trị mặc định nếu không có gì khác.
2. **File `terraform.tfvars`** hoặc `*.auto.tfvars` — tự động load, không cần flag.
3. **File `.tfvars` chỉ định qua `-var-file`** — nạp theo thứ tự xuất hiện trên dòng lệnh.
4. **Biến môi trường `TF_VAR_<name>`** — ví dụ `export TF_VAR_db_password=xxx`.
5. **Flag `-var` trên CLI** — `terraform apply -var="instance_type=t3.small"` — ưu tiên cao nhất.

**Ví dụ thực tế:**
```bash
# terraform.tfvars
instance_type = "t3.medium"

# CLI ghi đè lại thành t3.large
terraform apply -var="instance_type=t3.large"
```
→ Kết quả cuối cùng dùng `t3.large` vì `-var` có độ ưu tiên cao nhất.

**`sensitive = true`**: Terraform sẽ **ẩn giá trị** khỏi output của `plan`/`apply` trên console (hiện `(sensitive value)`), nhưng **vẫn lưu plaintext trong state file** — đây là điểm dễ bị hỏi bẫy: `sensitive` chỉ che ở output hiển thị, không phải mã hóa thật sự. Muốn bảo vệ thật sự cần kết hợp remote backend có mã hóa (S3 + SSE-KMS) và hạn chế quyền đọc state.

**Best practice phổ biến ở công ty thực tế:**
- Dùng file `terraform.tfvars` riêng cho từng môi trường: `dev.tfvars`, `staging.tfvars`, `prod.tfvars`, nạp qua `-var-file=prod.tfvars`.
- Không commit `.tfvars` chứa secret vào Git — dùng `.gitignore` hoặc để secret đi qua biến môi trường/secret manager (Vault, AWS Secrets Manager) thay vì tfvars.
- Validate input với block `validation` để tránh giá trị sai lọt vào production:
```hcl
variable "environment" {
  type = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment phải là dev, staging hoặc prod."
  }
}
```

## Detailed Answer (EN)
Declaring a variable in Terraform:
```hcl
variable "instance_type" {
  type        = string
  description = "EC2 instance type"
  default     = "t3.micro"
}

variable "db_password" {
  type      = string
  sensitive = true
}
```

**Ways to supply values (lowest to highest precedence — later overrides earlier):**
1. **`default`** in the `variable` block — used when nothing else is provided.
2. **`terraform.tfvars`** or `*.auto.tfvars` file — loaded automatically, no flag needed.
3. **A `.tfvars` file passed via `-var-file`** — loaded in the order given on the command line.
4. **Environment variable `TF_VAR_<name>`** — e.g. `export TF_VAR_db_password=xxx`.
5. **CLI flag `-var`** — `terraform apply -var="instance_type=t3.small"` — highest precedence.

**Practical example:**
```bash
# terraform.tfvars
instance_type = "t3.medium"

# CLI overrides it to t3.large
terraform apply -var="instance_type=t3.large"
```
→ The final value used is `t3.large` because `-var` has the highest precedence.

**`sensitive = true`**: Terraform **hides the value** from `plan`/`apply` console output (shows `(sensitive value)`), but it is **still stored in plaintext in the state file** — a common trick question: `sensitive` only masks the displayed output, it is not real encryption. Real protection requires an encrypted remote backend (S3 + SSE-KMS) plus tightly restricted read access to the state.

**Common real-world best practices:**
- Use a separate `.tfvars` file per environment: `dev.tfvars`, `staging.tfvars`, `prod.tfvars`, loaded via `-var-file=prod.tfvars`.
- Never commit a `.tfvars` file containing secrets to Git — `.gitignore` it, or route secrets through environment variables/a secret manager (Vault, AWS Secrets Manager) instead of tfvars.
- Validate inputs with a `validation` block to keep bad values out of production:
```hcl
variable "environment" {
  type = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be dev, staging, or prod."
  }
}
```
