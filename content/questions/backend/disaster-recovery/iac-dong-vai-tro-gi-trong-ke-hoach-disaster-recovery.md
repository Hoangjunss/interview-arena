---
id: iac-dong-vai-tro-gi-trong-ke-hoach-disaster-recovery
position: backend
technology: disaster-recovery
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
IaC đóng vai trò gì trong kế hoạch disaster recovery?

## Question (EN)
What role does IaC play in a disaster recovery plan?

## Đáp án chi tiết (VI)
Nó cho phép **dựng lại hạ tầng nhanh ở region khác**, nhưng **dữ liệu vẫn cần backup hoặc replication riêng**. Code mô tả hạ tầng chứ không chứa dữ liệu.\
\
Điều kiện dễ bị bỏ qua: **code phải thật sự dựng lại được từ số không**. Nhiều dự án có code đầy đủ trên giấy nhưng chưa bao giờ thử, và lúc cần thì phát hiện hàng loạt thứ tạo tay từ lâu.\
\
Bài diễn tập nên có: định kỳ dựng toàn bộ hệ thống trong một account trống. Nó vừa kiểm chứng code vừa đo được **RTO thật**.\
\
```bash\
AWS_PROFILE=dr-drill terraform apply -var-file=dr.tfvars\
# do thoi gian tu apply den khi health check xanh\
```\
\
Các phần thường thiếu khi diễn tập: secret và certificate, DNS record, service quota ở account mới, và cấu hình tạo tay ở tầng tổ chức. Chính những thứ này quyết định RTO chứ không phải thời gian `terraform apply`.

## Detailed Answer (EN)
It allows **rebuilding infrastructure quickly in another region**, but **data still needs its own backups or replication**. Code describes infrastructure, not data.\
\
An easily missed precondition: **the code must genuinely rebuild from zero**. Many projects have complete code on paper but never tried it, and when the moment comes they find plenty of long-forgotten hand-made pieces.\
\
The drill worth having: periodically stand up the whole system in an empty account. It validates the code and measures **real RTO**.\
\
```bash\
AWS_PROFILE=dr-drill terraform apply -var-file=dr.tfvars\
# time from apply to green health checks\
```\
\
Parts usually missing in drills: secrets and certificates, DNS records, service quotas in the new account, and organisation-level configuration created by hand. These, not `terraform apply` runtime, determine RTO.
