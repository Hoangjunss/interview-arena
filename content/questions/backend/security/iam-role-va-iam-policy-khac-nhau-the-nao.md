---
id: iam-role-va-iam-policy-khac-nhau-the-nao
position: backend
technology: security
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
IAM role và IAM policy khác nhau thế nào?

## Question (EN)
What is the difference between an IAM role and an IAM policy?

## Đáp án chi tiết (VI)
IAM quản lý **ai được làm gì** trên AWS.\
\
- **Policy**: tài liệu JSON khai báo **quyền** (Effect allow/deny, Action, Resource, Condition). Chỉ là \\"danh sách quyền\\

## Detailed Answer (EN)
IAM governs **who can do what** on AWS.\
\
- **Policy**: a JSON document declaring **permissions** (Effect allow/deny, Action, Resource, Condition). It is just a \\"list of permissions\\"; on its own it belongs to no one — it is **attached** to a user/group/role.\
- **Role**: an **identity with no fixed credentials**, with policies attached, that is **assumed temporarily** (short-lived credentials via STS).\
\
Why roles beat access keys: attach a role to an **EC2/Lambda/service** so it calls AWS **without hardcoding keys** → safer, auto-rotating credentials. Roles also enable **cross-account access** and federation.\
\
Golden rule: **least privilege** — grant only the minimum permissions needed.
