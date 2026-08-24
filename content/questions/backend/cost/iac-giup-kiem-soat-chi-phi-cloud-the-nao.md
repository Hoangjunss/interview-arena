---
id: iac-giup-kiem-soat-chi-phi-cloud-the-nao
position: backend
technology: cost
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
IaC giúp kiểm soát chi phí cloud thế nào?

## Question (EN)
How does IaC help control cloud cost?

## Đáp án chi tiết (VI)
Chi phí thành thứ **nhìn thấy được lúc review PR** thay vì phát hiện vào cuối tháng.\
\
```bash\
infracost breakdown --path .\
# Monthly cost change: +$847  (aws_db_instance.analytics: db.r6g.4xlarge)\
```\
\
Ba lợi ích cụ thể:\
1. **Ước tính trước khi merge** — reviewer thấy ngay một PR làm hoá đơn tăng 800 đô/tháng.\
2. **Dọn dẹp khả thi** — mọi resource đều có trong code và có tag, nên tìm ra thứ không ai dùng là làm được. Hạ tầng tạo tay thì không ai dám xoá vì không biết nó phục vụ gì.\
3. **Ephemeral environment** — dựng env đầy đủ cho một branch rồi `terraform destroy` sạch khi merge, chỉ khả thi khi mọi thứ nằm trong code.\
\
Thực hành đáng có: đặt ngưỡng trong pipeline, ví dụ thay đổi làm tăng hơn 500 đô/tháng thì cần thêm một người duyệt.

## Detailed Answer (EN)
Cost becomes **visible at PR review time** instead of at month end.\
\
```bash\
infracost breakdown --path .\
# Monthly cost change: +$847  (aws_db_instance.analytics: db.r6g.4xlarge)\
```\
\
Three concrete benefits:\
1. **Estimates before merge** — a reviewer immediately sees a PR adding $800 a month.\
2. **Feasible cleanup** — every resource is in code and tagged, so finding what nobody uses is possible. With hand-built infrastructure nobody dares delete anything.\
3. **Ephemeral environments** — a full environment per branch, then `terraform destroy` on merge, only works when everything lives in code.\
\
A practice worth having: a pipeline threshold, for example requiring a second approver when a change adds more than $500 a month.
