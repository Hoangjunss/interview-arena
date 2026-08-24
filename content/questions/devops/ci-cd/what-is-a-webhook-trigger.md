---
id: what-is-a-webhook-trigger
position: devops
technology: ci-cd
level: junior
tags: [ci-cd-fundamentals, webhooks, automation]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Webhook trong CI/CD hoạt động như thế nào? Nêu các loại trigger phổ biến để kích hoạt pipeline.

## Question (EN)
How do webhooks work in CI/CD? What are the common trigger types that kick off a pipeline?

## Đáp án chi tiết (VI)
**Webhook** là cơ chế "push-based": khi một sự kiện xảy ra trên hệ thống nguồn (Git provider), hệ thống đó chủ động gửi HTTP POST request (payload JSON) đến một URL callback đã đăng ký, thay vì CI phải liên tục polling hỏi "có gì mới không?".

**Luồng hoạt động:**
1. Dev push code lên GitHub.
2. GitHub gửi HTTP POST đến webhook URL đã cấu hình (ví dụ URL của Jenkins server, hoặc trực tiếp trigger nội bộ nếu dùng GitHub Actions).
3. CI server nhận payload, đọc thông tin (branch, commit SHA, tác giả...) và quyết định pipeline nào cần chạy.
4. Pipeline khởi động, checkout đúng commit.

Với GitHub Actions, cơ chế này được trừu tượng hóa qua từ khóa `on:` — bản chất phía dưới vẫn là GitHub tự trigger workflow khi nhận sự kiện nội bộ (không cần bạn tự cấu hình webhook URL thủ công như với Jenkins).

**Các loại trigger phổ biến:**

```yaml
on:
  push:                          # Trigger khi push code
    branches: [main, develop]
  pull_request:                  # Trigger khi mở/update PR
    types: [opened, synchronize]
  schedule:                      # Trigger theo lịch (cron)
    - cron: '0 2 * * *'          # 2h sáng mỗi ngày
  workflow_dispatch:             # Trigger thủ công qua UI/API
    inputs:
      environment:
        type: choice
        options: [staging, production]
  release:                       # Trigger khi tạo release/tag
    types: [published]
  workflow_run:                  # Trigger khi 1 workflow khác hoàn thành
    workflows: ["Build"]
    types: [completed]
```

**So sánh các loại trigger:**

| Loại trigger | Dùng khi nào |
|---|---|
| `push` | CI cơ bản: build/test mọi commit vào nhánh quan trọng |
| `pull_request` | Kiểm tra chất lượng trước khi cho phép merge |
| `schedule` | Việc định kỳ: security scan nightly, dọn dẹp artifact cũ, báo cáo |
| `workflow_dispatch` | Deploy thủ công theo yêu cầu (ví dụ deploy hotfix ngoài giờ, chọn môi trường) |
| `release`/`tag` | Build/publish artifact chính thức khi cắt version |
| `workflow_run` | Chuỗi pipeline: pipeline B chỉ chạy sau khi pipeline A (ở repo khác) thành công |
| Webhook từ hệ thống ngoài (ví dụ Jira status đổi) | Trigger pipeline dựa trên sự kiện business, không chỉ Git |

**Webhook với Jenkins (cấu hình thủ công, khác GitHub Actions):**
```
GitHub repo Settings > Webhooks > Add webhook
Payload URL: https://jenkins.company.com/github-webhook/
Content type: application/json
Events: Just the push event
```
Jenkins cần plugin (GitHub plugin) lắng nghe endpoint này và map sự kiện tới job tương ứng.

**Pitfall thường gặp:**
- Không verify webhook signature (`X-Hub-Signature-256` của GitHub) — kẻ tấn công có thể giả mạo request POST để trigger pipeline trái phép nếu URL bị lộ.
- Trigger `push` không lọc branch, khiến mọi nhánh thử nghiệm cũng chạy full pipeline nặng, lãng phí compute.
- Dùng `pull_request_target` (chạy với quyền/secret của base repo) kết hợp checkout code từ fork không tin cậy — lỗ hổng bảo mật nghiêm trọng đã từng gây nhiều vụ leak secrets trên GitHub Actions.

## Detailed Answer (EN)
A **webhook** is a "push-based" mechanism: when an event happens on a source system (a Git provider), that system proactively sends an HTTP POST request (JSON payload) to a registered callback URL, instead of CI having to continuously poll and ask "anything new?".

**How it works:**
1. A developer pushes code to GitHub.
2. GitHub sends an HTTP POST to the configured webhook URL (e.g. a Jenkins server URL, or an internal trigger if using GitHub Actions).
3. The CI server receives the payload, reads details (branch, commit SHA, author...), and decides which pipeline to run.
4. The pipeline starts and checks out the right commit.

With GitHub Actions, this mechanism is abstracted behind the `on:` keyword — under the hood, GitHub still triggers the workflow when it detects an internal event (you don't manually configure a webhook URL like with Jenkins).

**Common trigger types:**

```yaml
on:
  push:                          # Trigger on a push
    branches: [main, develop]
  pull_request:                  # Trigger when a PR is opened/updated
    types: [opened, synchronize]
  schedule:                      # Cron-based trigger
    - cron: '0 2 * * *'          # 2am daily
  workflow_dispatch:             # Manual trigger via UI/API
    inputs:
      environment:
        type: choice
        options: [staging, production]
  release:                       # Trigger on release/tag creation
    types: [published]
  workflow_run:                  # Trigger when another workflow completes
    workflows: ["Build"]
    types: [completed]
```

**Comparing trigger types:**

| Trigger | When to use |
|---|---|
| `push` | Basic CI: build/test every commit to important branches |
| `pull_request` | Quality gate before allowing a merge |
| `schedule` | Periodic work: nightly security scans, cleaning old artifacts, reports |
| `workflow_dispatch` | Manual on-demand deploy (e.g. an after-hours hotfix, choosing the environment) |
| `release`/`tag` | Build/publish an official artifact when cutting a version |
| `workflow_run` | Pipeline chaining: pipeline B only runs after pipeline A (in another repo) succeeds |
| Webhook from an external system (e.g. a Jira status change) | Trigger a pipeline off a business event, not just Git |

**Webhook with Jenkins (manual configuration, unlike GitHub Actions):**
```
GitHub repo Settings > Webhooks > Add webhook
Payload URL: https://jenkins.company.com/github-webhook/
Content type: application/json
Events: Just the push event
```
Jenkins needs a plugin (GitHub plugin) listening on this endpoint and mapping the event to the right job.

**Common pitfalls:**
- Not verifying the webhook signature (GitHub's `X-Hub-Signature-256`) — an attacker can forge a POST request to trigger the pipeline maliciously if the URL leaks.
- A `push` trigger with no branch filter causes every experimental branch to run the full heavy pipeline, wasting compute.
- Using `pull_request_target` (which runs with the base repo's permissions/secrets) combined with checking out code from an untrusted fork — a serious security hole that has caused multiple real-world secret leaks on GitHub Actions.