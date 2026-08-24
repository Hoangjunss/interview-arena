---
id: terraform-plan-da-mat-15-phut-huong-xu-ly-goc-re-la-gi
position: backend
technology: performance
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`terraform plan` đã mất 15 phút. Hướng xử lý gốc rễ là gì?

## Question (EN)
`terraform plan` now takes 15 minutes. What is the root fix?

## Đáp án chi tiết (VI)
Chia state nhỏ hơn. Mỗi lần chạy phải refresh **mọi resource trong state**, nên thời gian tăng tuyến tính theo số resource.\
\
Giảm nhẹ tạm thời trước khi chia:\
\
```bash\
terraform plan -target=module.api        # thu hep pham vi, chi khi gap\
terraform plan -refresh=false            # bo qua refresh khi chac state con dung\
terraform apply -parallelism=30           # tang neu khong bi rate limit\
```\
\
Cả hai cờ đầu là biện pháp tình thế. `-target` dùng thường xuyên là **dấu hiệu kiến trúc sai**, và nó dễ để lại state không nhất quán.\
\
Ranh giới chia tốt nhất là **theo nhịp thay đổi**: network và IAM hiếm khi đổi thì tách riêng, service đổi hằng ngày nằm ở state khác và chạy nhanh.\
\
Lợi ích kèm theo ít người nhắc: giảm thời gian chờ giữa các team, vì state lock làm team này phải đợi team kia apply xong.

## Detailed Answer (EN)
Split the state. Every run refreshes **every resource in the state**, so time grows linearly with resource count.\
\
Temporary mitigations before splitting:\
\
```bash\
terraform plan -target=module.api        # narrow scope, emergencies only\
terraform plan -refresh=false            # skip refresh when state is known good\
terraform apply -parallelism=30           # raise it if not rate limited\
```\
\
The first two flags are stopgaps. Routine `-target` use is **a sign of wrong architecture** and easily leaves state inconsistent.\
\
The best split boundary is **rate of change**: rarely-changing network and IAM get their own state, while daily-changing services live separately and run fast.\
\
A rarely mentioned benefit: less waiting between teams, since state locking makes one team queue behind another apply.
