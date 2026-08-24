---
id: doc-output-cua-terraform-plan-thi-phai-soi-ky-nhat-dong-nao
position: backend
technology: workflow
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đọc output của `terraform plan` thì phải soi kỹ nhất dòng nào?

## Question (EN)
Which lines of `terraform plan` output deserve the most attention?

## Đáp án chi tiết (VI)
Dòng `# ... must be replaced` và ký hiệu `-/+`. Đó là **destroy rồi create lại**, và với RDS hay EBS thì bằng mất dữ liệu.\
\
```text\
  # aws_db_instance.main must be replaced\
-/+ resource \\"aws_db_instance\\" \\"main\\" {\
      ~ identifier = \\"db-prod\\" -\u003e \\"db-production\\" # forces replacement\
```\
\
Đọc theo thứ tự:\
1. Dòng tổng cuối: `Plan: 2 to add, 1 to change, 3 to destroy.` — số destroy khác 0 là phải dừng lại đọc kỹ.\
2. Mọi `# forces replacement` — attribute nào gây replace.\
3. Diff của resource stateful (DB, bucket, volume).\
\
Thực hành nên có: **apply đúng plan đã review**, đừng plan lại lúc apply.\
\
```bash\
terraform plan -out=tfplan\
terraform apply tfplan\
```\
\
Một chi tiết hay bị bỏ qua: plan có refresh state bằng cách gọi API provider nên nó phát hiện luôn drift. Code không đổi mà plan vẫn ra diff nghĩa là có người sửa tay.

## Detailed Answer (EN)
The `# ... must be replaced` lines and the `-/+` marker. That is **destroy then recreate**, and on RDS or EBS it means data loss.\
\
```text\
  # aws_db_instance.main must be replaced\
-/+ resource \\"aws_db_instance\\" \\"main\\" {\
      ~ identifier = \\"db-prod\\" -\u003e \\"db-production\\" # forces replacement\
```\
\
Read in this order:\
1. The summary line: `Plan: 2 to add, 1 to change, 3 to destroy.` — a non-zero destroy count means stop and read carefully.\
2. Every `# forces replacement` — which attribute triggers the replace.\
3. The diff on stateful resources (databases, buckets, volumes).\
\
A practice worth having: **apply the plan you reviewed**, do not replan at apply time.\
\
```bash\
terraform plan -out=tfplan\
terraform apply tfplan\
```\
\
An often missed detail: plan refreshes state through provider APIs, so it also surfaces drift. Unchanged code with a non-empty plan means someone edited by hand.
