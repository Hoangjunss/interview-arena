---
id: thay-mot-resource-dang-phuc-vu-ma-khong-downtime-thi-cau-hinh-the-nao
position: backend
technology: lifecycle
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thay một resource đang phục vụ mà không downtime thì cấu hình thế nào?

## Question (EN)
How do you replace a serving resource without downtime?

## Đáp án chi tiết (VI)
`create_before_destroy`. Mặc định Terraform destroy trước rồi create sau, nên có một khoảng không có resource nào phục vụ.\
\
```hcl\
resource \\"aws_launch_template\\" \\"app\\" {\
  name_prefix = \\"app-\\"        # bat buoc: ten phai unique\
\
  lifecycle {\
    create_before_destroy = true\
  }\
}\
```\
\
Điều kiện để chạy được: hai bản phải tồn tại đồng thời. Nhiều resource ràng buộc tên unique nên phải dùng `name_prefix` thay vì `name`, không thì create cái mới fail vì trùng tên.\
\
Với resource stateful như RDS, cách này thường không dùng được vì dữ liệu không tự chuyển sang bản mới — cần một quy trình migration riêng.\
\
Với app server, cách chuẩn hơn là để ASG + `instance_refresh` lo rolling update: nền tảng tự drain instance cũ khỏi target group và chờ health check của instance mới.

## Detailed Answer (EN)
`create_before_destroy`. By default Terraform destroys first and creates after, leaving a window with nothing serving.\
\
```hcl\
resource \\"aws_launch_template\\" \\"app\\" {\
  name_prefix = \\"app-\\"        # required: names must be unique\
\
  lifecycle {\
    create_before_destroy = true\
  }\
}\
```\
\
The precondition: both copies must coexist. Many resources enforce unique names, so use `name_prefix` instead of `name` or creating the new one fails on a clash.\
\
For stateful resources such as RDS this usually does not apply, since data does not follow the new instance — that needs a separate migration process.\
\
For application servers the cleaner path is an ASG with `instance_refresh` handling the rolling update: the platform drains old instances from the target group and waits for new health checks.
