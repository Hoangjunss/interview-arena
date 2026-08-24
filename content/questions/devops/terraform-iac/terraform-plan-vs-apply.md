---
id: terraform-plan-vs-apply
position: devops
technology: terraform-iac
level: junior
tags: [terraform, workflow, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sự khác nhau giữa `terraform plan` và `terraform apply` là gì? Vì sao không nên bỏ qua bước `plan` trước khi apply?

## Question (EN)
What is the difference between `terraform plan` and `terraform apply`? Why shouldn't you skip the `plan` step before applying?

## Đáp án chi tiết (VI)
**`terraform plan`**: Đọc file cấu hình `.tf`, so sánh với **state file** hiện tại và trạng thái thật trên cloud provider (thông qua refresh), rồi in ra **bản xem trước (preview)** các thay đổi sẽ xảy ra: resource nào sẽ được **tạo (+)**, **sửa (~)**, hay **xóa (-)**. Lệnh này **không thay đổi gì thật** trên hạ tầng.

**`terraform apply`**: Thực thi các thay đổi đó thật sự lên hạ tầng (gọi API tới AWS/GCP/Azure...), rồi cập nhật lại state file để phản ánh trạng thái mới.

**Ví dụ output của `plan`:**
```
Terraform will perform the following actions:

  # aws_instance.web will be updated in-place
  ~ resource "aws_instance" "web" {
        id            = "i-0abc123"
      ~ instance_type = "t3.micro" -> "t3.small"
    }

  # aws_security_group.old will be destroyed
  - resource "aws_security_group" "old" {
      - id = "sg-0xyz"
    }

Plan: 0 to add, 1 to change, 1 to destroy.
```

**Vì sao không nên bỏ qua `plan`:**
- Plan giúp phát hiện **thay đổi ngoài ý muốn** — ví dụ chỉ sửa 1 dòng biến nhưng do phụ thuộc dây chuyền (implicit dependency), Terraform lại định **destroy và recreate** cả một RDS database (mất dữ liệu!).
- Đây là bước để **review trong CI/CD**: pipeline chuẩn luôn chạy `plan` ở PR, cho người review đọc, sau đó mới `apply` khi merge.
- Trong môi trường production, luôn nên lưu plan ra file rồi apply đúng file đó để tránh race condition (giữa lúc plan và lúc apply, có người khác đã thay đổi hạ tầng):
```bash
terraform plan -out=tfplan
terraform apply tfplan
```
- Nếu apply trực tiếp không qua plan riêng, Terraform vẫn tự chạy plan ngầm và hỏi xác nhận (`yes`), nhưng trong CI/CD tự động (`-auto-approve`) thì rủi ro cao hơn nhiều nếu không có review trước đó.

**Gotcha thường gặp:** Đổi tên resource block (ví dụ `aws_instance.web` → `aws_instance.web_server`) khiến Terraform hiểu nhầm là resource cũ bị xóa và resource mới được tạo, dẫn đến downtime không cần thiết. Cách xử lý đúng là dùng `terraform state mv` hoặc block `moved` thay vì đổi tên trực tiếp.

**Các biến thể của `plan`/`apply` hay bị hỏi thêm:**
- `terraform plan -refresh-only`: chỉ đồng bộ state với thực tế trên cloud (phát hiện drift), không tính thay đổi từ code — dùng để review drift trước khi quyết định `apply -refresh-only` (chấp nhận thực tế) hay sửa lại code cho khớp.
- `terraform plan -destroy`: xem trước điều gì sẽ bị xóa nếu chạy `terraform destroy`, rất hữu ích để double-check trước khi hủy môi trường staging/demo.
- `terraform apply -target=<resource>`: chỉ apply một resource cụ thể — nên dùng như biện pháp chữa cháy tạm thời, không nên đưa vào quy trình chuẩn vì dễ làm state lệch khỏi cấu hình tổng thể.

## Detailed Answer (EN)
**`terraform plan`**: Reads the `.tf` configuration, compares it against the current **state file** and the real state on the cloud provider (via a refresh), then prints a **preview** of what will happen: which resources will be **created (+)**, **modified (~)**, or **destroyed (-)**. This command **does not change anything for real**.

**`terraform apply`**: Actually executes those changes against the infrastructure (calls the AWS/GCP/Azure API, etc.), then updates the state file to reflect the new reality.

**Example `plan` output:**
```
Terraform will perform the following actions:

  # aws_instance.web will be updated in-place
  ~ resource "aws_instance" "web" {
        id            = "i-0abc123"
      ~ instance_type = "t3.micro" -> "t3.small"
    }

  # aws_security_group.old will be destroyed
  - resource "aws_security_group" "old" {
      - id = "sg-0xyz"
    }

Plan: 0 to add, 1 to change, 1 to destroy.
```

**Why you shouldn't skip `plan`:**
- Plan surfaces **unintended changes** — e.g., changing one variable line might, due to an implicit dependency chain, cause Terraform to **destroy and recreate** an entire RDS database (data loss!).
- It's the natural point for **CI/CD review**: a standard pipeline runs `plan` on every PR for a human to read, and only runs `apply` after merge.
- In production, it's best practice to save the plan to a file and apply exactly that file to avoid a race condition (someone else changing infrastructure between plan and apply):
```bash
terraform plan -out=tfplan
terraform apply tfplan
```
- If you apply directly without a saved plan, Terraform still runs plan internally and asks for confirmation (`yes`), but in fully automated CI/CD (`-auto-approve`) the risk is much higher without a prior review gate.

**Common gotcha:** Renaming a resource block (e.g., `aws_instance.web` → `aws_instance.web_server`) makes Terraform think the old resource was deleted and a new one created, causing unnecessary downtime. The correct fix is `terraform state mv` or a `moved` block instead of a plain rename.

**Related flags interviewers often probe:**
- `terraform plan -refresh-only`: only reconciles the state file with real cloud state (drift detection), without factoring in code changes — used to review drift before deciding whether to `apply -refresh-only` (accept reality) or fix the code to match.
- `terraform plan -destroy`: previews what would be destroyed by `terraform destroy` — useful to double-check before tearing down a staging/demo environment.
- `terraform apply -target=<resource>`: applies only a specific resource — treat it as an emergency escape hatch, not a standard workflow, since it easily lets state drift from the full configuration.
