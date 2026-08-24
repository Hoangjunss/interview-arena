---
id: terraform-state-file-purpose
position: devops
technology: terraform-iac
level: junior
tags: [terraform, state, fundamentals]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
File `terraform.tfstate` dùng để làm gì? Điều gì xảy ra nếu file này bị mất hoặc bị sửa tay?

## Question (EN)
What is the `terraform.tfstate` file for? What happens if it is lost or manually edited?

## Đáp án chi tiết (VI)
**State file** (`terraform.tfstate`) là file JSON mà Terraform dùng để **ánh xạ** giữa resource block trong code (`.tf`) và resource thật đang tồn tại trên cloud provider (ví dụ `aws_instance.web` ↔ `i-0abc123def456`).

**Vai trò chính:**
- **Mapping**: Ghi nhớ resource nào trong code tương ứng với ID thật nào trên hạ tầng.
- **Metadata & performance**: Lưu cả các thuộc tính (attributes) hiện tại của resource để `terraform plan` không cần gọi API refresh toàn bộ mọi lần (dù mặc định vẫn refresh, nhưng state giúp biết resource nào cần check).
- **Dependency tracking**: Lưu thông tin phụ thuộc giữa các resource để biết thứ tự destroy/update.

**Ví dụ trích đoạn state file:**
```json
{
  "resources": [
    {
      "type": "aws_instance",
      "name": "web",
      "instances": [
        {
          "attributes": {
            "id": "i-0abc123def456",
            "instance_type": "t3.micro",
            "private_ip": "10.0.1.15"
          }
        }
      ]
    }
  ]
}
```

**Nếu mất state file:**
- Terraform **không còn biết** resource nào đã tồn tại → lần `apply` tiếp theo có thể cố **tạo lại toàn bộ** hạ tầng (trùng tên sẽ lỗi, hoặc tệ hơn là tạo trùng gây tốn chi phí/conflict).
- Cách khắc phục: `terraform import` từng resource lại vào state mới (tốn công, dễ sai sót), hoặc nếu dùng backend có versioning (S3 + versioning bật) thì restore version cũ.

**Nếu sửa tay state file:**
- Sai định dạng JSON hoặc sai ID → Terraform sẽ báo lỗi hoặc tệ hơn, hiểu nhầm là resource đã bị xóa và **đòi tạo lại** (drift giả), có thể gây downtime.
- Nên dùng lệnh chính thức thay vì sửa tay: `terraform state mv`, `terraform state rm`, `terraform state show`, `terraform state pull/push`.

**Vì sao KHÔNG được commit state file vào Git ở local backend:**
- State thường chứa **dữ liệu nhạy cảm** (password DB, private key được tạo ra, connection string) dưới dạng plaintext trong attributes.
- Không hỗ trợ làm việc nhóm (2 người apply cùng lúc sẽ ghi đè state của nhau, không có locking).
→ Đây chính là lý do cần **remote backend** (S3, Terraform Cloud, GCS...) thay vì để state file cục bộ.

## Detailed Answer (EN)
The **state file** (`terraform.tfstate`) is a JSON file Terraform uses to **map** resource blocks in your code (`.tf`) to the real resources that exist on the cloud provider (e.g., `aws_instance.web` ↔ `i-0abc123def456`).

**Main roles:**
- **Mapping**: Remembers which code resource corresponds to which real infrastructure ID.
- **Metadata & performance**: Stores current resource attributes so operations don't have to rediscover everything from scratch (Terraform still refreshes by default, but the state tells it what to check).
- **Dependency tracking**: Stores dependency relationships between resources so it knows the correct destroy/update order.

**Example state file excerpt:**
```json
{
  "resources": [
    {
      "type": "aws_instance",
      "name": "web",
      "instances": [
        {
          "attributes": {
            "id": "i-0abc123def456",
            "instance_type": "t3.micro",
            "private_ip": "10.0.1.15"
          }
        }
      ]
    }
  ]
}
```

**If the state file is lost:**
- Terraform **no longer knows** what already exists, so the next `apply` may try to **recreate everything** (naming collisions will error out, or worse, duplicate resources get created, wasting cost or causing conflicts).
- Fix: `terraform import` each resource back into a fresh state (tedious and error-prone), or restore a prior version if the backend has versioning enabled (e.g., S3 with versioning).

**If the state file is manually edited:**
- A malformed JSON or wrong ID can make Terraform error out, or worse, think a resource was deleted and **try to recreate it** (a false drift), potentially causing downtime.
- Use the official commands instead of hand-editing: `terraform state mv`, `terraform state rm`, `terraform state show`, `terraform state pull/push`.

**Why you should NOT commit the state file to Git with a local backend:**
- State frequently contains **sensitive data** (DB passwords, generated private keys, connection strings) in plaintext attributes.
- It doesn't support teamwork (two people applying at once overwrite each other's state — no locking).
→ This is exactly why a **remote backend** (S3, Terraform Cloud, GCS, etc.) is needed instead of keeping the state file locally.
