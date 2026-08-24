---
id: dua-mot-ec2-tao-tay-vao-terraform-quan-ly-thi-lam-nhung-buoc-nao
position: backend
technology: import
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đưa một EC2 tạo tay vào Terraform quản lý thì làm những bước nào?

## Question (EN)
What are the steps to bring a hand-created EC2 instance under Terraform?

## Đáp án chi tiết (VI)
Viết resource block tương ứng, import vào state theo ID thật, rồi sửa code tới khi **`terraform plan` ra \\"No changes\\"**.\
\
Cách mới (khai báo trong code, review được trong PR):\
\
```hcl\
import {\
  to = aws_instance.legacy_api\
  id = \\"i-0abc123def456\\"\
}\
\
resource \\"aws_instance\\" \\"legacy_api\\" {\
  # terraform plan -generate-config-out=generated.tf sinh khung san\
}\
```\
\
Cách cũ chạy lệnh trực tiếp:\
\
```bash\
terraform import aws_instance.legacy_api i-0abc123def456\
terraform plan   # lap lai toi khi khong con diff\
```\
\
Bước tốn thời gian nhất là bước cuối: resource block phải khớp cấu hình thật tới từng attribute, không thì lần apply đầu tiên sẽ sửa máy đang chạy theo cách không ai muốn.\
\
Khi tiếp quản hạ tầng tạo tay quy mô lớn, đừng import tất cả cùng lúc. Bắt đầu từ nhóm ít rủi ro (VPC, IAM, security group), kiểm chứng quy trình rồi mới tới RDS và EBS.

## Detailed Answer (EN)
Write the matching resource block, import it into state by real ID, then adjust the code until **`terraform plan` reports \\"No changes\\"**.\
\
The modern way (declared in code, reviewable in a PR):\
\
```hcl\
import {\
  to = aws_instance.legacy_api\
  id = \\"i-0abc123def456\\"\
}\
\
resource \\"aws_instance\\" \\"legacy_api\\" {\
  # terraform plan -generate-config-out=generated.tf scaffolds this\
}\
```\
\
The older command-driven way:\
\
```bash\
terraform import aws_instance.legacy_api i-0abc123def456\
terraform plan   # repeat until the diff is empty\
```\
\
The last step takes the longest: the block must match the real configuration attribute by attribute, otherwise the first apply modifies a running machine in ways nobody wants.\
\
When taking over large hand-built infrastructure, do not import everything at once. Start with low-risk groups (VPC, IAM, security groups), validate the process, then move on to RDS and EBS.
