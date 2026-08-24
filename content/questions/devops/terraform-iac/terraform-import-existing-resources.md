---
id: terraform-import-existing-resources
position: devops
technology: terraform-iac
level: mid
tags: [terraform, import, migration]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao để đưa một resource đã tồn tại sẵn trên cloud (tạo thủ công qua console) vào quản lý bởi Terraform? Quy trình `terraform import` gồm những bước nào và có rủi ro gì?

## Question (EN)
How do you bring an existing cloud resource (created manually via console) under Terraform management? What are the steps of `terraform import` and what are the risks?

## Đáp án chi tiết (VI)
**Tình huống thường gặp:** một resource được tạo tay từ trước (do dự án cũ, do fix gấp sự cố, do đội khác tạo) và giờ muốn quản lý nó bằng Terraform mà **không muốn destroy rồi tạo lại** (vì sẽ gây downtime hoặc mất dữ liệu, ví dụ với RDS).

**Quy trình import truyền thống (2 bước, trước Terraform 1.5):**

1. **Viết trước resource block** tương ứng trong `.tf` (Terraform chỉ import vào state, không tự sinh code):
```hcl
resource "aws_s3_bucket" "existing" {
  bucket = "my-legacy-bucket"
}
```

2. **Chạy lệnh import** để nạp resource thật vào state, gắn với block vừa viết:
```bash
terraform import aws_s3_bucket.existing my-legacy-bucket
```

3. **Chạy `terraform plan`** để kiểm tra — đây là bước **quan trọng nhất**: nếu code `.tf` không khớp 100% với cấu hình thật của resource (ví dụ thiếu `versioning`, sai `tags`), Terraform sẽ đề xuất **sửa/xóa** những gì không khớp ở lần `apply` tiếp theo — rất nguy hiểm nếu áp dụng nhầm và gây thay đổi ngoài ý muốn lên resource đang chạy production.

4. Sửa code `.tf` cho tới khi `terraform plan` báo **"No changes"** — nghĩa là code đã phản ánh đúng 100% resource thật.

**Cách hiện đại hơn (Terraform >= 1.5): block `import` + `terraform plan -generate-config-out`:**
```hcl
import {
  to = aws_s3_bucket.existing
  id = "my-legacy-bucket"
}
```
```bash
terraform plan -generate-config-out=generated.tf
```
Terraform sẽ **tự sinh code `.tf`** khớp với resource thật, giảm hẳn công sức đoán/gõ tay từng attribute — sau đó vẫn nên review kỹ trước khi dùng chính thức.

**Rủi ro và lưu ý:**
- **Import không tự sinh dependency**: nếu resource phụ thuộc resource khác (ví dụ EC2 phụ thuộc security group), phải tự import cả security group và tự khai báo `depends_on`/reference đúng, nếu không state sẽ có resource "cô lập" không đúng dependency graph thật.
- **Không import hàng loạt dễ dàng** bằng CLI thuần (mỗi lệnh `import` chỉ 1 resource) — với hạ tầng lớn có hàng trăm resource cần import, nên cân nhắc công cụ hỗ trợ như `terraformer` để sinh code + import hàng loạt, rồi review kỹ lại.
- **Luôn backup state trước khi import**: `terraform state pull > backup.tfstate`, để rollback nếu import sai.
- **Không bao giờ import thẳng vào production mà chưa test trên môi trường tương tự trước** — vì bước "sửa code cho khớp" rất dễ sai sót nhỏ (đơn vị, default value) dẫn đến plan đòi thay đổi resource thật.

## Detailed Answer (EN)
**Common scenario:** a resource was created manually beforehand (legacy project, an emergency incident fix, another team's work) and you now want Terraform to manage it **without destroying and recreating it** (which would cause downtime or data loss, e.g. with an RDS instance).

**Traditional import workflow (2 steps, pre-Terraform 1.5):**

1. **Write the resource block first** in `.tf` (Terraform only imports into state, it doesn't generate code on its own):
```hcl
resource "aws_s3_bucket" "existing" {
  bucket = "my-legacy-bucket"
}
```

2. **Run the import command** to load the real resource into state, attaching it to the block you just wrote:
```bash
terraform import aws_s3_bucket.existing my-legacy-bucket
```

3. **Run `terraform plan`** to verify — this is the **most important step**: if the `.tf` code doesn't match the real resource's configuration 100% (e.g., missing `versioning`, wrong `tags`), Terraform will propose **modifying/removing** the mismatched parts on the next `apply` — very dangerous if applied by mistake, causing unintended changes to a live production resource.

4. Adjust the `.tf` code until `terraform plan` reports **"No changes"** — meaning the code now reflects the real resource 100%.

**A more modern approach (Terraform >= 1.5): the `import` block + `terraform plan -generate-config-out`:**
```hcl
import {
  to = aws_s3_bucket.existing
  id = "my-legacy-bucket"
}
```
```bash
terraform plan -generate-config-out=generated.tf
```
Terraform **auto-generates the `.tf` code** matching the real resource, greatly reducing the effort of guessing/typing each attribute by hand — you should still review it carefully before adopting it officially.

**Risks and caveats:**
- **Import doesn't auto-generate dependencies**: if the resource depends on another (e.g., an EC2 instance depending on a security group), you must import that resource too and correctly declare `depends_on`/references yourself, otherwise the state ends up with an "isolated" resource that doesn't reflect the real dependency graph.
- **Not easily done in bulk** with the plain CLI (each `import` command handles one resource) — for large infrastructures with hundreds of resources to import, consider a tool like `terraformer` to bulk-generate code and import, then review carefully afterward.
- **Always back up the state before importing**: `terraform state pull > backup.tfstate`, so you can roll back if the import goes wrong.
- **Never import directly into production without testing on a similar environment first** — the "make the code match" step is prone to small mistakes (units, default values) that make the plan try to modify the real resource.
