---
id: terraform-drift-detection
position: devops
technology: terraform-iac
level: mid
tags: [terraform, drift, monitoring]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Configuration drift trong Terraform là gì? Làm sao phát hiện và xử lý drift trong một pipeline thực tế?

## Question (EN)
What is configuration drift in Terraform? How do you detect and handle drift in a real-world pipeline?

## Đáp án chi tiết (VI)
**Drift** xảy ra khi **trạng thái thật** của hạ tầng trên cloud **khác** với những gì được mô tả trong state file/code Terraform — thường do ai đó sửa tay qua console/CLI provider, do resource tự thay đổi (ví dụ AWS tự patch AMI), hoặc do một công cụ khác (script, Ansible) chỉnh sửa cùng resource.

**Ví dụ drift điển hình:** một kỹ sư vào AWS Console mở thêm port 8080 trên security group để debug gấp sự cố production, nhưng quên cập nhật lại code Terraform tương ứng. Từ lúc đó, security group thật có 2 port mở nhưng code chỉ khai báo 1 port → **drift**.

**Phát hiện drift bằng `terraform plan`:**
```bash
terraform plan
```
Terraform mặc định **refresh** state trước khi tính plan — nếu phát hiện thực tế khác code, nó sẽ hiện ra như một thay đổi cần "sửa lại cho khớp code":
```
  ~ resource "aws_security_group" "web" {
      ~ ingress {
          - { from_port = 8080, to_port = 8080, ... } -> null
        }
    }

Plan: 0 to add, 1 to change, 0 to destroy.
```
Đây chính là dấu hiệu drift — plan không phải do ai sửa code, mà do thực tế bị lệch.

**Phát hiện drift chủ động, không apply (an toàn hơn để chỉ giám sát):**
```bash
terraform plan -refresh-only -out=drift.tfplan
terraform show -json drift.tfplan | jq '.resource_changes'
```
- `-refresh-only` chỉ đồng bộ state theo thực tế, **không** tính thay đổi từ code, giúp tách bạch rõ "đây là drift" khỏi "đây là thay đổi do code mới".

**Thiết lập drift detection tự động trong pipeline thực tế:**
1. **Scheduled job** (cron trong CI, ví dụ mỗi đêm) chạy `terraform plan -detailed-exitcode`:
   - Exit code `0`: không có thay đổi (không drift).
   - Exit code `1`: lỗi.
   - Exit code `2`: có thay đổi (có drift) → pipeline gửi cảnh báo (Slack, email) cho team, **không tự động apply**.
2. Team review drift: quyết định **chấp nhận thực tế** (chạy `terraform apply -refresh-only` để cập nhật state khớp thực tế, rồi sửa code cho khớp) hoặc **revert thực tế về đúng code** (chạy `apply` bình thường để Terraform tự sửa lại resource).
3. **Terraform Cloud/Enterprise** có tính năng "Drift Detection" tích hợp sẵn, tự động chạy health-check theo lịch và cảnh báo qua UI/webhook.

**Vì sao không nên tự động `apply` khi phát hiện drift:** thay đổi tay đôi khi là **có chủ đích** (hotfix khẩn cấp), nếu pipeline tự động apply và revert ngay lập tức, có thể **xóa mất bản vá khẩn cấp** đang bảo vệ hệ thống, gây sự cố lặp lại. Luôn cần con người review trước khi quyết định apply.

**Best practice giảm drift:** khóa quyền IAM để không ai (kể cả admin) sửa trực tiếp resource được quản lý bởi Terraform ngoài pipeline CI/CD; mọi thay đổi khẩn cấp phải được ghi lại và đồng bộ ngược vào code trong vòng 24h.

## Detailed Answer (EN)
**Drift** occurs when the **real state** of cloud infrastructure **differs** from what's described in the Terraform state/code — usually because someone made a manual change via the console/provider CLI, a resource changed on its own (e.g., AWS auto-patching an AMI), or another tool (a script, Ansible) modified the same resource.

**A typical drift example:** an engineer opens port 8080 on a security group via the AWS Console to urgently debug a production incident, but forgets to update the corresponding Terraform code. From that point, the real security group has 2 open ports while the code only declares 1 — **drift**.

**Detecting drift with `terraform plan`:**
```bash
terraform plan
```
By default, Terraform **refreshes** state before computing the plan — if reality differs from the code, it shows up as a change needed to "match the code again":
```
  ~ resource "aws_security_group" "web" {
      ~ ingress {
          - { from_port = 8080, to_port = 8080, ... } -> null
        }
    }

Plan: 0 to add, 1 to change, 0 to destroy.
```
This is a drift signal — the plan isn't from anyone editing code, but from reality having diverged.

**Proactively detecting drift without applying (safer, monitoring-only):**
```bash
terraform plan -refresh-only -out=drift.tfplan
terraform show -json drift.tfplan | jq '.resource_changes'
```
- `-refresh-only` only reconciles state with reality, **without** factoring in code changes, clearly separating "this is drift" from "this is a change from new code."

**Setting up automatic drift detection in a real pipeline:**
1. A **scheduled job** (a CI cron, e.g., nightly) runs `terraform plan -detailed-exitcode`:
   - Exit code `0`: no changes (no drift).
   - Exit code `1`: error.
   - Exit code `2`: changes detected (drift) → pipeline sends an alert (Slack, email) to the team, **without auto-applying**.
2. The team reviews the drift and decides to either **accept reality** (run `terraform apply -refresh-only` to update state to match reality, then fix the code accordingly) or **revert reality back to the code** (run a normal `apply` so Terraform fixes the resource).
3. **Terraform Cloud/Enterprise** has built-in "Drift Detection" that runs a scheduled health-check automatically and alerts via UI/webhook.

**Why you shouldn't auto-apply on drift:** manual changes are sometimes **intentional** (an emergency hotfix); if a pipeline auto-applies and instantly reverts it, it could **remove the emergency patch** protecting the system, re-triggering the incident. A human must always review before deciding to apply.

**Best practice to reduce drift:** lock down IAM permissions so no one (including admins) can directly modify resources managed by Terraform outside the CI/CD pipeline; any emergency change must be logged and synced back into code within 24 hours.
