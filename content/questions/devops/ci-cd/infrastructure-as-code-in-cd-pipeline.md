---
id: infrastructure-as-code-in-cd-pipeline
position: devops
technology: ci-cd
level: mid
tags: [infrastructure-as-code, terraform, pipeline-design]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao tích hợp Infrastructure as Code (Terraform) vào CI/CD pipeline một cách an toàn? Vì sao không nên chạy `terraform apply` trực tiếp từ máy cá nhân?

## Question (EN)
How do you safely integrate Infrastructure as Code (Terraform) into a CI/CD pipeline? Why shouldn't you run `terraform apply` directly from a personal machine?

## Đáp án chi tiết (VI)
Chạy Terraform từ máy cá nhân có nhiều rủi ro: **state file không đồng bộ** giữa các thành viên, **thiếu audit trail** (ai apply, khi nào, thay đổi gì), **credential rộng quyền nằm trên máy cá nhân**, và **không có review trước khi apply**. Đưa Terraform vào CI/CD giải quyết toàn bộ các vấn đề này.

**Pipeline Terraform chuẩn (GitOps-style):**

```yaml
name: Terraform
on:
  pull_request:
    paths: ['infra/**']
  push:
    branches: [main]
    paths: ['infra/**']

jobs:
  plan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
        working-directory: infra
      - run: terraform plan -out=tfplan
        working-directory: infra
      - name: Post plan to PR
        uses: actions/github-script@v7
        with:
          script: |
            # post terraform plan output as PR comment for review

  apply:
    needs: plan
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production   # yêu cầu manual approval
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
        working-directory: infra
      - run: terraform apply -auto-approve tfplan
        working-directory: infra
```

**Các nguyên tắc an toàn quan trọng:**

1. **`terraform plan` trên PR, `terraform apply` chỉ trên `main` sau khi merge:** cho phép review chính xác thay đổi hạ tầng nào sẽ xảy ra TRƯỚC khi apply — giống code review nhưng cho infrastructure. Plan output nên được post làm comment trên PR để reviewer thấy rõ ("+3 to add, ~1 to change, -0 to destroy").

2. **Remote state với locking:**
```hcl
terraform {
  backend "s3" {
    bucket         = "company-terraform-state"
    key            = "prod/network.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "terraform-locks"   # ngăn 2 apply chạy đồng thời
  }
}
```
Nếu không có locking, 2 pipeline chạy song song (hoặc 1 dev chạy local + 1 CI chạy) có thể ghi đè state của nhau, gây corrupt state hoặc apply race condition.

3. **Không dùng static credential dài hạn:** dùng OIDC để CI lấy short-lived token từ AWS/GCP, tránh lưu access key vĩnh viễn trong secrets.

4. **Áp dụng đầy đủ quality gate như code:** `terraform fmt -check`, `terraform validate`, `tflint`, và security scan hạ tầng (`tfsec`, `checkov`) để bắt lỗi cấu hình (ví dụ security group mở `0.0.0.0/0` cho port 22) trước khi apply.

5. **Approval bắt buộc cho apply lên production:** dùng GitHub Environment protection rule hoặc tương đương — không auto-apply vô điều kiện lên production dù plan pipeline pass, vì thay đổi hạ tầng (đặc biệt destroy resource) có thể không thể hoàn tác (mất dữ liệu nếu xóa nhầm DB).

**Vì sao không chạy từ máy cá nhân:**

| Vấn đề | Hậu quả |
|---|---|
| State file lưu local hoặc không khóa | 2 người apply cùng lúc gây conflict, state drift |
| Credential admin lưu trên máy cá nhân | Rủi ro nếu máy bị compromise, khó revoke tập trung |
| Không có review trước khi apply | Lỗi cấu hình (ví dụ region sai, xóa nhầm resource) lên production trực tiếp không ai kiểm tra |
| Không có audit trail | Không biết ai đã đổi gì, khi nào — khó điều tra khi có sự cố |
| Terraform version không đồng nhất | Máy A dùng Terraform 1.5, máy B dùng 1.8 có thể tạo state khác nhau không tương thích |

**Pitfall:** Apply thủ công một lần "cho nhanh" trong lúc khẩn cấp rồi quên đồng bộ lại state với pipeline CI — lần chạy CI tiếp theo phát hiện drift (khác biệt giữa state và thực tế hạ tầng) và có thể vô tình destroy resource vừa tạo thủ công.

## Detailed Answer (EN)
Running Terraform from a personal machine carries many risks: **out-of-sync state files** across team members, **no audit trail** (who applied what, when), **broad-permission credentials sitting on a personal machine**, and **no review before applying**. Bringing Terraform into CI/CD solves all of these.

**A standard Terraform pipeline (GitOps-style):**

```yaml
name: Terraform
on:
  pull_request:
    paths: ['infra/**']
  push:
    branches: [main]
    paths: ['infra/**']

jobs:
  plan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
        working-directory: infra
      - run: terraform plan -out=tfplan
        working-directory: infra
      - name: Post plan to PR
        uses: actions/github-script@v7
        with:
          script: |
            # post terraform plan output as PR comment for review

  apply:
    needs: plan
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production   # requires manual approval
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
        working-directory: infra
      - run: terraform apply -auto-approve tfplan
        working-directory: infra
```

**Key safety principles:**

1. **`terraform plan` on PRs, `terraform apply` only on `main` after merge:** lets reviewers see exactly what infrastructure change will happen BEFORE it's applied — code review, but for infrastructure. The plan output should be posted as a PR comment so reviewers can see clearly ("+3 to add, ~1 to change, -0 to destroy").

2. **Remote state with locking:**
```hcl
terraform {
  backend "s3" {
    bucket         = "company-terraform-state"
    key            = "prod/network.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "terraform-locks"   # prevents two concurrent applies
  }
}
```
Without locking, two pipelines running in parallel (or one local dev run plus one CI run) can overwrite each other's state, causing state corruption or an apply race condition.

3. **No long-lived static credentials:** use OIDC so CI fetches a short-lived token from AWS/GCP, avoiding a permanently stored access key in secrets.

4. **Full quality gates, just like code:** `terraform fmt -check`, `terraform validate`, `tflint`, and infrastructure security scanning (`tfsec`, `checkov`) to catch misconfigurations (e.g. a security group open to `0.0.0.0/0` on port 22) before applying.

5. **Mandatory approval for production apply:** use a GitHub Environment protection rule or equivalent — never unconditionally auto-apply to production even if the plan pipeline passes, since infrastructure changes (especially resource destruction) can be irreversible (data loss if a DB gets deleted by mistake).

**Why not run it from a personal machine:**

| Problem | Consequence |
|---|---|
| State file stored locally or unlocked | Two people applying simultaneously causes conflicts, state drift |
| Admin credentials stored on a personal machine | Risk if the machine is compromised, hard to revoke centrally |
| No review before applying | Config mistakes (wrong region, accidental resource deletion) go straight to production unchecked |
| No audit trail | No record of who changed what, when — hard to investigate an incident |
| Inconsistent Terraform versions | Machine A on Terraform 1.5, machine B on 1.8 can produce incompatible state |

**Pitfall:** Applying manually "just this once" for speed during an emergency and forgetting to resync state with the CI pipeline — the next CI run detects drift (a mismatch between state and actual infrastructure) and could accidentally destroy the resource just created manually.