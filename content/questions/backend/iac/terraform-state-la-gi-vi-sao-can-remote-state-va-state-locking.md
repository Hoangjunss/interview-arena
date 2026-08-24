---
id: terraform-state-la-gi-vi-sao-can-remote-state-va-state-locking
position: backend
technology: iac
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Terraform state là gì? Vì sao cần remote state và state locking?

## Question (EN)
What is Terraform state, and why do you need remote state and state locking?

## Đáp án chi tiết (VI)
Terraform lưu một **state file** ghi **ánh xạ giữa tài nguyên trong code và tài nguyên thực trên cloud** (id, thuộc tính, quan hệ phụ thuộc). Nhờ state, khi chạy `plan` Terraform biết cái gì **cần tạo / sửa / xóa** thay vì hỏi lại toàn bộ.\
\
Vấn đề và giải pháp:\
- **Làm việc nhóm**: state cục bộ trên máy một người thì người khác không thấy → dùng **remote backend** (S3, Terraform Cloud, GCS) để **lưu state dùng chung**.\
- **State locking**: nếu hai người `apply` cùng lúc, state có thể hỏng → backend **khóa state** trong lúc apply (vd backend S3 — từ Terraform 1.10 có native S3 locking, trước đây cần thêm DynamoDB) để chỉ một thao tác ghi tại một thời điểm.\
- **Drift**: ai đó sửa tay trên console → thực tế lệch state; `plan`/`refresh` phát hiện chênh lệch.\
- **Bảo mật**: state có thể chứa **giá trị nhạy cảm** (mật khẩu, key) → cần **mã hóa** và hạn chế truy cập. **Không sửa state bằng tay**; dùng `terraform state` command khi thật cần.

## Detailed Answer (EN)
Terraform keeps a **state file** recording the **mapping between resources in code and real resources on the cloud** (ids, attributes, dependencies). Thanks to state, on `plan` Terraform knows what to **create / update / delete** instead of re-querying everything.\
\
Problems and solutions:\
- **Teamwork**: local state on one person's machine is invisible to others → use a **remote backend** (S3, Terraform Cloud, GCS) to **store shared state**.\
- **State locking**: if two people `apply` at once, state can be corrupted → the backend **locks state** during apply (e.g. the S3 backend — native S3 locking since Terraform 1.10, previously requiring DynamoDB) so only one write happens at a time.\
- **Drift**: someone edits by hand in the console → reality diverges from state; `plan`/`refresh` detects the difference.\
- **Security**: state may contain **sensitive values** (passwords, keys) → it must be **encrypted** with restricted access. **Never hand-edit state**; use `terraform state` commands when truly needed.
