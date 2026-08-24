---
id: terraform-destroy-command-risks
position: devops
technology: terraform-iac
level: junior
tags: [terraform, destroy, safety]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`terraform destroy` làm gì? Có những cơ chế nào để bảo vệ resource quan trọng khỏi bị destroy nhầm?

## Question (EN)
What does `terraform destroy` do? What mechanisms exist to protect critical resources from being accidentally destroyed?

## Đáp án chi tiết (VI)
**`terraform destroy`** xóa **toàn bộ resource** đang được quản lý trong state hiện tại — về bản chất là `terraform apply` với kế hoạch "xóa mọi thứ". Thường dùng để dọn dẹp môi trường dev/staging/demo tạm thời, **hiếm khi** dùng trực tiếp trên production.

**Ví dụ:**
```bash
terraform destroy
# hoặc xem trước
terraform plan -destroy
# hoặc chỉ xóa một resource cụ thể
terraform destroy -target=aws_instance.web
```

**Vì sao nguy hiểm:** một lệnh `destroy` chạy nhầm thư mục (sai workspace, sai biến môi trường trỏ backend), hoặc chạy nhầm trên production thay vì staging, có thể **xóa sạch database, load balancer, toàn bộ VPC** trong vài phút — rất khó khôi phục nếu không có backup.

**Các cơ chế bảo vệ thực tế:**

1. **`lifecycle { prevent_destroy = true }`** — chặn Terraform xóa resource này dù `destroy` hay `apply` có kế hoạch xóa nó:
```hcl
resource "aws_db_instance" "prod" {
  # ...
  lifecycle {
    prevent_destroy = true
  }
}
```
Nếu ai đó chạy destroy, Terraform sẽ báo lỗi và dừng lại thay vì xóa.

2. **Deletion protection ở cấp cloud provider** — độc lập với Terraform, ví dụ RDS có `deletion_protection = true`, S3 bucket có MFA delete, EC2 có `disable_api_termination = true`. Đây là lớp bảo vệ **thứ hai**, hữu ích ngay cả khi ai đó thao tác ngoài Terraform.

3. **Tách state theo môi trường** (workspace hoặc directory-per-env) để `destroy` ở dev **không thể** vô tình chạm vào state của prod.

4. **Quyền IAM giới hạn**: pipeline CI/CD chạy với credential riêng cho từng môi trường; credential prod nên **không có quyền chạy `destroy`** qua policy IAM riêng, chỉ cho phép qua approval flow đặc biệt.

5. **Backend có versioning + MFA delete** (ví dụ S3 backend) để dù state bị xóa/ghi đè vẫn khôi phục được version cũ.

6. **Quy trình review bắt buộc**: `terraform plan -destroy` phải được human review trong PR/pipeline trước khi ai đó bấm approve, không bao giờ để `-auto-approve` cho lệnh destroy trên production.

**Câu chuyện thực tế hay được kể trong phỏng vấn:** một kỹ sư chạy `terraform destroy` khi tưởng đang ở thư mục `envs/dev` nhưng thực ra đang ở `envs/prod` do quên `cd` — nếu không có `prevent_destroy` và review bắt buộc, toàn bộ production sẽ biến mất trong một lệnh.

## Detailed Answer (EN)
**`terraform destroy`** deletes **every resource** currently managed in the state — essentially an `apply` whose plan is "delete everything." It's typically used to tear down temporary dev/staging/demo environments and **rarely** run directly against production.

**Example:**
```bash
terraform destroy
# or preview first
terraform plan -destroy
# or destroy just one resource
terraform destroy -target=aws_instance.web
```

**Why it's dangerous:** running `destroy` in the wrong directory (wrong workspace, environment variable pointing at the wrong backend), or accidentally targeting production instead of staging, can **wipe out a database, load balancer, or entire VPC** within minutes — very hard to recover from without backups.

**Real-world protection mechanisms:**

1. **`lifecycle { prevent_destroy = true }`** — blocks Terraform from destroying this resource whether via `destroy` or an `apply` whose plan would delete it:
```hcl
resource "aws_db_instance" "prod" {
  # ...
  lifecycle {
    prevent_destroy = true
  }
}
```
If someone runs destroy, Terraform errors out and stops instead of deleting.

2. **Cloud-provider-level deletion protection** — independent of Terraform, e.g. RDS `deletion_protection = true`, S3 MFA delete, EC2 `disable_api_termination = true`. This is a **second layer** of protection, useful even against actions taken outside Terraform.

3. **Splitting state by environment** (workspaces or directory-per-env) so a `destroy` in dev **cannot** accidentally touch prod's state.

4. **Restricted IAM permissions**: CI/CD pipelines run with per-environment credentials; production credentials should **not** have permission to run `destroy` via a dedicated IAM policy, allowing it only through a special approval flow.

5. **A backend with versioning + MFA delete** (e.g., S3 backend) so even if the state is deleted/overwritten, a prior version can be restored.

6. **Mandatory review process**: `terraform plan -destroy` must go through human review in a PR/pipeline before anyone approves it — never use `-auto-approve` for a destroy on production.

**A war story commonly told in interviews:** an engineer ran `terraform destroy` thinking they were in the `envs/dev` directory but had actually forgotten to `cd` and was in `envs/prod` — without `prevent_destroy` and mandatory review, all of production would vanish with one command.
