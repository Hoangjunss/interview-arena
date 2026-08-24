---
id: terraform-ci-cd-pipeline-design
position: devops
technology: terraform-iac
level: senior
tags: [terraform, ci-cd, pipeline, automation]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế một pipeline CI/CD chạy Terraform an toàn cho một tổ chức có nhiều team và nhiều môi trường (dev/staging/prod). Những stage nào là bắt buộc và vì sao?

## Question (EN)
Design a safe CI/CD pipeline for running Terraform at an organization with multiple teams and multiple environments (dev/staging/prod). Which stages are mandatory and why?

## Đáp án chi tiết (VI)
**Nguyên tắc thiết kế cốt lõi:** pipeline phải đảm bảo **không ai apply trực tiếp lên production mà không qua review**, **giảm blast radius** khi có lỗi, và **có khả năng audit/rollback**.

**Các stage bắt buộc theo thứ tự:**

```
1. Lint & Format     → terraform fmt -check, tflint
2. Validate          → terraform validate (per module/root)
3. Security scan     → checkov / tfsec (fail build nếu vi phạm rule nghiêm trọng)
4. Plan              → terraform plan -out=tfplan, lưu artifact
5. Cost estimation   → infracost breakdown --path tfplan (cảnh báo nếu cost tăng bất thường)
6. Policy check      → conftest/Sentinel test trên plan JSON (chặn cứng vi phạm compliance)
7. Human approval    → reviewer đọc plan + cost + policy result, approve trong PR/pipeline UI
8. Apply             → terraform apply tfplan (dùng đúng artifact đã plan, không plan lại)
9. Post-apply verify → smoke test / health check hạ tầng vừa tạo
10. Notify           → Slack/email kết quả apply, link tới log đầy đủ
```

**Vì sao từng stage quan trọng (câu trả lời senior cần giải thích "why", không chỉ liệt kê):**

- **`plan` phải lưu artifact và dùng lại đúng file đó ở `apply`** (không chạy `plan` rồi `apply` riêng lẻ dựa vào state mới đọc lại) — tránh race condition: giữa lúc plan được review và lúc apply, nếu có ai đó thay đổi hạ tầng, `apply tfplan` sẽ **báo lỗi từ chối** thay vì âm thầm áp dụng một plan đã lỗi thời.

- **Security scan trước `plan`, không phải sau**: chạy Checkov/tfsec ngay ở bước sớm giúp fail nhanh (fail-fast), tiết kiệm thời gian CI thay vì chờ hết `plan` (tốn thời gian gọi API cloud) rồi mới phát hiện lỗi cấu hình rõ ràng.

- **Cost estimation (Infracost)**: nhiều tổ chức bị "cost shock" vì một thay đổi tưởng nhỏ (đổi instance type, bật thêm NAT Gateway ở mọi AZ) làm tăng chi phí hàng nghìn USD/tháng — cảnh báo ngay trong PR giúp catch sớm trước khi apply.

- **Policy check tách biệt với human approval**: policy-as-code là **lớp chặn cứng không thể bỏ qua** (kể cả reviewer cũng không override được rule hard-mandatory), trong khi human approval xử lý các trường hợp cần đánh giá theo ngữ cảnh (business judgment) mà rule tự động không cover hết.

- **Environment-specific credentials & approval gates**: pipeline cho `dev` có thể auto-apply sau khi CI pass (tốc độ ưu tiên hơn), nhưng `staging`/`prod` bắt buộc có **required reviewer** riêng (ví dụ platform team) và dùng **credential/IAM role khác hoàn toàn** — không dùng chung 1 service account cho mọi môi trường.

- **Post-apply verification**: `apply` thành công (exit code 0) không đồng nghĩa hạ tầng hoạt động đúng — ví dụ security group đúng như plan nhưng ứng dụng không kết nối được do thiếu route table entry ở layer khác; cần smoke test gọi thử endpoint/health-check thật.

**Kiến trúc phân quyền multi-team thực tế:**
```
platform-team repo (network, IAM baseline) → pipeline riêng, quyền cao nhất, ít người approve được
service-team-A repo (app infra riêng)      → pipeline riêng, chỉ có quyền trong sub-account/namespace của team A
service-team-B repo                        → tương tự, cô lập với team A
```
Mỗi team có state, credential, và pipeline riêng — team A apply lỗi không ảnh hưởng team B, đồng thời platform team vẫn giữ quyền kiểm soát baseline chung (network, security guardrails) mà các team khác không được sửa.

**Câu hỏi phỏng vấn hay đi kèm:** "Nếu apply bị fail giữa chừng (ví dụ mất kết nối mạng lúc đang tạo 10 resource, mới xong 6)?" — câu trả lời tốt: Terraform áp dụng theo kiểu **best-effort với dependency graph**, resource nào đã tạo xong vẫn nằm trong state (partial apply), lần chạy `apply` tiếp theo sẽ tự động tiếp tục từ chỗ dở dang (không tạo lại 6 resource đã xong) nhờ so sánh state — nhưng cần có alerting để phát hiện tình huống "apply pending" kéo dài, tránh để môi trường ở trạng thái nửa vời quá lâu.

## Detailed Answer (EN)
**Core design principle:** the pipeline must ensure **no one applies directly to production without review**, **reduces blast radius** on failure, and **supports audit/rollback**.

**Mandatory stages, in order:**

```
1. Lint & Format     → terraform fmt -check, tflint
2. Validate          → terraform validate (per module/root)
3. Security scan     → checkov / tfsec (fail the build on critical rule violations)
4. Plan              → terraform plan -out=tfplan, save as an artifact
5. Cost estimation   → infracost breakdown --path tfplan (warn on abnormal cost increases)
6. Policy check      → conftest/Sentinel test against the plan JSON (hard-block compliance violations)
7. Human approval    → reviewer reads the plan + cost + policy result, approves in PR/pipeline UI
8. Apply             → terraform apply tfplan (using the exact planned artifact, not re-planning)
9. Post-apply verify → smoke test / health check the freshly-created infrastructure
10. Notify           → Slack/email of the apply result, linked to full logs
```

**Why each stage matters (a senior answer should explain "why," not just list steps):**

- **`plan` must be saved as an artifact and reused exactly at `apply`** (not running `plan` then a separate `apply` that re-reads fresh state) — this avoids a race condition: if infrastructure changes between the time the plan was reviewed and the time it's applied, `apply tfplan` will **error out and refuse** rather than silently applying a stale plan.

- **Security scan before `plan`, not after**: running Checkov/tfsec early enables fail-fast, saving CI time instead of waiting for the full `plan` (which spends time calling cloud APIs) before discovering an obvious configuration error.

- **Cost estimation (Infracost)**: many organizations get "cost shocked" because a seemingly small change (a different instance type, an extra NAT Gateway per AZ) increases monthly cost by thousands of dollars — flagging it right in the PR catches it early, before applying.

- **Policy check kept separate from human approval**: policy-as-code is a **hard-block layer that cannot be bypassed** (even a reviewer can't override a hard-mandatory rule), while human approval handles cases requiring contextual business judgment that automated rules can't fully cover.

- **Environment-specific credentials & approval gates**: the `dev` pipeline might auto-apply once CI passes (speed prioritized), but `staging`/`prod` require **dedicated required reviewers** (e.g., the platform team) and use **completely different credentials/IAM roles** — never share one service account across all environments.

- **Post-apply verification**: a successful `apply` (exit code 0) doesn't mean the infrastructure actually works correctly — e.g., the security group might match the plan but the application still can't connect due to a missing route table entry in another layer; a real smoke test calling an endpoint/health check is needed.

**A realistic multi-team permission architecture:**
```
platform-team repo (network, IAM baseline) → its own pipeline, highest privilege, few approvers
service-team-A repo (team's own app infra)  → its own pipeline, permissions scoped to team A's sub-account/namespace
service-team-B repo                        → same pattern, isolated from team A
```
Each team has its own state, credentials, and pipeline — a failed apply from team A doesn't affect team B, while the platform team retains control over shared baselines (network, security guardrails) that other teams cannot modify.

**A common follow-up interview question:** "What happens if apply fails partway through (e.g., a network dropout while creating 10 resources, with only 6 done)?" — a good answer: Terraform applies in a **best-effort fashion following the dependency graph**; resources that finished successfully remain in the state (partial apply), and the next `apply` will automatically continue from where it left off (not recreating the 6 already-done resources) by diffing against state — but alerting is needed to catch a "pending apply" left hanging, to avoid leaving an environment half-applied for too long.
