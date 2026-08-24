---
id: what-is-pipeline-as-code
position: devops
technology: ci-cd
level: junior
tags: [pipeline-as-code, github-actions, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pipeline-as-code là gì? Vì sao nó tốt hơn việc cấu hình pipeline qua giao diện web (UI-based)?

## Question (EN)
What is pipeline-as-code? Why is it better than configuring a pipeline through a web UI?

## Đáp án chi tiết (VI)
**Pipeline-as-code** là cách định nghĩa toàn bộ pipeline CI/CD (các bước build, test, deploy) bằng một file cấu hình (thường là YAML) được lưu **trong chính source code repository**, thay vì click chuột cấu hình qua giao diện web của công cụ CI (như Jenkins Classic UI cũ).

**Ví dụ (GitHub Actions):**
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
```

**Vì sao pipeline-as-code tốt hơn cấu hình UI:**

| Tiêu chí | Pipeline-as-code | Cấu hình qua UI |
|---|---|---|
| **Version control** | Có — mọi thay đổi pipeline đều nằm trong Git history, review qua PR như code | Không — thay đổi qua UI thường không có audit trail rõ ràng |
| **Review & approval** | Đổi pipeline phải qua code review (PR), giảm rủi ro sai sót | Ai có quyền admin cũng có thể đổi trực tiếp, khó kiểm soát |
| **Tái tạo (reproducibility)** | Setup lại CI server mới chỉ cần checkout code, pipeline tự động có | Phải cấu hình lại thủ công từng job trên UI mới |
| **Đồng bộ theo branch** | Pipeline có thể khác nhau theo branch (ví dụ branch thử nghiệm CI mới) | Khó làm được, thường 1 cấu hình áp dụng chung |
| **Rollback pipeline lỗi** | `git revert` là xong | Phải nhớ cấu hình cũ để sửa lại tay |

**Ví dụ thực tế về lợi ích:** Khi một dev muốn thử nghiệm thêm 1 bước security scan vào pipeline, họ tạo PR sửa file YAML, đồng nghiệp review thấy hợp lý mới merge — giống hệt quy trình review code bình thường. Nếu bước mới gây lỗi, chỉ cần revert commit đó, không cần "nhớ" cấu hình cũ trên UI.

**Lưu ý:** Pipeline-as-code không có nghĩa là hoàn toàn không cần UI — các nền tảng hiện đại (GitHub Actions, GitLab CI) vẫn có UI để xem log, trigger thủ công, quản lý secrets. Điểm khác biệt là **nguồn sự thật (source of truth)** của cấu hình pipeline nằm ở đâu: trong file Git hay trong database ẩn của công cụ CI.

## Detailed Answer (EN)
**Pipeline-as-code** is the practice of defining the entire CI/CD pipeline (build, test, deploy steps) in a configuration file (usually YAML) that lives **inside the source code repository itself**, instead of clicking through a CI tool's web UI (like the old Jenkins Classic UI) to configure it.

**Example (GitHub Actions):**
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
```

**Why pipeline-as-code beats UI configuration:**

| Criterion | Pipeline-as-code | UI-based config |
|---|---|---|
| **Version control** | Yes — every pipeline change is in Git history, reviewed via PR like code | No — UI changes typically lack a clear audit trail |
| **Review & approval** | Pipeline changes go through code review (PR), reducing mistakes | Anyone with admin access can change it directly, hard to govern |
| **Reproducibility** | Spinning up a new CI server just needs a checkout — the pipeline comes with the code | Every job must be manually reconfigured on the new UI |
| **Per-branch variation** | The pipeline can differ per branch (e.g. a branch trialing a new CI setup) | Hard to do; usually one shared config applies everywhere |
| **Rolling back a broken pipeline** | `git revert` is all it takes | Must remember the old config to manually restore it |

**Concrete benefit example:** When a developer wants to try adding a new security-scan step to the pipeline, they open a PR editing the YAML file; a teammate reviews it and merges if it looks right — exactly like a normal code review. If the new step breaks something, just revert that commit — no need to "remember" the old UI configuration.

**Note:** Pipeline-as-code doesn't mean the UI disappears entirely — modern platforms (GitHub Actions, GitLab CI) still provide a UI for viewing logs, manual triggers, and managing secrets. The real difference is **where the source of truth** for pipeline configuration lives: in a Git file, or in the CI tool's hidden database.