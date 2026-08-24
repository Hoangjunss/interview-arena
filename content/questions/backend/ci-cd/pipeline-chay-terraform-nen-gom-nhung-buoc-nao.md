---
id: pipeline-chay-terraform-nen-gom-nhung-buoc-nao
position: backend
technology: ci-cd
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pipeline chạy Terraform nên gồm những bước nào?

## Question (EN)
What steps belong in a Terraform pipeline?

## Đáp án chi tiết (VI)
`plan` tự động khi mở PR và post output vào comment, `apply` sau khi merge. Thay đổi hạ tầng đi qua đúng quy trình như thay đổi code.\
\
```yaml\
# PR\
- terraform fmt -check\
- terraform validate\
- tfsec .                                  # scan security\
- terraform plan -out=tfplan -lock-timeout=5m\
- post plan output vao PR comment\
\
# merge vao main\
- terraform apply tfplan                   # dung file plan da review\
```\
\
Điểm quan trọng về tính đúng đắn: **apply đúng file plan đã review**, đừng plan lại lúc apply. Giữa hai thời điểm, code hoặc hạ tầng có thể đã đổi.\
\
Về quyền: CI dùng OIDC role ngắn hạn thay vì access key cố định lưu trong secret. Key cố định bị lộ là kẻ tấn công có toàn quyền trên hạ tầng.\
\
Hai kiểm tra rẻ mà đáng thêm: chặn merge nếu plan có `destroy` trên resource stateful, và ước tính chi phí (Infracost) cho thay đổi lớn.

## Detailed Answer (EN)
Automatic `plan` on pull requests with the output posted as a comment, and `apply` after merge. Infrastructure changes then follow the same process as code changes.\
\
```yaml\
# pull request\
- terraform fmt -check\
- terraform validate\
- tfsec .                                  # security scan\
- terraform plan -out=tfplan -lock-timeout=5m\
- post the plan output as a PR comment\
\
# merge to main\
- terraform apply tfplan                   # apply the reviewed plan file\
```\
\
An important correctness point: **apply the exact plan file you reviewed**, do not replan at apply time. Between the two moments code or infrastructure may have changed.\
\
On permissions: CI should use a short-lived OIDC role rather than a static access key in secrets. A leaked static key gives an attacker full infrastructure control.\
\
Two cheap checks worth adding: block merges when the plan destroys stateful resources, and estimate cost (Infracost) for large changes.
