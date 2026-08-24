---
id: terraform-depends-on-dependency-graph
position: devops
technology: terraform-iac
level: mid
tags: [terraform, dependency-graph, depends-on]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Terraform xác định thứ tự tạo/xóa resource như thế nào? Khi nào cần dùng `depends_on` tường minh thay vì để Terraform tự suy luận?

## Question (EN)
How does Terraform determine the order to create/destroy resources? When do you need an explicit `depends_on` instead of letting Terraform infer it?

## Đáp án chi tiết (VI)
Terraform xây dựng một **dependency graph (DAG - Directed Acyclic Graph)** dựa trên các resource block, rồi xử lý theo thứ tự tô-pô (topological order): resource nào không phụ thuộc ai được xử lý trước/song song, resource phụ thuộc xử lý sau.

**Implicit dependency (ngầm định)** — Terraform tự phát hiện qua **tham chiếu attribute**:
```hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "web" {
  vpc_id     = aws_vpc.main.id   # <-- tham chiếu → Terraform tự biết subnet phụ thuộc vpc
  cidr_block = "10.0.1.0/24"
}
```
Chỉ cần dùng `aws_vpc.main.id`, Terraform tự hiểu phải tạo VPC xong mới tạo subnet, và khi destroy thì xóa subnet trước, VPC sau.

**Explicit dependency (`depends_on`)** — dùng khi phụ thuộc **không thể hiện qua attribute reference**, ví dụ:
```hcl
resource "aws_iam_role_policy" "app_policy" {
  role   = aws_iam_role.app.id
  policy = data.aws_iam_policy_document.app.json
}

resource "aws_instance" "app" {
  # EC2 cần policy đã được attach xong trước khi instance chạy code cần quyền IAM,
  # nhưng code không tham chiếu trực tiếp attribute nào của policy
  depends_on = [aws_iam_role_policy.app_policy]

  ami           = "ami-xxxx"
  instance_type = "t3.micro"
}
```
Nếu không có `depends_on`, Terraform có thể tạo `aws_instance.app` **song song** với `aws_iam_role_policy`, dẫn đến EC2 khởi động và cố gọi API cần quyền IAM **trước khi** policy được attach xong → lỗi runtime "AccessDenied" ngẫu nhiên, rất khó debug vì trông như race condition không liên quan gì tới Terraform.

**Các trường hợp thường cần `depends_on`:**
- Phụ thuộc về **side-effect** không thể hiện qua attribute (ví dụ: một resource phải chạy xong provisioner trước, dù resource sau không dùng output nào của nó).
- Phụ thuộc giữa **module** với nhau khi module không expose output cụ thể để tham chiếu.
- Đảm bảo thứ tự với **null_resource** dùng `local-exec` để chạy script setup.

**Xem dependency graph thực tế:**
```bash
terraform graph | dot -Tpng > graph.png
```
Hữu ích khi debug tại sao Terraform lại destroy/tạo lại theo một thứ tự không ngờ tới, hoặc khi nghi ngờ có circular dependency.

**Lỗi thường gặp — circular dependency:**
```
Error: Cycle: aws_instance.a, aws_instance.b
```
Xảy ra khi A tham chiếu B và B tham chiếu ngược lại A. Terraform không thể xử lý vòng lặp phụ thuộc — cách sửa là tách nhỏ resource (ví dụ tách attachment ra resource riêng thay vì để 2 resource tham chiếu chéo nhau) hoặc dùng `aws_network_interface_sg_attachment` kiểu tách rời thay vì gán trực tiếp 2 chiều.

**Lưu ý khi dùng `depends_on` quá tay:** lạm dụng `depends_on` giữa nhiều resource không cần thiết sẽ làm **giảm khả năng song song hóa** của Terraform (nó phải chờ tuần tự dù có thể chạy song song), khiến `apply` chậm hơn hẳn trên hạ tầng lớn. Chỉ dùng khi thực sự không có cách nào biểu diễn qua attribute reference.

## Detailed Answer (EN)
Terraform builds a **dependency graph (a DAG - Directed Acyclic Graph)** from the resource blocks, then processes it in topological order: resources with no dependencies are processed first/in parallel, dependent resources are processed afterward.

**Implicit dependency** — Terraform auto-detects it via **attribute references**:
```hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "web" {
  vpc_id     = aws_vpc.main.id   # <-- reference → Terraform knows the subnet depends on the vpc
  cidr_block = "10.0.1.0/24"
}
```
Just by referencing `aws_vpc.main.id`, Terraform knows to create the VPC before the subnet, and on destroy, delete the subnet first, the VPC second.

**Explicit dependency (`depends_on`)** — used when the dependency **cannot be expressed via an attribute reference**, e.g.:
```hcl
resource "aws_iam_role_policy" "app_policy" {
  role   = aws_iam_role.app.id
  policy = data.aws_iam_policy_document.app.json
}

resource "aws_instance" "app" {
  # The EC2 instance needs the policy fully attached before it can call the AWS API
  # requiring IAM permissions, but the code doesn't reference any attribute of the policy directly
  depends_on = [aws_iam_role_policy.app_policy]

  ami           = "ami-xxxx"
  instance_type = "t3.micro"
}
```
Without `depends_on`, Terraform might create `aws_instance.app` **in parallel** with `aws_iam_role_policy`, causing the EC2 instance to boot and try calling an API requiring IAM permissions **before** the policy finishes attaching → a random runtime "AccessDenied" error that's hard to debug because it looks like an unrelated race condition.

**Common cases needing `depends_on`:**
- **Side-effect** dependencies not expressed through an attribute (e.g., a resource's provisioner must finish before another resource that uses none of its outputs).
- Dependencies between **modules** when a module doesn't expose a specific output to reference.
- Ensuring order with **`null_resource`** running a `local-exec` setup script.

**Viewing the real dependency graph:**
```bash
terraform graph | dot -Tpng > graph.png
```
Useful for debugging why Terraform destroys/creates in an unexpected order, or when suspecting a circular dependency.

**A common error — circular dependency:**
```
Error: Cycle: aws_instance.a, aws_instance.b
```
Happens when A references B and B references A back. Terraform cannot resolve a dependency loop — the fix is to split the resource up (e.g., separate an attachment into its own resource instead of two resources cross-referencing each other) or use a decoupled attachment resource (like `aws_network_interface_sg_attachment`) instead of a direct two-way link.

**Caution against overusing `depends_on`:** overusing it between resources that don't need it **reduces Terraform's ability to parallelize** (it has to wait sequentially even where it could run concurrently), noticeably slowing `apply` on large infrastructures. Use it only when there's genuinely no way to express the dependency through an attribute reference.
