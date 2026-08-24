---
id: khac-nhau-giua-resource-va-data-block-dung-data-khi-nao
position: backend
technology: data-sources
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác nhau giữa `resource` và `data` block? Dùng `data` khi nào?

## Question (EN)
What is the difference between a `resource` and a `data` block, and when do you use `data`?

## Đáp án chi tiết (VI)
`resource` tạo và quản lý vòng đời; `data` **chỉ đọc thứ đã tồn tại**, không tạo, không sửa, không xoá.\
\
```hcl\
data \\"aws_vpc\\" \\"shared\\" {\
  tags = { Name = \\"platform-vpc\\" }   # do team infra quản lý\
}\
\
resource \\"aws_security_group\\" \\"api\\" {\
  vpc_id = data.aws_vpc.shared.id    # chỉ tham chiếu\
}\
```\
\
Đây là cách nối các state độc lập mà không gộp chúng: team platform sở hữu VPC, team application chỉ đọc và không có quyền sửa.\
\
Hai cái bẫy:\
- `data` được đọc lúc **plan**. Nếu nó phụ thuộc resource tạo trong cùng lần apply, plan sẽ ra `(known after apply)` và có khi phải tách hai lần apply.\
- `data \\"aws_ami\\" { most_recent = true }` rất tiện nhưng làm plan đổi theo thời gian dù code không đổi, AMI mới ra là EC2 bị replace ngoài ý muốn. Pin AMI ID cho production.

## Detailed Answer (EN)
`resource` creates and owns a lifecycle; `data` **only reads something that already exists** — it never creates, updates or deletes.\
\
```hcl\
data \\"aws_vpc\\" \\"shared\\" {\
  tags = { Name = \\"platform-vpc\\" }   # owned by the infra team\
}\
\
resource \\"aws_security_group\\" \\"api\\" {\
  vpc_id = data.aws_vpc.shared.id    # reference only\
}\
```\
\
This is how independent states connect without merging: the platform team owns the VPC, the application team reads it and cannot change it.\
\
Two traps:\
- Data sources are read at **plan** time. If one depends on a resource created in the same apply, the plan shows `(known after apply)` and sometimes needs two applies.\
- `data \\"aws_ami\\" { most_recent = true }` is convenient but makes plans change over time with unchanged code — a new AMI release silently replaces EC2 instances. Pin the AMI ID for production.
