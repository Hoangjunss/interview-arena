---
id: release-branch-co-tac-dung-gi-khi-nao-can-va-khi-nao-la-overhead-khong-can-thiet
position: backend
technology: workflow-\u0026-branching
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Release branch có tác dụng gì? Khi nào cần và khi nào là overhead không cần thiết?

## Question (EN)
What is the purpose of a release branch? When is it needed vs. unnecessary overhead?

## Đáp án chi tiết (VI)
**Release branch** (`release/1.5.0`) tách quá trình stabilize một version khỏi ongoing development. Flow: feature freeze → tạo release branch → chỉ bug fixes được merge vào → QA → deploy → merge về main + tag.\
\
**Cần release branch khi**:\
- QA cycle dài (days/weeks) — cần isolate khỏi new features\
- Multiple release tracks song song (v1.5 và v2.0 cùng development)\
- Regulatory/compliance cần sign-off trước deploy\
- Mobile apps với app store review lag\
\
**Overhead không cần thiết khi**:\
- Continuous deployment (deploy mỗi merged PR)\
- Team nhỏ, QA cycle \u003c1 ngày\
- SaaS web app với rollback dễ dàng\
\
**Thực tế**: nhiều teams tạo release branch vì \\"đó là best practice\\" nhưng chưa bao giờ thực sự cần. Nếu bạn deploy 5 lần/ngày, release branch là waste. Nếu deploy 1 lần/tháng với sign-off process, release branch là cần thiết.

## Detailed Answer (EN)
**Release branch** (`release/1.5.0`) separates the stabilization of a version from ongoing development. Flow: feature freeze → create release branch → only bug fixes merged in → QA → deploy → merge back to main + tag.\
\
**Need a release branch when**:\
- Long QA cycles (days/weeks) — need isolation from new features\
- Multiple release tracks in parallel (v1.5 and v2.0 simultaneously)\
- Regulatory/compliance sign-off required before deploy\
- Mobile apps with app store review lag\
\
**Unnecessary overhead when**:\
- Continuous deployment (deploy every merged PR)\
- Small team, QA cycle under 1 day\
- SaaS web app with easy rollback\
\
**Reality**: many teams create release branches because \\"that's best practice\\" but never actually need it. If you deploy 5 times a day, release branches are waste. If you deploy monthly with a sign-off process, they are essential.
