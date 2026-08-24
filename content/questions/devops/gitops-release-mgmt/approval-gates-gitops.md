---
id: approval-gates-gitops
position: devops
technology: gitops-release-mgmt
level: mid
tags: [gitops, ci-cd, security]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao để thiết lập approval gate (cổng phê duyệt) trước khi deploy lên production trong một pipeline GitOps?

## Question (EN)
How do you set up an approval gate before deploying to production in a GitOps pipeline?

## Đáp án chi tiết (VI)
**Approval gate** là điểm kiểm soát thủ công (hoặc bán tự động) bắt buộc phải có sự đồng ý của người có thẩm quyền trước khi thay đổi được áp dụng vào một môi trường nhạy cảm (thường là production). Trong GitOps, có 3 lớp phổ biến để implement approval gate:

**1. PR review bắt buộc trên GitOps config repo (lớp cơ bản nhất)**
```yaml
# .github/settings.yml hoặc branch protection rule trên GitHub/GitLab
branch_protection:
  main:
    required_approving_review_count: 2
    required_status_checks:
      - ci/validate-manifests
      - ci/policy-check   # OPA/Kyverno policy check trước khi merge
    restrict_who_can_push:
      - platform-team    # chỉ platform team được merge vào prod overlay
```
Mọi thay đổi vào `overlays/prod/` bắt buộc qua PR, cần ít nhất N reviewer approve. Đây là gate cơ bản, dễ audit qua lịch sử PR.

**2. Manual sync trong ArgoCD (gate ở tầng deploy, không chỉ ở tầng Git)**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: order-service-prod
spec:
  syncPolicy: {}   # KHÔNG bật automated -> phải bấm Sync thủ công trên UI/CLI
```
Ngay cả khi PR đã merge vào Git, ArgoCD **không** tự động áp dụng vào cluster prod cho tới khi người vận hành (thường là SRE/lead) bấm nút "Sync" — tách biệt rõ "đã merge code" và "đã go-live".

**3. Notification + external approval tool tích hợp CI (gate có audit trail và tích hợp Slack/Jira)**
```yaml
# GitHub Actions - dùng environment protection rule
jobs:
  deploy-prod:
    environment:
      name: production   # GitHub Environment có required reviewers
    steps:
      - run: ./scripts/promote-to-prod.sh
```
GitHub/GitLab **Environment protection rules** cho phép cấu hình "cần N người approve trước khi job chạy tiếp", tích hợp sẵn với Slack notification, và lưu log ai approve lúc nào.

**So sánh 3 lớp:**

| Lớp | Gate ở đâu | Ưu điểm | Hạn chế |
|---|---|---|---|
| PR review | Trước khi merge vào Git | Đơn giản, dùng ngay tính năng Git platform | Không kiểm soát được thời điểm thực sự go-live nếu auto-sync bật |
| Manual ArgoCD sync | Sau khi merge, trước khi deploy | Tách biệt rõ "code sẵn sàng" vs "go-live" — hữu ích để chọn "deployment window" | Cần discipline, dễ quên sync hoặc quên tắt automated |
| CI environment approval | Trong pipeline, trước bước promote | Có audit log tập trung, tích hợp thông báo tốt | Thêm một hệ thống cần bảo trì song song với ArgoCD |

**Best practice thực tế:** kết hợp cả 3 lớp cho production — PR review đảm bảo chất lượng thay đổi, manual sync (hoặc CI environment gate) đảm bảo kiểm soát **thời điểm** go-live (tránh deploy giờ cao điểm/cuối tuần), và luôn có audit log tập trung (ai approve, lúc nào, thay đổi gì).

**Pitfall:** approval gate chỉ ở mức PR review nhưng auto-sync bật cho prod — nghĩa là ngay khi PR merge, thay đổi go-live ngay lập tức, không có cơ hội "chờ đúng thời điểm" hoặc rollback trước khi ảnh hưởng người dùng. Với hệ thống nhạy cảm, nên tách biệt rõ 2 quyết định "đồng ý về mặt kỹ thuật" (PR approve) và "quyết định go-live ngay bây giờ" (manual sync/deployment window).

## Detailed Answer (EN)
An **approval gate** is a manual (or semi-automated) control point requiring authorized sign-off before a change is applied to a sensitive environment (typically production). In GitOps, there are 3 common layers for implementing approval gates:

**1. Mandatory PR review on the GitOps config repo (the most basic layer)**
```yaml
# .github/settings.yml or a GitHub/GitLab branch protection rule
branch_protection:
  main:
    required_approving_review_count: 2
    required_status_checks:
      - ci/validate-manifests
      - ci/policy-check   # OPA/Kyverno policy check before merge
    restrict_who_can_push:
      - platform-team    # only the platform team can merge into the prod overlay
```
Every change to `overlays/prod/` must go through a PR requiring at least N reviewer approvals. This is the basic gate, easily audited via PR history.

**2. Manual sync in ArgoCD (a gate at the deploy layer, not just the Git layer)**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: order-service-prod
spec:
  syncPolicy: {}   # automated NOT enabled -> must click Sync manually via UI/CLI
```
Even after a PR is merged into Git, ArgoCD **does not** auto-apply it to the prod cluster until an operator (usually an SRE/lead) clicks "Sync" — clearly separating "code merged" from "went live."

**3. Notification + external approval tooling integrated into CI (a gate with audit trail and Slack/Jira integration)**
```yaml
# GitHub Actions - using an environment protection rule
jobs:
  deploy-prod:
    environment:
      name: production   # GitHub Environment with required reviewers
    steps:
      - run: ./scripts/promote-to-prod.sh
```
GitHub/GitLab **Environment protection rules** let you require "N people must approve before this job proceeds," built-in Slack notification integration, and a log of who approved when.

**Comparing the three layers:**

| Layer | Gate location | Pros | Limitations |
|---|---|---|---|
| PR review | Before merging into Git | Simple, uses the Git platform's native features | Can't control the actual go-live moment if auto-sync is enabled |
| Manual ArgoCD sync | After merge, before deploy | Clearly separates "code ready" from "went live" — useful for choosing a deployment window | Requires discipline, easy to forget to sync or to disable automation |
| CI environment approval | Within the pipeline, before the promote step | Centralized audit log, good notification integration | Adds another system to maintain alongside ArgoCD |

**Real-world best practice:** combine all three layers for production — PR review ensures change quality, manual sync (or a CI environment gate) controls the **timing** of go-live (avoiding deploys during peak hours/weekends), and always keep a centralized audit log (who approved, when, what changed).

**Pitfall:** having the approval gate only at PR review level while auto-sync is enabled for prod — meaning as soon as a PR merges, the change goes live immediately, with no chance to "wait for the right moment" or reconsider before it affects users. For sensitive systems, clearly separate two decisions: "technically approved" (PR approval) and "decide to go live right now" (manual sync/deployment window).
