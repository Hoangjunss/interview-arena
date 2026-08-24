---
id: module-dung-chung-trong-cong-ty-nen-duoc-reference-va-release-the-nao
position: backend
technology: modules
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Module dùng chung trong công ty nên được reference và release thế nào?

## Question (EN)
How should a company-wide shared module be referenced and released?

## Đáp án chi tiết (VI)
Reference theo **version đã pin**, không bao giờ trỏ vào `main`.\
\
```hcl\
module \\"rds\\" {\
  source  = \\"app.terraform.io/acme/rds/aws\\"\
  version = \\"~\u003e 3.2\\"        # registry\
}\
\
module \\"vpc\\" {\
  source = \\"git::ssh://git@github.com/acme/tf-modules.git//vpc?ref=v2.3.0\\"\
}\
```\
\
Trỏ vào `main` nghĩa là hạ tầng đổi chỉ vì ai đó merge một PR, và lúc sự cố không ai lần ra nguyên nhân.\
\
Quy trình release nên có: semver rõ ràng, changelog cho mỗi bản (nhất là breaking change), và test dựng thật trong một account riêng trước khi tag.\
\
Với breaking change: giữ bản cũ chạy được một thời gian và báo trước cho các team đang dùng. Ép nâng cấp đột ngột là cách nhanh nhất khiến các team copy module về repo riêng, và thế là hết dùng chung.\
\
Dấu hiệu module thiết kế tốt: team khác dùng được **mà không cần đọc code bên trong**, chỉ đọc mô tả `variable` và `output`.

## Detailed Answer (EN)
Reference it by a **pinned version**, never `main`.\
\
```hcl\
module \\"rds\\" {\
  source  = \\"app.terraform.io/acme/rds/aws\\"\
  version = \\"~\u003e 3.2\\"        # registry\
}\
\
module \\"vpc\\" {\
  source = \\"git::ssh://git@github.com/acme/tf-modules.git//vpc?ref=v2.3.0\\"\
}\
```\
\
Pointing at `main` means infrastructure changes because someone merged a PR, and during an incident nobody can trace the cause.\
\
A release process needs: clear semver, a changelog per release (especially breaking changes), and real provisioning tests in a scratch account before tagging.\
\
For breaking changes: keep the old version working for a while and notify consumers in advance. Forcing an abrupt upgrade is the fastest way to make teams copy the module into their own repos, ending the sharing.\
\
A sign of good module design: other teams use it **without reading the internals**, relying only on documented `variable` and `output`.
