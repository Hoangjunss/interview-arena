---
id: git-flow-la-gi-co-nhung-branching-strategy-nao-pho-bien
position: backend
technology: workflow-\u0026-branching
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Git Flow là gì? Có những branching strategy nào phổ biến?

## Question (EN)
What is Git Flow? What are the popular branching strategies?

## Đáp án chi tiết (VI)
Git Flow có 5 loại branch: `main` (production), `develop` (tích hợp code), `feature/*` (tính năng mới), `release/*` (chuẩn bị release), `hotfix/*` (sửa lỗi khẩn cấp). Trunk-based Development là hướng ngược lại: commit thẳng vào `main` với feature flags, phù hợp team CI/CD mature. Thực tế phổ biến nhất: feature branch từ develop → PR review → merge develop → staging → merge main → production. Naming convention quan trọng: `feature/JIRA-123-add-login` giúp trace thay đổi về requirement.

## Detailed Answer (EN)
Git Flow uses 5 branch types: `main` (production), `develop` (integration), `feature/*` (new features), `release/*` (release prep), `hotfix/*` (urgent bug fixes). Trunk-based Development is the opposite: commit directly to `main` behind feature flags — suited for mature CI/CD teams. The most common real-world flow: feature branch off develop → PR review → merge to develop → staging → merge to main → production. Naming convention matters: `feature/JIRA-123-add-login` helps trace changes back to requirements.
