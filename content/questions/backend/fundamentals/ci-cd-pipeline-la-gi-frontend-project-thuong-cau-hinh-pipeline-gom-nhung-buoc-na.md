---
id: ci-cd-pipeline-la-gi-frontend-project-thuong-cau-hinh-pipeline-gom-nhung-buoc-na
position: backend
technology: fundamentals
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CI/CD pipeline là gì? Frontend project thường cấu hình pipeline gồm những bước nào?

## Question (EN)
What is a CI/CD pipeline? What steps does a typical frontend pipeline include?

## Đáp án chi tiết (VI)
CI/CD (Continuous Integration / Continuous Deployment) là quy trình tự động kiểm tra và deploy code mỗi khi có thay đổi. Pipeline frontend chạy tuần tự để fail-fast: (1) lint + format check (nhanh nhất), (2) type check `tsc --noEmit`, (3) unit tests với coverage threshold, (4) production build.\
\
Ở tầng staging: deploy preview mỗi PR (Vercel preview URLs rất tiện), chạy E2E tests với Playwright. Deploy production khi merge vào main.\
\
Công cụ phổ biến: GitHub Actions (miễn phí cho open source, tích hợp sẵn GitHub), GitLab CI, hoặc Jenkins/Azure DevOps cho enterprise on-premise.

## Detailed Answer (EN)
CI/CD (Continuous Integration / Continuous Deployment) is the automated process for testing and deploying code on every change. A frontend pipeline runs sequentially to fail fast: (1) lint + format check (fastest), (2) type check with `tsc --noEmit`, (3) unit tests with a coverage threshold, (4) production build. At the staging layer: deploy a preview per PR (Vercel preview URLs are very convenient), then run E2E tests with Playwright. Deploy to production on merge to main. Popular tools: GitHub Actions (free for open source, native GitHub integration), GitLab CI, or Jenkins/Azure DevOps for on-premise enterprise.
