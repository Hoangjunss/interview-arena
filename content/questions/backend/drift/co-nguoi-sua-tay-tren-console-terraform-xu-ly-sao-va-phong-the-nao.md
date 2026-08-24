---
id: co-nguoi-sua-tay-tren-console-terraform-xu-ly-sao-va-phong-the-nao
position: backend
technology: drift
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có người sửa tay trên console. Terraform xử lý sao và phòng thế nào?

## Question (EN)
Someone edited the console by hand. How does Terraform react and how do you prevent it?

## Đáp án chi tiết (VI)
Plan phát hiện drift lúc refresh và **đề xuất kéo resource về đúng code**, nên thay đổi làm tay bị revert ở lần apply kế tiếp.\
\
```text\
  ~ resource \\"aws_security_group\\" \\"api\\" {\
      ~ ingress { ~ cidr_blocks = [\\"0.0.0.0/0\\"] -\u003e [\\"10.0.0.0/8\\"] }\
```\
\
Đây vừa là feature vừa là bẫy: hotfix mở port lúc sự cố sẽ bị xoá âm thầm khi ai đó apply một thay đổi không liên quan.\
\
Phòng theo thứ tự hiệu quả:\
1. **Siết IAM** — production để read-only cho người, quyền write chỉ cho CI role. Không sửa tay được thì code mới thật sự là source of truth.\
2. **Scheduled plan** hằng ngày, alert khi plan không rỗng.\
3. **Quy trình hậu sự cố**: mọi hotfix làm tay phải backport vào code, có người chịu trách nhiệm và có deadline.\
\
Một loại drift không phải do người: provider bump đổi default, hoặc ASG tự scale làm `desired_capacity` lệch. Loại này xử lý bằng `lifecycle { ignore_changes = [desired_capacity] }`.

## Detailed Answer (EN)
Plan detects the drift during refresh and **proposes pulling the resource back to the code**, so manual changes are reverted on the next apply.\
\
```text\
  ~ resource \\"aws_security_group\\" \\"api\\" {\
      ~ ingress { ~ cidr_blocks = [\\"0.0.0.0/0\\"] -\u003e [\\"10.0.0.0/8\\"] }\
```\
\
This is both feature and trap: a hotfix opening a port during an incident is silently removed when someone applies an unrelated change.\
\
Prevention in order of effectiveness:\
1. **Tighten IAM** — production is read-only for humans, write access belongs to the CI role. When manual edits are impossible, code really is the source of truth.\
2. **Scheduled plans** daily, alerting when a plan is non-empty.\
3. **A post-incident process**: every manual hotfix is backported to code with an owner and a deadline.\
\
One kind of drift is not human: a provider bump changing defaults, or an ASG scaling and moving `desired_capacity`. That kind is handled with `lifecycle { ignore_changes = [desired_capacity] }`.
