---
id: gitops-la-gi-khac-cach-deploy-ci-cd-truyen-thong-the-nao
position: backend
technology: devops-\u0026-tools
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
GitOps là gì? Khác cách deploy CI/CD truyền thống thế nào?

## Question (EN)
What is GitOps and how does it differ from traditional CI/CD deployment?

## Đáp án chi tiết (VI)
GitOps là cách vận hành trong đó **Git là nguồn sự thật duy nhất** cho cả hạ tầng lẫn ứng dụng: **trạng thái mong muốn** được khai báo trong repo. Một **agent chạy trong cluster** (ArgoCD, Flux) liên tục **so sánh trạng thái thực với Git** và **tự đồng bộ (reconcile)** — đây là **mô hình pull**.\
\
**Bốn nguyên tắc (OpenGitOps)**: hệ thống được mô tả **declarative**; trạng thái **versioned \u0026 immutable** trong Git; thay đổi được **pulled automatically** bởi agent; và **continuously reconciled** để chống lệch.\
\
Khác CI/CD truyền thống (mô hình **push**): pipeline CI cầm credential production rồi `kubectl apply`/đẩy lên cluster.\
\
Lợi ích GitOps:\
- **Thay đổi qua Pull Request** → có review, lịch sử, **rollback = git revert**.\
- **Giảm drift**: agent tự kéo mọi thay đổi tay về đúng trạng thái khai báo.\
- **An toàn hơn**: không phải cấp credential production cho hệ thống CI bên ngoài; cluster tự kéo về.

## Detailed Answer (EN)
GitOps is an operating model where **Git is the single source of truth** for both infrastructure and applications: the **desired state** is declared in a repo. An **agent running in the cluster** (ArgoCD, Flux) continuously **compares actual state to Git** and **reconciles** automatically — a **pull model**.\
\
**Four principles (OpenGitOps)**: the system is described **declaratively**; state is **versioned \u0026 immutable** in Git; changes are **pulled automatically** by the agent; and **continuously reconciled** to prevent drift.\
\
Unlike traditional CI/CD (a **push model**): the CI pipeline holds production credentials and runs `kubectl apply`/pushes to the cluster.\
\
GitOps benefits:\
- **Changes via Pull Request** → review, history, and **rollback = git revert**.\
- **Less drift**: the agent pulls any manual change back to the declared state.\
- **More secure**: no production credentials embedded in an external CI system; the cluster pulls for itself.
