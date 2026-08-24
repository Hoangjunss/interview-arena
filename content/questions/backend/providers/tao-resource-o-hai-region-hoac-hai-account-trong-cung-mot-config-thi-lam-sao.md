---
id: tao-resource-o-hai-region-hoac-hai-account-trong-cung-mot-config-thi-lam-sao
position: backend
technology: providers
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tạo resource ở hai region hoặc hai account trong cùng một config thì làm sao?

## Question (EN)
How do you create resources in two regions or accounts within one configuration?

## Đáp án chi tiết (VI)
Khai báo nhiều `provider` block với `alias`, rồi chỉ định `provider` cho từng resource.\
\
```hcl\
provider \\"aws\\" { region = \\"ap-southeast-1\\" }\
\
provider \\"aws\\" {\
  alias  = \\"us_east\\"\
  region = \\"us-east-1\\"\
}\
\
resource \\"aws_acm_certificate\\" \\"cdn\\" {\
  provider = aws.us_east      # CloudFront bat buoc cert o us-east-1\
  domain_name = \\"acme.vn\\"\
}\
```\
\
Các trường hợp thường cần: cert cho CloudFront, DR ở region thứ hai, và kiến trúc multi-account (mỗi env một account, dùng `assume_role`).\
\
Khi truyền vào module, module phải khai báo rõ nó cần provider nào:\
\
```hcl\
module \\"dr\\" {\
  source    = \\"./modules/service\\"\
  providers = { aws = aws.us_east }\
}\
```\
\
Để module tự khai báo `provider` bên trong sẽ gây rắc rối khi cần gỡ module. Và gom nhiều account vào một state làm blast radius rất rộng — hạ tầng lớn thì tách state theo account rồi nối bằng data source an toàn hơn.

## Detailed Answer (EN)
Declare several `provider` blocks with `alias`, then set `provider` per resource.\
\
```hcl\
provider \\"aws\\" { region = \\"ap-southeast-1\\" }\
\
provider \\"aws\\" {\
  alias  = \\"us_east\\"\
  region = \\"us-east-1\\"\
}\
\
resource \\"aws_acm_certificate\\" \\"cdn\\" {\
  provider = aws.us_east      # CloudFront requires the cert in us-east-1\
  domain_name = \\"acme.vn\\"\
}\
```\
\
Common cases: CloudFront certificates, DR in a second region, and multi-account setups (one account per environment via `assume_role`).\
\
When passing into a module, the module must declare which providers it needs:\
\
```hcl\
module \\"dr\\" {\
  source    = \\"./modules/service\\"\
  providers = { aws = aws.us_east }\
}\
```\
\
Letting a module declare its own `provider` block causes trouble when removing it later. And combining many accounts into one state widens blast radius considerably — at scale, splitting state per account and linking through data sources is safer.
