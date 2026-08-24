---
id: state-bi-xoa-mat-hoan-toan-hau-qua-va-cach-khoi-phuc
position: backend
technology: state
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
State bị xoá mất hoàn toàn. Hậu quả và cách khôi phục?

## Question (EN)
The state file is lost entirely. What happens and how do you recover?

## Đáp án chi tiết (VI)
Hạ tầng vẫn chạy nhưng **Terraform không còn biết gì về nó**: apply sẽ cố tạo lại mọi thứ và fail vì trùng tên. Khôi phục bằng cách import lại từng resource, rất tốn thời gian với hạ tầng lớn.\
\
Đây là lý do bucket state phải bật **versioning**:\
\
```bash\
aws s3api list-object-versions --bucket acme-tfstate \\\\\
  --prefix prod/network/terraform.tfstate\
aws s3api get-object --bucket acme-tfstate \\\\\
  --key prod/network/terraform.tfstate --version-id \u003cid\u003e restored.tfstate\
terraform state push restored.tfstate\
```\
\
Restore mất vài phút, còn import tay có thể mất nhiều ngày.\
\
Phòng ngừa nên có cùng lúc: versioning + MFA delete trên bucket, IAM chặn `s3:DeleteObject` cho người thường, và backup state định kỳ sang account khác.\
\
Một biến thể khó thấy hơn: state còn nhưng bị ghi đè bởi một apply song song hoặc `-migrate-state` sai. Một phần hạ tầng biến mất khỏi state trong khi phần khác vẫn còn, và chỉ lộ ra khi plan đề xuất tạo lại thứ đang chạy.

## Detailed Answer (EN)
Infrastructure keeps running but **Terraform knows nothing about it**: an apply tries to recreate everything and fails on name clashes. Recovery means importing each resource, which is very slow at scale.\
\
This is why the state bucket needs **versioning**:\
\
```bash\
aws s3api list-object-versions --bucket acme-tfstate \\\\\
  --prefix prod/network/terraform.tfstate\
aws s3api get-object --bucket acme-tfstate \\\\\
  --key prod/network/terraform.tfstate --version-id \u003cid\u003e restored.tfstate\
terraform state push restored.tfstate\
```\
\
A restore takes minutes; manual re-import can take days.\
\
Preventive measures to have together: bucket versioning plus MFA delete, IAM denying `s3:DeleteObject` to normal users, and periodic state backups into another account.\
\
A harder-to-spot variant: state survives but was overwritten by a concurrent apply or a wrong `-migrate-state`. Part of the infrastructure disappears from state while the rest remains, surfacing only when a plan proposes recreating something that is already running.
