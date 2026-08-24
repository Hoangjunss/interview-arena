---
id: terraform-workspaces-vs-directory-per-env
position: devops
technology: terraform-iac
level: mid
tags: [terraform, workspaces, environments]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh cách dùng Terraform workspaces và cách tách thư mục riêng (directory-per-environment) để quản lý nhiều môi trường (dev/staging/prod). Ưu nhược điểm và khi nào chọn cách nào?

## Question (EN)
Compare using Terraform workspaces vs. a directory-per-environment approach for managing multiple environments (dev/staging/prod). What are the trade-offs and when should you pick each?

## Đáp án chi tiết (VI)
**Cách 1 — Terraform Workspaces**: cùng một bộ code `.tf`, nhiều "workspace" (thực chất là nhiều state file riêng biệt) trong cùng một backend.
```bash
terraform workspace new dev
terraform workspace new staging
terraform workspace new prod

terraform workspace select prod
terraform apply
```
Trong code, phân biệt bằng biến đặc biệt `terraform.workspace`:
```hcl
resource "aws_instance" "web" {
  instance_type = terraform.workspace == "prod" ? "t3.large" : "t3.micro"
  tags = { Environment = terraform.workspace }
}
```

**Cách 2 — Directory per environment**: mỗi môi trường có thư mục riêng, mỗi thư mục có backend config riêng, có thể dùng chung module.
```
envs/
  dev/
    main.tf
    backend.tf     # key = "dev/terraform.tfstate"
    terraform.tfvars
  staging/
    main.tf
    backend.tf     # key = "staging/terraform.tfstate"
  prod/
    main.tf
    backend.tf     # key = "prod/terraform.tfstate"
```
Mỗi thư mục gọi cùng module dùng chung: `module "app" { source = "../../modules/app" ... }`.

**So sánh:**
| Tiêu chí | Workspaces | Directory-per-env |
|---|---|---|
| Trùng lặp code | Không (1 bộ code) | Có thể (mỗi dir tự khai báo, dù dùng chung module giảm bớt) |
| Cô lập rủi ro (blast radius) | Thấp — cùng backend config, dễ apply nhầm workspace | Cao — thư mục khác nhau, khó nhầm hơn (nhưng vẫn có thể nhầm nếu không cẩn thận `cd`) |
| Khác biệt cấu hình giữa môi trường | Khó khi khác biệt lớn (phải nhồi nhiều `if/else` bằng `terraform.workspace`) | Dễ — mỗi thư mục tùy biến tự do, kể cả version provider khác nhau |
| Quyền truy cập (IAM) riêng theo môi trường | Khó tách vì cùng backend | Dễ — mỗi thư mục có thể trỏ backend/account AWS khác nhau hoàn toàn |
| Phù hợp | Môi trường gần giống hệt nhau (ví dụ nhiều "instance" của cùng 1 feature branch preview) | Môi trường có sự khác biệt thật sự về hạ tầng, quyền hạn, compliance |

**Vì sao nhiều công ty thực tế chọn directory-per-env hơn cho dev/staging/prod:**
- Prod thường cần tài khoản AWS/GCP **hoàn toàn tách biệt** (multi-account strategy) — workspace không hỗ trợ tốt việc trỏ tới backend/provider khác nhau hoàn toàn giữa các workspace.
- Giảm rủi ro "quên đổi workspace" — một lệnh `terraform workspace select prod` gõ nhầm thành `terraform apply` khi đang ở workspace "default" là lỗi con người dễ xảy ra và khó phát hiện ngay (CLI không luôn hiển thị rõ workspace hiện tại nếu không để ý prompt).
- Cho phép version code khác nhau giữa các môi trường khi cần rollout dần (ví dụ prod chưa nâng cấp module version mới trong khi dev đã dùng).

**Khi workspace vẫn hợp lý:** tạo môi trường tạm thời ngắn hạn giống hệt nhau, ví dụ mỗi feature branch có một workspace riêng để preview (`pr-123`, `pr-456`), tự động tạo/xóa theo CI, không cần khác biệt cấu hình lớn.

## Detailed Answer (EN)
**Approach 1 — Terraform Workspaces**: the same `.tf` codebase, multiple "workspaces" (in reality, separate state files) within the same backend.
```bash
terraform workspace new dev
terraform workspace new staging
terraform workspace new prod

terraform workspace select prod
terraform apply
```
In code, differentiate using the special `terraform.workspace` variable:
```hcl
resource "aws_instance" "web" {
  instance_type = terraform.workspace == "prod" ? "t3.large" : "t3.micro"
  tags = { Environment = terraform.workspace }
}
```

**Approach 2 — Directory per environment**: each environment gets its own directory with its own backend config, optionally sharing common modules.
```
envs/
  dev/
    main.tf
    backend.tf     # key = "dev/terraform.tfstate"
    terraform.tfvars
  staging/
    main.tf
    backend.tf     # key = "staging/terraform.tfstate"
  prod/
    main.tf
    backend.tf     # key = "prod/terraform.tfstate"
```
Each directory calls the same shared module: `module "app" { source = "../../modules/app" ... }`.

**Comparison:**
| Criteria | Workspaces | Directory-per-env |
|---|---|---|
| Code duplication | None (one codebase) | Some (each dir declares its own, though shared modules reduce it) |
| Blast-radius isolation | Low — same backend config, easy to apply against the wrong workspace | High — separate directories are harder to confuse (though still possible with a wrong `cd`) |
| Handling large config differences | Hard when differences are big (requires stacking `if/else` on `terraform.workspace`) | Easy — each directory customizes freely, even different provider versions |
| Separate IAM access per environment | Hard, since backend is shared | Easy — each directory can point to a completely different backend/AWS account |
| Best for | Nearly-identical environments (e.g., multiple "instances" of the same feature-branch preview) | Environments with real infrastructure, permission, or compliance differences |

**Why many real companies prefer directory-per-env for dev/staging/prod:**
- Production often needs a **completely separate** AWS/GCP account (multi-account strategy) — workspaces don't cleanly support pointing at an entirely different backend/provider per workspace.
- Reduces the "forgot to switch workspace" risk — typing `terraform workspace select prod` and then accidentally running `terraform apply` while still on the "default" workspace is an easy, hard-to-notice human error (the CLI doesn't always make the current workspace obvious unless you check the prompt).
- Allows different code versions per environment for gradual rollout (e.g., prod hasn't upgraded to a new module version yet while dev has).

**When workspaces still make sense:** creating short-lived, nearly identical environments, e.g., a workspace per feature branch for preview environments (`pr-123`, `pr-456`), auto-created/destroyed by CI, without needing significant configuration differences.
