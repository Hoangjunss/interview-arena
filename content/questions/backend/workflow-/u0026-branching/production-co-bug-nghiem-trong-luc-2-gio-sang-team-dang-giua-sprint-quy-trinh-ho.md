---
id: production-co-bug-nghiem-trong-luc-2-gio-sang-team-dang-giua-sprint-quy-trinh-ho
position: backend
technology: workflow-\u0026-branching
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Production có bug nghiêm trọng lúc 2 giờ sáng, team đang giữa sprint. Quy trình hotfix đúng chuẩn là gì?

## Question (EN)
Production has a critical bug at 2am during an active sprint. What is the correct hotfix process?

## Đáp án chi tiết (VI)
**Git Flow hotfix:**\
```bash\
git checkout main\
git pull origin main\
git checkout -b hotfix/critical-payment-bug\
# Fix the bug\
git commit -m \\"fix: resolve payment calculation overflow\\"\
git checkout main \u0026\u0026 git merge --no-ff hotfix/critical-payment-bug\
git tag -a v1.2.1 -m \\"hotfix: payment bug\\"\
git push origin main --tags\
# Backport to develop\
git checkout develop \u0026\u0026 git merge --no-ff hotfix/critical-payment-bug\
git branch -d hotfix/critical-payment-bug\
```\
\
**GitHub Flow hotfix** (đơn giản hơn):\
```bash\
git checkout main \u0026\u0026 git pull\
git checkout -b hotfix/payment-bug\
# Fix, test\
git push origin hotfix/payment-bug\
# Tạo PR vào main, mark emergency, get fast review\
# Merge → deploy ngay\
```\
\
**Quan trọng**: luôn merge hotfix vào cả production branch VÀ development branch — đừng để fix bị mất ở lần deploy tới. Tag version sau hotfix để dễ rollback. Viết post-mortem sau khi hệ thống ổn định.

## Detailed Answer (EN)
**Git Flow hotfix:**\
```bash\
git checkout main\
git pull origin main\
git checkout -b hotfix/critical-payment-bug\
# Fix the bug\
git commit -m \\"fix: resolve payment calculation overflow\\"\
git checkout main \u0026\u0026 git merge --no-ff hotfix/critical-payment-bug\
git tag -a v1.2.1 -m \\"hotfix: payment bug\\"\
git push origin main --tags\
# Backport to develop\
git checkout develop \u0026\u0026 git merge --no-ff hotfix/critical-payment-bug\
git branch -d hotfix/critical-payment-bug\
```\
\
**GitHub Flow hotfix** (simpler):\
```bash\
git checkout main \u0026\u0026 git pull\
git checkout -b hotfix/payment-bug\
# Fix, test\
git push origin hotfix/payment-bug\
# Create PR to main, mark emergency, get fast review\
# Merge → deploy immediately\
```\
\
**Critical**: always merge the hotfix into both the production branch AND the development branch — do not let the fix get lost in the next deploy. Tag the version after the hotfix for easy rollback. Write a post-mortem once the system is stable.
