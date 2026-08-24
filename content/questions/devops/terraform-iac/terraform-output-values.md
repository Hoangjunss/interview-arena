---
id: terraform-output-values
position: devops
technology: terraform-iac
level: junior
tags: [terraform, outputs, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`output` trong Terraform dùng để làm gì? Cho ví dụ một tình huống thực tế cần dùng output.

## Question (EN)
What is an `output` block used for in Terraform? Give a real-world scenario where you would need one.

## Đáp án chi tiết (VI)
**`output`** là cách Terraform "xuất" giá trị của resource ra ngoài sau khi `apply` — dùng để hiển thị thông tin cần thiết, hoặc truyền dữ liệu sang module khác/state khác.

**Khai báo cơ bản:**
```hcl
output "instance_public_ip" {
  description = "Public IP của web server"
  value       = aws_instance.web.public_ip
}

output "db_connection_string" {
  value     = "postgres://${aws_db_instance.main.username}:${var.db_password}@${aws_db_instance.main.endpoint}/appdb"
  sensitive = true
}
```

Sau `terraform apply`:
```
Outputs:

instance_public_ip = "54.123.45.67"
```

**Ba tình huống thực tế cần output:**
1. **Lấy giá trị nhanh sau khi apply** — ví dụ IP để SSH vào server, endpoint của RDS để cấu hình ứng dụng, mà không cần vào console tra thủ công.
2. **Truyền dữ liệu giữa các module** — module `network` output ra `vpc_id`, `subnet_ids`; module `compute` nhận các giá trị đó làm input:
```hcl
module "network" {
  source = "./modules/network"
}

module "compute" {
  source    = "./modules/compute"
  vpc_id    = module.network.vpc_id
  subnet_id = module.network.subnet_ids[0]
}
```
3. **Chia sẻ dữ liệu giữa các state riêng biệt (cross-stack)** — dùng `terraform_remote_state` data source để một stack đọc output của stack khác:
```hcl
data "terraform_remote_state" "network" {
  backend = "s3"
  config = {
    bucket = "my-tfstate"
    key    = "network/terraform.tfstate"
    region = "ap-southeast-1"
  }
}

resource "aws_instance" "app" {
  subnet_id = data.terraform_remote_state.network.outputs.subnet_id
}
```

**Lấy output ra để dùng trong script/CI:**
```bash
terraform output -json > outputs.json
terraform output -raw instance_public_ip
```
Rất hữu ích khi pipeline CI/CD cần lấy endpoint vừa tạo để chạy bước deploy ứng dụng tiếp theo (ví dụ push image, chạy smoke test).

**Lưu ý:** cũng như `variable`, `sensitive = true` trên output chỉ ẩn khi in ra console, giá trị thật vẫn nằm trong state file — không phải cơ chế bảo mật tuyệt đối.

## Detailed Answer (EN)
An **`output`** is how Terraform "exposes" a resource's value after `apply` — used to display needed information or pass data to another module/state.

**Basic declaration:**
```hcl
output "instance_public_ip" {
  description = "Public IP of the web server"
  value       = aws_instance.web.public_ip
}

output "db_connection_string" {
  value     = "postgres://${aws_db_instance.main.username}:${var.db_password}@${aws_db_instance.main.endpoint}/appdb"
  sensitive = true
}
```

After `terraform apply`:
```
Outputs:

instance_public_ip = "54.123.45.67"
```

**Three real-world scenarios that need outputs:**
1. **Quickly retrieving a value after apply** — e.g., the IP to SSH into, an RDS endpoint to configure an application, without manually digging through the console.
2. **Passing data between modules** — a `network` module outputs `vpc_id`, `subnet_ids`; a `compute` module consumes them as inputs:
```hcl
module "network" {
  source = "./modules/network"
}

module "compute" {
  source    = "./modules/compute"
  vpc_id    = module.network.vpc_id
  subnet_id = module.network.subnet_ids[0]
}
```
3. **Sharing data across separate states (cross-stack)** — use the `terraform_remote_state` data source so one stack can read another stack's outputs:
```hcl
data "terraform_remote_state" "network" {
  backend = "s3"
  config = {
    bucket = "my-tfstate"
    key    = "network/terraform.tfstate"
    region = "ap-southeast-1"
  }
}

resource "aws_instance" "app" {
  subnet_id = data.terraform_remote_state.network.outputs.subnet_id
}
```

**Reading outputs for scripts/CI:**
```bash
terraform output -json > outputs.json
terraform output -raw instance_public_ip
```
Very useful when a CI/CD pipeline needs the freshly-created endpoint to run the next deployment step (e.g., pushing an image, running a smoke test).

**Note:** just like `variable`, `sensitive = true` on an output only hides it in console printouts — the real value is still stored in the state file. It is not a real security mechanism.
