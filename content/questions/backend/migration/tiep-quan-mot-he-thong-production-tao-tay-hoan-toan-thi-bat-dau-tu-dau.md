---
id: tiep-quan-mot-he-thong-production-tao-tay-hoan-toan-thi-bat-dau-tu-dau
position: backend
technology: migration
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tiếp quản một hệ thống production tạo tay hoàn toàn thì bắt đầu từ đâu?

## Question (EN)
How do you take over a fully hand-built production system with Terraform?

## Đáp án chi tiết (VI)
Bắt đầu từ **nhóm ít rủi ro**: VPC, subnet, IAM, security group, tag. Kiểm chứng quy trình import và review, rồi mới mở rộng sang RDS, EBS, S3.\
\
Quyết định phải chốt sớm: code mô tả hạ tầng **như nó đang có**, hay như nó nên có. Cách đầu an toàn hơn nhiều vì plan rỗng là tín hiệu rõ ràng. Cách sau trộn migration với cải thiện và rất dễ gây sự cố.\
\
Tách hai giai đoạn:\
1. Import và mô tả đúng hiện trạng tới khi `terraform plan` ra \\"No changes\\".\
2. Sau đó mới refactor, chuẩn hoá tên, gom module.\
\
Công cụ hỗ trợ giai đoạn 1:\
\
```bash\
terraformer import aws --resources=vpc,sg --regions=ap-southeast-1\
terraform plan -generate-config-out=generated.tf\
```\
\
Phần thường bị bỏ qua nhưng quyết định thành công: **quy ước và IAM**. Vẫn còn người sửa tay sau khi migrate thì code lệch dần và toàn bộ công sức thành vô nghĩa sau vài tháng.

## Detailed Answer (EN)
Start with the **low-risk group**: VPC, subnets, IAM, security groups, tags. Validate the import and review process, then expand to RDS, EBS and S3.\
\
A decision to settle early: does the code describe infrastructure **as it is**, or as it should be? The former is far safer because an empty plan is a clear signal. The latter mixes migration with improvement and easily causes incidents.\
\
Split it into two phases:\
1. Import and match reality until `terraform plan` reports \\"No changes\\".\
2. Only then refactor, normalise names and extract modules.\
\
Tooling for phase one:\
\
```bash\
terraformer import aws --resources=vpc,sg --regions=ap-southeast-1\
terraform plan -generate-config-out=generated.tf\
```\
\
The overlooked part that decides success: **conventions and IAM**. If people keep editing by hand after the migration, the code drifts and the whole effort is worthless within months.
