---
id: viec-gi-khong-nen-giao-cho-terraform-quan-ly
position: backend
technology: architecture
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Việc gì không nên giao cho Terraform quản lý?

## Question (EN)
What should not be managed by Terraform?

## Đáp án chi tiết (VI)
**Dữ liệu nghiệp vụ và state bên trong ứng dụng.** Terraform quản lý vòng đời hạ tầng; migration schema, seed data và thao tác một lần thuộc về pipeline riêng có kiểm soát chặt hơn.\
\
Các thứ khác cũng không hợp:\
- Cấu hình bên trong máy chủ — thuộc về AMI dựng sẵn hoặc Ansible.\
- Thao tác kiểu quy trình (gọi API, chờ điều kiện) — không idempotent.\
- Deploy phiên bản ứng dụng — thuộc về CD tool, không phải `terraform apply` mỗi lần release.\
\
Một vùng xám hay gây tranh cãi: resource do dịch vụ tự sinh như CloudWatch log group của Lambda, hoặc ENI của ECS task. Đưa vào quản lý làm plan nhiễu; bỏ ngoài thì không ai dọn khi xoá service. Không có câu trả lời đúng chung, nhưng phải chọn có ý thức và ghi lại quyết định.\
\
Nguyên tắc hữu ích: **thứ gì có vòng đời khác với hạ tầng quanh nó thì để ở quy trình khác**.

## Detailed Answer (EN)
**Business data and in-application state.** Terraform owns infrastructure lifecycle; schema migrations, seed data and one-off operations belong to a separate, more tightly controlled pipeline.\
\
Other poor fits:\
- Configuration inside servers — that belongs to a prebuilt AMI or Ansible.\
- Procedural actions (calling an API, waiting on a condition) — not idempotent.\
- Application version deploys — that belongs to a CD tool, not a `terraform apply` per release.\
\
A contested grey area: service-generated resources such as a Lambda CloudWatch log group or an ECS task ENI. Managing them makes plans noisy; leaving them out means nobody cleans them up when the service is deleted. There is no universal answer, but the choice should be deliberate and written down.\
\
A useful rule: **anything with a different lifecycle from the infrastructure around it belongs in a different process**.
