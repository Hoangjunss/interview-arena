---
id: policy-as-code-sentinel-opa-conftest-dung-de-lam-gi-trong-pipeline-terraform
position: backend
technology: policy
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Policy as code (Sentinel, OPA/Conftest) dùng để làm gì trong pipeline Terraform?

## Question (EN)
What is policy as code (Sentinel, OPA/Conftest) for in a Terraform pipeline?

## Đáp án chi tiết (VI)
Chặn config vi phạm quy định **ngay trong pipeline**: S3 bucket public, security group mở port 22 ra `0.0.0.0/0`, resource thiếu tag bắt buộc.\
\
```rego\
deny[msg] {\
  r := input.resource_changes[_]\
  r.type == \\"aws_security_group_rule\\"\
  r.change.after.cidr_blocks[_] == \\"0.0.0.0/0\\"\
  r.change.after.to_port == 22\
  msg := sprintf(\\"SSH mo ra internet: %s\\

## Detailed Answer (EN)
Blocking non-compliant configuration **inside the pipeline**: public S3 buckets, security groups opening port 22 to `0.0.0.0/0`, resources missing required tags.\
\
```rego\
deny[msg] {\
  r := input.resource_changes[_]\
  r.type == \\"aws_security_group_rule\\"\
  r.change.after.cidr_blocks[_] == \\"0.0.0.0/0\\"\
  r.change.after.to_port == 22\
  msg := sprintf(\\"SSH open to the internet: %s\\
