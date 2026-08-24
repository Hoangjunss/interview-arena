---
id: vi-sao-tag-moi-resource-lai-quan-trong-va-ap-tag-nhat-quan-bang-cach-nao
position: backend
technology: operations
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao tag mọi resource lại quan trọng, và áp tag nhất quán bằng cách nào?

## Question (EN)
Why does tagging every resource matter, and how do you apply tags consistently?

## Đáp án chi tiết (VI)
Tag cho phép **phân bổ chi phí theo team/dự án** và trả lời được resource lạ này của ai. Không có tag thì hoá đơn chỉ là một con số tổng.\
\
Áp một lần ở provider level:\
\
```hcl\
provider \\"aws\\" {\
  default_tags {\
    tags = {\
      Environment = var.env\
      Owner       = \\"team-payment\\"\
      Service     = \\"checkout-api\\"\
      ManagedBy   = \\"terraform\\"    # phan biet voi resource tao tay\
    }\
  }\
}\
```\
\
Tag `ManagedBy` là cái hữu ích nhất lúc dọn dẹp: nó tách ngay resource do Terraform quản lý khỏi thứ ai đó tạo tay từ 2 năm trước.\
\
Một số resource không nhận `default_tags` (ASG cần `tag` block riêng, EBS volume của EC2 cần `volume_tags`) — đây là chỗ hay sót.\
\
Đi kèm rất hiệu quả: đưa tag bắt buộc vào policy check, để dữ liệu chi phí và ownership luôn đầy đủ mà không cần nhắc nhau.

## Detailed Answer (EN)
Tags enable **cost allocation by team and project** and answer who owns an unfamiliar resource. Without them the bill is a single number.\
\
Apply them once at the provider level:\
\
```hcl\
provider \\"aws\\" {\
  default_tags {\
    tags = {\
      Environment = var.env\
      Owner       = \\"team-payment\\"\
      Service     = \\"checkout-api\\"\
      ManagedBy   = \\"terraform\\"    # distinguishes from hand-made resources\
    }\
  }\
}\
```\
\
The `ManagedBy` tag is the most useful during cleanups: it immediately separates Terraform-managed resources from something created by hand two years ago.\
\
Some resources ignore `default_tags` (ASGs need their own `tag` blocks, EC2 volumes need `volume_tags`) — a frequent gap.\
\
A highly effective companion: enforce required tags in policy checks so cost and ownership data stays complete without anyone chasing it.
