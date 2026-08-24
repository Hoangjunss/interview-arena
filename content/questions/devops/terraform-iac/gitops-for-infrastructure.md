---
id: gitops-for-infrastructure
position: devops
technology: terraform-iac
level: senior
tags: [gitops, ci-cd, terraform, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
GitOps áp dụng cho quản lý hạ tầng (khác với chỉ deploy ứng dụng) nghĩa là gì? Thiết kế một pipeline GitOps cho Terraform và những rủi ro cần xử lý.

## Question (EN)
What does GitOps mean when applied to infrastructure management (as opposed to just application deployment)? Design a GitOps pipeline for Terraform and the risks it needs to handle.

## Đáp án chi tiết (VI)
**GitOps cho hạ tầng** nghĩa là **Git là nguồn sự thật duy nhất (single source of truth)** cho trạng thái mong muốn của hạ tầng, và mọi thay đổi hạ tầng thật đều phải đi qua: commit → pull request → review → merge → pipeline tự động `apply`. Không ai được phép `apply` thủ công từ máy cá nhân lên môi trường được quản lý theo GitOps.

**Khác biệt so với "CI/CD chạy Terraform" thông thường:**
- CI/CD thông thường: pipeline chạy `apply` khi có sự kiện (merge, tag) — vẫn có thể có người `apply` tay song song, dễ lệch với những gì Git phản ánh.
- GitOps thực thụ: có thêm **reconciliation loop** — một tiến trình (ví dụ Atlantis, hoặc job định kỳ) liên tục so sánh trạng thái Git với trạng thái thật, tự động phát hiện và cảnh báo/khắc phục khi lệch, đảm bảo Git luôn là "sự thật" chứ không chỉ là điểm khởi đầu.

**Kiến trúc pipeline GitOps điển hình cho Terraform (dùng Atlantis làm ví dụ):**
```
1. Dev mở PR thay đổi .tf
2. Atlantis (webhook từ GitHub/GitLab) tự động chạy `terraform plan`,
   comment kết quả plan trực tiếp vào PR
3. Reviewer đọc plan trong PR, review code, approve
4. Dev comment "atlantis apply" trong PR (hoặc tự động khi merge, tùy cấu hình)
5. Atlantis chạy `terraform apply` thật, comment kết quả vào PR
6. PR được merge — lịch sử Git và lịch sử apply luôn khớp nhau
```

**Lợi ích:**
- **Audit trail hoàn chỉnh**: mọi thay đổi hạ tầng đều có PR, có người approve, có plan output lưu lại trong lịch sử PR — phục vụ compliance/audit rất tốt.
- **Rollback đơn giản**: revert lại một commit trong Git = có thể tái tạo lại đúng trạng thái hạ tầng cũ (miễn là chưa có drift ngoài Git).
- **Giảm quyền truy cập trực tiếp**: dev/engineer không cần credential apply trực tiếp lên cloud, chỉ pipeline mới có quyền đó — giảm bề mặt tấn công và rủi ro lỗi người.

**Rủi ro và vấn đề cần xử lý khi thiết kế thực tế:**

1. **Concurrent PR conflict**: hai PR cùng sửa file trong cùng state, PR nào apply trước sẽ khiến plan của PR kia trở nên **outdated** (dựa trên state cũ) — cần cấu hình Atlantis re-plan tự động khi có PR khác merge trước, hoặc dùng cơ chế "plan lock" theo project.

2. **Drift ngoài GitOps**: nếu ai đó (hoặc một automation khác) vẫn có quyền sửa hạ tầng ngoài luồng Git (ví dụ qua console, hoặc một script legacy), GitOps sẽ mất tính đúng đắn — cần khóa IAM chặt để **chỉ pipeline GitOps** có quyền ghi lên hạ tầng managed.

3. **Secret trong plan output**: comment plan vào PR có thể vô tình để lộ giá trị nhạy cảm nếu không cấu hình `sensitive` đúng cho mọi biến/output liên quan — cần review kỹ trước khi bật comment tự động công khai.

4. **Blast radius của lỗi trong chính pipeline GitOps**: nếu Atlantis/CI runner bị compromise hoặc có bug, nó có quyền apply lên toàn bộ hạ tầng — cần giới hạn quyền IAM của service account chạy pipeline theo nguyên tắc least-privilege, tách theo môi trường (runner cho prod khác hoàn toàn credential với runner cho dev).

5. **Approval fatigue**: nếu mọi PR nhỏ (kể cả đổi 1 tag) đều cần review đầy đủ như thay đổi lớn, team dễ chán và bắt đầu rubber-stamp approve — nên phân loại risk level của thay đổi (dựa vào loại resource bị ảnh hưởng) để áp dụng mức review khác nhau, kết hợp với policy-as-code tự động chặn phần nguy hiểm nhất thay vì dựa hết vào con người.

**Câu hỏi mở senior hay bị hỏi tiếp:** "Làm sao đảm bảo pipeline GitOps không tự apply nhầm khi có nhiều PR concurrent thay đổi cùng 1 state?" — câu trả lời tốt cần đề cập tới **serialize theo project/state** (Atlantis hỗ trợ `--parallel-plan=false` per workspace hoặc lock theo dõi workspace/PR).

## Detailed Answer (EN)
**GitOps for infrastructure** means **Git is the single source of truth** for the desired state of infrastructure, and every real infrastructure change must go through: commit → pull request → review → merge → automated pipeline `apply`. Nobody is allowed to `apply` manually from a personal machine onto a GitOps-managed environment.

**Difference from ordinary "CI/CD running Terraform":**
- Ordinary CI/CD: the pipeline runs `apply` on an event (merge, tag) — but manual applies can still happen in parallel, easily drifting from what Git reflects.
- True GitOps: adds a **reconciliation loop** — a process (e.g., Atlantis, or a scheduled job) continuously compares Git's state with reality, automatically detecting and alerting/remediating drift, ensuring Git remains the "truth" rather than just a starting point.

**A typical GitOps pipeline architecture for Terraform (using Atlantis as an example):**
```
1. Dev opens a PR changing .tf files
2. Atlantis (webhook from GitHub/GitLab) automatically runs `terraform plan`,
   commenting the plan output directly on the PR
3. Reviewer reads the plan in the PR, reviews the code, approves
4. Dev comments "atlantis apply" on the PR (or auto-triggers on merge, depending on config)
5. Atlantis runs the real `terraform apply`, commenting the result on the PR
6. The PR gets merged — Git history and apply history always stay in sync
```

**Benefits:**
- **Complete audit trail**: every infrastructure change has a PR, an approver, and a saved plan output in PR history — excellent for compliance/audit.
- **Simple rollback**: reverting a Git commit means being able to recreate the previous infrastructure state (as long as no drift occurred outside Git).
- **Reduced direct access**: developers/engineers don't need credentials to apply directly against the cloud; only the pipeline holds that permission — reducing attack surface and human error risk.

**Risks and issues to handle in a real design:**

1. **Concurrent PR conflicts**: two PRs touching the same state — whichever applies first makes the other PR's plan **stale** (based on old state) — configure Atlantis to auto re-plan when another PR merges first, or use a project-level "plan lock" mechanism.

2. **Drift outside GitOps**: if someone (or another automation) still has permission to change infrastructure outside the Git flow (e.g., via console, or a legacy script), GitOps loses its integrity — lock down IAM so **only the GitOps pipeline** can write to managed infrastructure.

3. **Secrets in plan output**: commenting the plan on a PR can accidentally leak sensitive values if `sensitive` isn't correctly configured for every related variable/output — review carefully before enabling public automatic comments.

4. **Blast radius of a failure in the GitOps pipeline itself**: if Atlantis/the CI runner is compromised or has a bug, it has permission to apply across the entire infrastructure — restrict the pipeline's service account IAM permissions on a least-privilege basis, separated by environment (a prod runner should have entirely different credentials from a dev runner).

5. **Approval fatigue**: if every small PR (even a single tag change) requires the same full review as a major change, the team gets fatigued and starts rubber-stamping approvals — classify the risk level of a change (based on the resource type affected) to apply differing review rigor, combined with policy-as-code automatically blocking the most dangerous changes instead of relying entirely on humans.

**A common senior follow-up question:** "How do you ensure the GitOps pipeline doesn't apply incorrectly when multiple concurrent PRs change the same state?" — a good answer should mention **serializing per project/state** (Atlantis supports `--parallel-plan=false` per workspace or locking tracked per workspace/PR).
