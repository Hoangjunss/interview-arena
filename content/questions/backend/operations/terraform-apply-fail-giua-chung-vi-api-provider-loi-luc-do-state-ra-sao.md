---
id: terraform-apply-fail-giua-chung-vi-api-provider-loi-luc-do-state-ra-sao
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`terraform apply` fail giữa chừng vì API provider lỗi. Lúc đó state ra sao?

## Question (EN)
An apply fails midway because of a provider API error. What state are you in?

## Đáp án chi tiết (VI)
Resource đã tạo **vẫn được ghi vào state**, nên chạy lại sẽ làm tiếp phần còn thiếu chứ không làm lại từ đầu. Terraform không có transaction trên nhiều resource nên không có rollback toàn bộ.\
\
Trường hợp khó chịu hơn: resource đã tạo ở phía AWS nhưng response mất nên state chưa ghi. Lần sau apply sẽ cố tạo lại và fail vì trùng tên — xử lý bằng `terraform import` rồi chạy tiếp.\
\
Các cấu hình giảm loại lỗi này:\
\
```hcl\
provider \\"aws\\" { max_retries = 10 }\
\
resource \\"aws_db_instance\\" \\"main\\" {\
  timeouts { create = \\"60m\\" }   # RDS tao lau hon default\
}\
```\
\
```bash\
terraform apply -parallelism=5   # giam khi bi API rate limit\
```\
\
Thói quen vận hành: fail thì đọc kỹ message trước khi retry. Lỗi cấu hình mà cứ chạy lại có thể để lại resource rác sau mỗi lần thử.

## Detailed Answer (EN)
Resources already created **are recorded in state**, so rerunning continues from where it stopped. Terraform has no multi-resource transaction, so there is no full rollback.\
\
The more awkward case: the resource was created at AWS but the response was lost, so state never recorded it. The next apply tries to create it again and fails on a name clash — fix it with `terraform import` and continue.\
\
Settings that reduce this class of error:\
\
```hcl\
provider \\"aws\\" { max_retries = 10 }\
\
resource \\"aws_db_instance\\" \\"main\\" {\
  timeouts { create = \\"60m\\" }   # RDS takes longer than the default\
}\
```\
\
```bash\
terraform apply -parallelism=5   # lower it when hitting API rate limits\
```\
\
An operational habit: read the message before retrying. Blindly retrying a configuration error can leave orphaned resources on every attempt.
