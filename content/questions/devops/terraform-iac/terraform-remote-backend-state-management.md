---
id: terraform-remote-backend-state-management
position: devops
technology: terraform-iac
level: mid
tags: [terraform, state, backend, s3]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao cần dùng remote backend cho Terraform state thay vì để state file local? Trình bày cách cấu hình một remote backend phổ biến (S3 + DynamoDB) và các lựa chọn thay thế.

## Question (EN)
Why use a remote backend for Terraform state instead of keeping the state file local? Walk through configuring a common remote backend (S3 + DynamoDB) and its alternatives.

## Đáp án chi tiết (VI)
**Vấn đề của local state (`terraform.tfstate` nằm trên máy cá nhân):**
- Không chia sẻ được giữa các thành viên trong team → mỗi người có một bản state khác nhau, dễ conflict.
- Không có locking → hai người `apply` cùng lúc có thể ghi đè state của nhau, làm hỏng cả state lẫn hạ tầng thật.
- Rủi ro mất mát (laptop hỏng, xóa nhầm) và rủi ro lộ secret (state chứa plaintext attribute nhạy cảm) nếu vô tình commit lên Git.

**Remote backend** giải quyết bằng cách lưu state ở nơi tập trung, có thể truy cập chung, và (tùy backend) hỗ trợ locking + versioning + mã hóa.

**Cấu hình S3 backend (kèm DynamoDB cho locking) — kiểu truyền thống trước Terraform 1.10:**
```hcl
terraform {
  backend "s3" {
    bucket         = "my-company-tfstate"
    key            = "prod/network/terraform.tfstate"
    region         = "ap-southeast-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```
- **`bucket`**: nơi lưu state, nên bật **versioning** để có thể rollback khi state hỏng.
- **`key`**: đường dẫn logic — thường đặt theo `<env>/<component>/terraform.tfstate` để mỗi component/môi trường có state riêng (giảm blast radius).
- **`encrypt = true`**: mã hóa server-side (SSE-S3 hoặc SSE-KMS nếu cấu hình thêm).
- **`dynamodb_table`**: bảng DynamoDB dùng làm **distributed lock** — khi ai đó đang `apply`, Terraform ghi 1 item lock vào bảng này; người khác chạy `apply` cùng lúc sẽ bị chặn với lỗi `Error acquiring the state lock`.

**Lưu ý cho bản Terraform mới (>= 1.10, dùng backend S3 native locking):** AWS đã hỗ trợ locking trực tiếp trên S3 qua conditional writes, nên với phiên bản mới không bắt buộc phải có DynamoDB riêng nữa (`use_lockfile = true`), nhưng nhiều tổ chức vẫn dùng pattern DynamoDB cũ vì đã ổn định lâu năm.

**Các lựa chọn backend khác:**
| Backend | Đặc điểm |
|---|---|
| **Terraform Cloud / HCP Terraform** | Quản lý state + locking + policy (Sentinel) + UI review, không cần tự vận hành DynamoDB |
| **Azure Blob Storage** | Tương đương S3, dùng lease blob làm cơ chế lock |
| **GCS (Google Cloud Storage)** | Hỗ trợ locking built-in qua object generation |
| **Consul** | Ít phổ biến hơn, phù hợp khi đã có sẵn Consul trong hạ tầng |

**Thao tác vận hành thường gặp:**
```bash
terraform init -migrate-state   # chuyển từ local sang remote backend
terraform force-unlock <LOCK_ID>  # gỡ lock thủ công khi apply bị crash giữa chừng
terraform state pull > backup.tfstate  # backup thủ công trước thao tác nguy hiểm
```

**Gotcha:** `force-unlock` là "con dao hai lưỡi" — nếu chạy khi vẫn còn một `apply` thật đang chạy dở (chỉ là lock bị treo do lỗi mạng), sẽ dẫn đến hai tiến trình ghi state cùng lúc, làm hỏng state. Chỉ dùng khi chắc chắn không còn tiến trình nào đang thực sự chạy.

## Detailed Answer (EN)
**Problems with local state (`terraform.tfstate` on a personal machine):**
- Cannot be shared across team members → everyone ends up with a different state copy, prone to conflicts.
- No locking → two people running `apply` at the same time can overwrite each other's state, corrupting both the state and the real infrastructure.
- Risk of loss (laptop failure, accidental deletion) and risk of leaking secrets (state stores plaintext sensitive attributes) if accidentally committed to Git.

**A remote backend** solves this by storing state in a centralized, shared location, and (depending on the backend) supporting locking + versioning + encryption.

**Configuring an S3 backend (with DynamoDB for locking) — the traditional pattern pre-Terraform 1.10:**
```hcl
terraform {
  backend "s3" {
    bucket         = "my-company-tfstate"
    key            = "prod/network/terraform.tfstate"
    region         = "ap-southeast-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```
- **`bucket`**: where state is stored; enable **versioning** so you can roll back if the state gets corrupted.
- **`key`**: the logical path — usually `<env>/<component>/terraform.tfstate` so each component/environment has its own state (reducing blast radius).
- **`encrypt = true`**: server-side encryption (SSE-S3, or SSE-KMS with extra configuration).
- **`dynamodb_table`**: a DynamoDB table used as a **distributed lock** — while someone is running `apply`, Terraform writes a lock item to this table; anyone else running `apply` concurrently gets blocked with `Error acquiring the state lock`.

**Note for newer Terraform (>= 1.10, native S3 locking):** AWS now supports locking directly on S3 via conditional writes, so newer versions don't strictly require a separate DynamoDB table (`use_lockfile = true`), though many organizations still use the DynamoDB pattern since it's been stable for years.

**Other backend options:**
| Backend | Characteristics |
|---|---|
| **Terraform Cloud / HCP Terraform** | Manages state + locking + policy (Sentinel) + a review UI without self-hosting DynamoDB |
| **Azure Blob Storage** | Equivalent to S3, uses blob leases as the lock mechanism |
| **GCS (Google Cloud Storage)** | Built-in locking via object generation |
| **Consul** | Less common, fits when Consul is already part of the infrastructure |

**Common operational commands:**
```bash
terraform init -migrate-state   # migrate from local to remote backend
terraform force-unlock <LOCK_ID>  # manually release a lock after a crashed apply
terraform state pull > backup.tfstate  # manual backup before a risky operation
```

**Gotcha:** `force-unlock` is a double-edged sword — running it while an `apply` is genuinely still in progress (as opposed to a lock stuck from a network glitch) causes two processes to write state simultaneously, corrupting it. Only use it once you're certain no process is actually still running.
