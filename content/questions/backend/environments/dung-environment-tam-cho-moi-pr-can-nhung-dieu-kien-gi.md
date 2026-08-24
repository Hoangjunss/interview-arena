---
id: dung-environment-tam-cho-moi-pr-can-nhung-dieu-kien-gi
position: backend
technology: environments
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dựng environment tạm cho mỗi PR cần những điều kiện gì?

## Question (EN)
What does an ephemeral environment per pull request require?

## Đáp án chi tiết (VI)
Mọi resource phải **đặt tên theo branch/PR** để không trùng, và **destroy sạch được** khi PR đóng.\
\
```hcl\
locals { prefix = \\"pr-${var.pr_number}\\" }\
\
resource \\"aws_s3_bucket\\" \\"assets\\" {\
  bucket = \\"${local.prefix}-acme-assets\\"   # ten global unique\
}\
```\
\
Các chỗ thường vướng:\
- Tên unique toàn cầu (S3 bucket, domain, ECR repo).\
- Resource có `prevent_destroy` hoặc `deletion_protection` copy từ production sang.\
- Thứ sinh ra gián tiếp mà destroy không dọn: CloudWatch log group, snapshot, ENI còn attach.\
\
Bắt buộc phải có **cleanup theo TTL**, không phụ thuộc vào việc ai đó nhớ xoá — PR bỏ dở là chuyện bình thường.\
\
```bash\
# cron: destroy moi workspace pr-* qua 7 ngay khong co commit\
```\
\
Env tạm không cần giống hệt production: dựng bản nhỏ hơn, ít replica, instance type rẻ là đủ cho phần lớn nhu cầu test và rẻ hơn nhiều.

## Detailed Answer (EN)
Every resource must be **named per branch or PR** to avoid clashes, and must **destroy cleanly** when the PR closes.\
\
```hcl\
locals { prefix = \\"pr-${var.pr_number}\\" }\
\
resource \\"aws_s3_bucket\\" \\"assets\\" {\
  bucket = \\"${local.prefix}-acme-assets\\"   # globally unique name\
}\
```\
\
Common friction points:\
- Globally unique names (S3 buckets, domains, ECR repos).\
- Resources carrying `prevent_destroy` or `deletion_protection` copied from production.\
- Indirect leftovers destroy does not clean: CloudWatch log groups, snapshots, attached ENIs.\
\
A **TTL-based cleanup** is mandatory rather than relying on someone remembering — abandoned PRs are normal.\
\
```bash\
# cron: destroy every pr-* workspace with no commits for 7 days\
```\
\
Ephemeral environments need not mirror production: a smaller build with fewer replicas and cheaper instance types covers most testing far more cheaply.
