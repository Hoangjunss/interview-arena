---
id: tach-code-ra-module-co-giam-blast-radius-khong
position: backend
technology: modules
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tách code ra module có giảm blast radius không?

## Question (EN)
Does splitting code into modules reduce blast radius?

## Đáp án chi tiết (VI)
**Không.** Module tách về mặt code để reuse, nhưng mọi module trong cùng một config **vẫn dùng chung một state**. Gõ nhầm `terraform destroy` vẫn xoá hết.\
\
Hai mức tách khác nhau hoàn toàn:\
- **Module** = reuse code, giao diện `variable` / `output`.\
- **State riêng** = config độc lập, thư mục riêng, backend key riêng. Đây mới là thứ giới hạn blast radius.\
\
```hcl\
module \\"vpc\\" {\
  source  = \\"git::ssh://git@github.com/acme/tf-modules.git//vpc?ref=v2.3.0\\"\
  cidr    = \\"10.0.0.0/16\\"\
  azs     = [\\"ap-southeast-1a\\

## Detailed Answer (EN)
**No.** Modules separate code for reuse, but every module in one configuration **shares a single state**. A mistyped `terraform destroy` still takes everything.\
\
Two entirely different levels of separation:\
- **Module** = code reuse through a `variable` / `output` interface.\
- **Separate state** = an independent configuration, its own directory and backend key. Only this limits blast radius.\
\
```hcl\
module \\"vpc\\" {\
  source  = \\"git::ssh://git@github.com/acme/tf-modules.git//vpc?ref=v2.3.0\\"\
  cidr    = \\"10.0.0.0/16\\"\
  azs     = [\\"ap-southeast-1a\\
