---
id: terraform-modules-reusability
position: devops
technology: terraform-iac
level: mid
tags: [terraform, modules, reusability]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Module trong Terraform là gì và giúp gì cho việc tái sử dụng code? Thiết kế một module tốt cần lưu ý những nguyên tắc nào?

## Question (EN)
What is a Terraform module and how does it enable code reuse? What principles should guide designing a good module?

## Đáp án chi tiết (VI)
**Module** là một tập hợp file `.tf` được đóng gói lại, nhận **input variables**, tạo ra resource, và trả về **output** — về bản chất giống một "hàm" trong lập trình, giúp tránh copy-paste cấu hình giữa nhiều môi trường/dự án.

**Cấu trúc thư mục module điển hình:**
```
modules/
  vpc/
    main.tf        # định nghĩa resource
    variables.tf   # input
    outputs.tf     # output
    versions.tf    # ràng buộc version provider/terraform
    README.md
```

**Ví dụ module VPC đơn giản:**
```hcl
# modules/vpc/variables.tf
variable "cidr_block" {
  type = string
}
variable "name" {
  type = string
}

# modules/vpc/main.tf
resource "aws_vpc" "this" {
  cidr_block = var.cidr_block
  tags       = { Name = var.name }
}

# modules/vpc/outputs.tf
output "vpc_id" {
  value = aws_vpc.this.id
}
```

**Sử dụng module trong root module:**
```hcl
module "prod_vpc" {
  source     = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
  name       = "prod-vpc"
}

module "staging_vpc" {
  source     = "./modules/vpc"
  cidr_block = "10.1.0.0/16"
  name       = "staging-vpc"
}
```
→ Cùng một module, dùng lại 2 lần với input khác nhau, tránh viết trùng resource `aws_vpc` hai lần.

**Nguồn module (`source`) phổ biến:**
- Local path: `./modules/vpc`
- Terraform Registry: `source = "terraform-aws-modules/vpc/aws"`, có `version = "~> 5.0"`
- Git repo: `source = "git::https://github.com/org/repo.git//modules/vpc?ref=v1.2.0"`

**Nguyên tắc thiết kế module tốt:**
1. **Single responsibility**: một module chỉ nên làm một việc rõ ràng (ví dụ "tạo VPC", không nên nhồi cả VPC + EC2 + RDS vào một module khổng lồ) — dễ test, dễ tái sử dụng độc lập.
2. **Input rõ ràng, có default hợp lý**: dùng `variable` với `description` và `default` khi có thể, tránh buộc người dùng phải hiểu hết chi tiết bên trong.
3. **Output đầy đủ những gì module khác cần**: đừng để người dùng phải "đào" vào bên trong module để lấy giá trị.
4. **Versioning nghiêm ngặt**: khi publish module dùng chung nhiều team, luôn tag version theo semver và pin version ở nơi dùng, tránh module cập nhật ngầm phá vỡ hạ tầng đang chạy.
5. **Tránh hardcode** giá trị cụ thể môi trường (region, account ID, tên riêng) bên trong module — nên nhận qua variable.
6. **Hạn chế độ sâu lồng module** (module gọi module gọi module) — càng sâu càng khó debug khi có lỗi vì thông báo lỗi phải "chui" qua nhiều lớp.

**Gotcha thường gặp:** thay đổi `source` hoặc cấu trúc bên trong module (ví dụ đổi tên resource block trong module) khiến Terraform hiểu nhầm resource bị xóa/tạo lại ở **mọi nơi** đang gọi module đó — một thay đổi tưởng nhỏ trong module dùng chung có thể gây downtime hàng loạt trên nhiều môi trường cùng lúc. Vì vậy module dùng chung cần test kỹ (ví dụ Terratest) trước khi bump version.

## Detailed Answer (EN)
A **module** is a packaged set of `.tf` files that accepts **input variables**, creates resources, and returns **outputs** — essentially a "function" in programming terms, avoiding copy-pasted configuration across environments/projects.

**Typical module directory structure:**
```
modules/
  vpc/
    main.tf        # resource definitions
    variables.tf   # inputs
    outputs.tf     # outputs
    versions.tf    # provider/terraform version constraints
    README.md
```

**Simple VPC module example:**
```hcl
# modules/vpc/variables.tf
variable "cidr_block" {
  type = string
}
variable "name" {
  type = string
}

# modules/vpc/main.tf
resource "aws_vpc" "this" {
  cidr_block = var.cidr_block
  tags       = { Name = var.name }
}

# modules/vpc/outputs.tf
output "vpc_id" {
  value = aws_vpc.this.id
}
```

**Using the module from a root module:**
```hcl
module "prod_vpc" {
  source     = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
  name       = "prod-vpc"
}

module "staging_vpc" {
  source     = "./modules/vpc"
  cidr_block = "10.1.0.0/16"
  name       = "staging-vpc"
}
```
→ The same module reused twice with different inputs, avoiding writing the `aws_vpc` resource twice.

**Common module sources (`source`):**
- Local path: `./modules/vpc`
- Terraform Registry: `source = "terraform-aws-modules/vpc/aws"`, with `version = "~> 5.0"`
- Git repo: `source = "git::https://github.com/org/repo.git//modules/vpc?ref=v1.2.0"`

**Principles for good module design:**
1. **Single responsibility**: a module should do one clear thing (e.g., "create a VPC," not cram VPC + EC2 + RDS into one giant module) — easier to test and reuse independently.
2. **Clear inputs with sensible defaults**: use `variable` with `description` and `default` where possible, so users don't need to understand every internal detail.
3. **Complete outputs**: expose everything other modules need — don't force users to "dig" into the module internals.
4. **Strict versioning**: when a module is shared across teams, tag versions with semver and pin the version at the call site, avoiding silent module updates breaking live infrastructure.
5. **Avoid hardcoding** environment-specific values (region, account ID, specific names) inside the module — accept them via variables instead.
6. **Limit module nesting depth** (module calling module calling module) — the deeper it goes, the harder it is to debug since error messages have to "surface" through multiple layers.

**Common gotcha:** changing the `source` or internal structure of a module (e.g., renaming a resource block inside it) makes Terraform think the resource was deleted/recreated **everywhere** that module is used — a seemingly small change to a shared module can cause simultaneous downtime across many environments. That's why shared modules need thorough testing (e.g., Terratest) before bumping the version.
