---
id: terraform-targeted-apply-blast-radius
position: devops
technology: terraform-iac
level: mid
tags: [terraform, blast-radius, targeted-apply]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`-target` trong Terraform là gì và dùng khi nào? Có những cách nào khác để giới hạn "blast radius" khi apply thay đổi hạ tầng?

## Question (EN)
What is `-target` in Terraform and when should it be used? What other ways exist to limit the "blast radius" when applying infrastructure changes?

## Đáp án chi tiết (VI)
**`-target`** cho phép giới hạn `plan`/`apply` chỉ tác động lên **một resource/module cụ thể** thay vì toàn bộ state:
```bash
terraform apply -target=aws_instance.web
terraform apply -target=module.database
```

**Khi nào dùng `-target`:**
- **Chữa cháy khẩn cấp**: một resource bị lỗi cần sửa/tạo lại ngay mà không muốn động vào phần còn lại của hạ tầng (tránh apply toàn bộ change set đang pending review).
- **Debug**: cô lập một resource để kiểm tra xem lỗi apply có phải do riêng resource đó không.
- **Rollout theo từng bước** một thay đổi lớn và rủi ro, áp dụng dần từng phần trước khi apply toàn bộ.

**Vì sao KHÔNG nên dùng `-target` như quy trình chuẩn:**
- Nó phá vỡ giả định cốt lõi của Terraform: state phải luôn phản ánh **toàn bộ** cấu hình mong muốn. Dùng `-target` liên tục khiến state dần **lệch khỏi kế hoạch tổng thể** — có thể bỏ sót resource phụ thuộc cần update cùng lúc.
- HashiCorp chính thức khuyến cáo: `-target` chỉ nên dùng cho tình huống ngoại lệ (troubleshooting), **không đưa vào pipeline CI/CD tự động** như một cách vận hành thường xuyên.
- Dễ tạo cảm giác an toàn giả: apply với `-target` "thành công" không đảm bảo apply toàn bộ config sau đó cũng thành công y hệt, vì resource khác có thể đã đổi trạng thái trong lúc đó.

**Các cách giới hạn blast radius bền vững hơn:**

1. **Tách state theo domain/component** (network, database, compute riêng biệt) thay vì 1 state khổng lồ cho toàn bộ hệ thống — lỗi ở component này không ảnh hưởng state của component khác.
```
states/
  network/terraform.tfstate
  database/terraform.tfstate
  compute/terraform.tfstate
```

2. **`lifecycle { prevent_destroy = true }`** cho resource stateful quan trọng (database, S3 chứa dữ liệu).

3. **Review `plan` bắt buộc trong CI/CD** trước khi `apply` — không bao giờ `-auto-approve` trên production mà không có gate.

4. **Sentinel/OPA policy-as-code** (Terraform Cloud/Enterprise hoặc `conftest`) để tự động chặn các plan có hành vi nguy hiểm (ví dụ policy chặn mọi plan có `destroy` trên resource gắn tag `Environment=prod`).

5. **`-replace`** (thay cho `taint` đã deprecated) để buộc tái tạo một resource cụ thể một cách tường minh và có review, thay vì sửa tay state:
```bash
terraform apply -replace="aws_instance.web"
```

**Kinh nghiệm thực tế hay được kể:** một kỹ sư dùng `-target` liên tục trong vài tuần để "apply nhanh" từng phần trong một refactor lớn, dẫn đến khi cuối cùng chạy `apply` không target, Terraform phát hiện hàng loạt drift tích lũy và đề xuất thay đổi lớn ngoài dự kiến — mất nhiều giờ review lại toàn bộ thay vì apply gọn từ đầu.

## Detailed Answer (EN)
**`-target`** restricts `plan`/`apply` to affect only a **specific resource/module** instead of the entire state:
```bash
terraform apply -target=aws_instance.web
terraform apply -target=module.database
```

**When to use `-target`:**
- **Emergency firefighting**: a broken resource needs an immediate fix/recreate without touching the rest of the infrastructure (avoiding applying an entire pending change set).
- **Debugging**: isolating one resource to check whether an apply failure is specific to it.
- **Staged rollout** of a large, risky change, applying it piece by piece before the full apply.

**Why `-target` should NOT be a standard workflow:**
- It breaks Terraform's core assumption that state should always reflect the **entire** desired configuration. Using `-target` repeatedly makes state gradually **drift from the overall plan** — dependent resources that should have been updated together may be missed.
- HashiCorp officially recommends `-target` only for exceptional troubleshooting, **not as a regular part of an automated CI/CD pipeline**.
- It creates a false sense of safety: a successful `-target` apply doesn't guarantee a subsequent full apply will succeed identically, since other resources may have changed state in the meantime.

**More durable ways to limit blast radius:**

1. **Split state by domain/component** (network, database, compute separately) instead of one giant state for the whole system — a failure in one component doesn't affect another's state.
```
states/
  network/terraform.tfstate
  database/terraform.tfstate
  compute/terraform.tfstate
```

2. **`lifecycle { prevent_destroy = true }`** on critical stateful resources (databases, data-holding S3 buckets).

3. **Mandatory `plan` review in CI/CD** before `apply` — never `-auto-approve` production without a gate.

4. **Sentinel/OPA policy-as-code** (Terraform Cloud/Enterprise or `conftest`) to automatically block plans with dangerous behavior (e.g., a policy blocking any plan that would `destroy` a resource tagged `Environment=prod`).

5. **`-replace`** (replacing the deprecated `taint`) to explicitly and reviewably force recreation of a specific resource, instead of hand-editing state:
```bash
terraform apply -replace="aws_instance.web"
```

**A commonly-told war story:** an engineer used `-target` repeatedly for weeks to "quickly apply" parts of a large refactor, and when they finally ran a full untargeted `apply`, Terraform surfaced a huge amount of accumulated drift and proposed sweeping unexpected changes — costing many hours of review that a clean apply from the start would have avoided.
