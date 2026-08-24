---
id: ai-nen-co-quyen-terraform-apply-len-production
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ai nên có quyền `terraform apply` lên production?

## Question (EN)
Who should be allowed to run `terraform apply` against production?

## Đáp án chi tiết (VI)
Chỉ **CI role**. Người chỉ có read-only ở production. Nhờ vậy mọi thay đổi đều qua review, để lại audit trail, và không ai apply từ laptop.\
\
Dùng OIDC để CI mượn role ngắn hạn, không giữ access key:\
\
```yaml\
permissions: { id-token: write, contents: read }\
steps:\
  - uses: aws-actions/configure-aws-credentials@v4\
    with:\
      role-to-assume: arn:aws:iam::111122223333:role/terraform-apply\
```\
\
Phải chuẩn bị sẵn **break-glass**: một quy trình cấp quyền tạm có ghi log và có người duyệt. Không có đường này thì lúc sự cố mọi người tự tìm cách vượt rào, và kiểm soát mất tác dụng hoàn toàn.\
\
Với thay đổi rủi ro cao, thêm manual approval giữa `plan` và `apply` để người duyệt xem đúng plan đó rồi mới bấm chạy.

## Detailed Answer (EN)
Only **the CI role**. Humans have read-only access in production. Every change then passes review, leaves an audit trail, and nobody applies from a laptop.\
\
Use OIDC so CI assumes a short-lived role instead of holding access keys:\
\
```yaml\
permissions: { id-token: write, contents: read }\
steps:\
  - uses: aws-actions/configure-aws-credentials@v4\
    with:\
      role-to-assume: arn:aws:iam::111122223333:role/terraform-apply\
```\
\
A **break-glass** path must exist: temporary elevation that is logged and approved. Without it, people improvise around the controls during incidents and the controls stop meaning anything.\
\
For high-risk changes, add a manual approval gate between `plan` and `apply` so the approver reviews that exact plan before triggering it.
