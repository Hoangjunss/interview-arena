---
id: terraform-state-locking
position: devops
technology: terraform-iac
level: mid
tags: [terraform, state, locking, dynamodb]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
State locking trong Terraform là gì và giải quyết vấn đề gì? Điều gì xảy ra nếu 2 người chạy `apply` cùng lúc mà không có locking?

## Question (EN)
What is Terraform state locking and what problem does it solve? What happens if two people run `apply` at the same time without locking?

## Đáp án chi tiết (VI)
**State locking** là cơ chế đảm bảo tại một thời điểm chỉ **một tiến trình duy nhất** được phép đọc-ghi state file — tương tự như row lock trong database, ngăn race condition khi nhiều người/pipeline cùng thao tác lên cùng một state.

**Nếu KHÔNG có locking, kịch bản lỗi điển hình:**
1. Engineer A chạy `terraform apply`, Terraform đọc state hiện tại (version X), tính toán plan.
2. Cùng lúc, Engineer B cũng chạy `terraform apply` trên state y hệt, cũng đọc version X.
3. A apply xong trước, ghi state mới (version Y) lên backend.
4. B apply xong sau, **ghi đè** bằng state của mình (dựa trên version X cũ) → **thay đổi của A trong state biến mất**, dù resource thật trên cloud vẫn còn — dẫn đến state **không khớp với thực tế** (resource "orphan" mà Terraform không còn biết tới, lần sau `plan` sẽ đòi tạo lại và gây trùng lặp hoặc lỗi "already exists").

**Cách hoạt động của locking (ví dụ S3 + DynamoDB):**
```
1. terraform apply → Terraform cố ghi 1 item vào bảng DynamoDB (LockID = đường dẫn state)
2. Nếu ghi thành công → chiếm được lock → tiến hành đọc/ghi state
3. Nếu item đã tồn tại (người khác đang giữ lock) → báo lỗi ngay:

Error: Error acquiring the state lock

Lock Info:
  ID:        d3d1d9d4-xxxx
  Path:      prod/network/terraform.tfstate
  Operation: OperationTypeApply
  Who:       ci-runner@pipeline-42
  Created:   2026-08-24 09:15:00 UTC
```
4. Sau khi `apply` xong (thành công hoặc lỗi), Terraform tự xóa lock item.

**Terraform Cloud/HCP Terraform**: locking built-in ở cấp server, không cần tự cấu hình DynamoDB.

**Tình huống cần `force-unlock`:** khi tiến trình giữ lock bị crash bất thường (mất kết nối SSH, container bị kill giữa chừng) mà không kịp release lock, lần `apply` sau sẽ bị treo mãi ở "Error acquiring the state lock" dù không còn ai thực sự đang chạy. Khi đó cần:
```bash
terraform force-unlock d3d1d9d4-xxxx
```
**Rủi ro:** nếu dùng sai — force-unlock trong khi vẫn có tiến trình khác đang thực sự apply — sẽ tạo ra đúng race condition mà locking được sinh ra để ngăn chặn. Nguyên tắc an toàn: luôn xác nhận với team (Slack, log CI) rằng không còn job nào đang chạy trước khi force-unlock.

**Trong CI/CD**, locking còn giúp tránh tình huống hai pipeline (một do merge PR, một do chạy scheduled drift-check) vô tình táo bạo apply cùng lúc lên cùng một state.

## Detailed Answer (EN)
**State locking** ensures that at any given moment only **one process** may read/write the state file — similar to a row lock in a database, preventing race conditions when multiple people/pipelines operate on the same state.

**Without locking, the classic failure scenario:**
1. Engineer A runs `terraform apply`, Terraform reads the current state (version X), computes a plan.
2. At the same time, Engineer B also runs `terraform apply` against the same state, also reading version X.
3. A finishes first, writing new state (version Y) to the backend.
4. B finishes afterward and **overwrites it** with their own state (based on the stale version X) → **A's changes vanish from the state**, even though the real cloud resource still exists — the state now **doesn't match reality** (an "orphaned" resource Terraform no longer knows about; the next `plan` will try to recreate it, causing duplication or an "already exists" error).

**How locking works (S3 + DynamoDB example):**
```
1. terraform apply → Terraform tries to write an item to the DynamoDB table (LockID = state path)
2. If the write succeeds → the lock is acquired → proceed to read/write state
3. If the item already exists (someone else holds the lock) → immediate error:

Error: Error acquiring the state lock

Lock Info:
  ID:        d3d1d9d4-xxxx
  Path:      prod/network/terraform.tfstate
  Operation: OperationTypeApply
  Who:       ci-runner@pipeline-42
  Created:   2026-08-24 09:15:00 UTC
```
4. After `apply` finishes (success or failure), Terraform automatically deletes the lock item.

**Terraform Cloud/HCP Terraform**: locking is built into the server, no manual DynamoDB setup needed.

**When you need `force-unlock`:** if the process holding the lock crashes abnormally (SSH dropped, container killed mid-run) without releasing the lock, the next `apply` will hang forever on "Error acquiring the state lock" even though nothing is actually running. Then you need:
```bash
terraform force-unlock d3d1d9d4-xxxx
```
**Risk:** using it incorrectly — force-unlocking while another process is genuinely still applying — recreates exactly the race condition locking exists to prevent. Safety rule: always confirm with the team (Slack, CI logs) that no job is actually running before force-unlocking.

**In CI/CD**, locking also prevents a situation where two pipelines (one from a merged PR, another from a scheduled drift-check) boldly apply against the same state at the same time.
