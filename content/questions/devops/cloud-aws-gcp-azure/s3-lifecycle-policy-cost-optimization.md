---
id: s3-lifecycle-policy-cost-optimization
position: devops
technology: cloud-aws-gcp-azure
level: mid
tags: [s3, cost, storage]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế một S3 Lifecycle policy để tối ưu chi phí cho bucket lưu log ứng dụng. Cần cân nhắc những gì?

## Question (EN)
Design an S3 Lifecycle policy to optimize cost for an application-logs bucket. What do you need to consider?

## Đáp án chi tiết (VI)
**Bài toán:** bucket lưu log ứng dụng, mỗi ngày ghi vài GB, log 30 ngày gần nhất hay được truy vấn để debug, log cũ hơn hiếm khi đọc nhưng cần giữ để audit/compliance.

**Thiết kế lifecycle:**
1. **0-30 ngày**: giữ ở **S3 Standard** — cần truy vấn nhanh cho debug.
2. **30-90 ngày**: chuyển **S3 Standard-IA** — ít truy cập nhưng vẫn cần đọc nhanh khi có sự cố cần điều tra.
3. **90-365 ngày**: chuyển **S3 Glacier Flexible Retrieval** — gần như không đọc, chấp nhận chờ vài giờ nếu cần.
4. **>365 ngày (nếu bắt buộc lưu compliance)**: chuyển **Glacier Deep Archive**.
5. **Sau X năm theo quy định pháp lý**: **expiration** (xóa hẳn).

**Terraform:**
```hcl
resource "aws_s3_bucket_lifecycle_configuration" "app_logs" {
  bucket = aws_s3_bucket.app_logs.id

  rule {
    id     = "logs-tiering"
    status = "Enabled"
    filter { prefix = "logs/" }

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    transition {
      days          = 90
      storage_class = "GLACIER"
    }
    transition {
      days          = 365
      storage_class = "DEEP_ARCHIVE"
    }
    expiration {
      days = 2555 # 7 năm theo yêu cầu compliance
    }

    # Xoá multipart upload dang dở để tránh rác chi phí
    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }

    noncurrent_version_expiration {
      noncurrent_days = 30
    }
  }
}
```

**Những điểm cần cân nhắc kỹ:**
- **Minimum storage duration charge**: Standard-IA (30 ngày), Glacier (90 ngày), Deep Archive (180 ngày) — nếu object bị xóa/transition sớm hơn vẫn bị tính đủ phí tối thiểu, nên tính toán transition day hợp lý, không nên transition quá sớm với dữ liệu nhỏ.
- **Số lượng object nhỏ (nhiều file log nhỏ)**: mỗi lần transition tính phí request (`PUT`/lifecycle transition request) theo số lượng object — hàng triệu log file nhỏ transition có thể tốn phí request đáng kể hơn cả phí lưu trữ tiết kiệm được. Giải pháp: gộp log nhỏ lại (ví dụ dùng Fluent Bit/Kinesis Firehose batch trước khi ghi S3) trước khi áp lifecycle.
- **Incomplete multipart upload**: upload lớn bị fail giữa chừng vẫn tính phí storage cho phần đã upload — cần rule `abort_incomplete_multipart_upload`.
- **Versioning bật**: nếu bucket bật versioning, cần thêm rule cho **noncurrent version** để tránh phí lưu trữ chồng chất từ các version cũ không dùng.

**Gotcha:** transition rule chỉ áp dụng cho object **được tạo sau khi rule có hiệu lực** theo mặc định trong một số trường hợp filter phức tạp — luôn test lifecycle rule trên 1 prefix nhỏ trước khi áp dụng toàn bucket production.

## Detailed Answer (EN)
**Scenario:** an application-logs bucket writes a few GB per day; logs from the last 30 days are frequently queried for debugging; older logs are rarely read but must be retained for audit/compliance.

**Lifecycle design:**
1. **0-30 days**: keep on **S3 Standard** — needs fast querying for debugging.
2. **30-90 days**: transition to **S3 Standard-IA** — infrequently accessed but still needs fast reads during incident investigation.
3. **90-365 days**: transition to **S3 Glacier Flexible Retrieval** — almost never read, a few hours' retrieval delay is acceptable.
4. **>365 days (if legally required)**: transition to **Glacier Deep Archive**.
5. **After X years per regulatory requirement**: **expire** (permanently delete).

**Terraform:**
```hcl
resource "aws_s3_bucket_lifecycle_configuration" "app_logs" {
  bucket = aws_s3_bucket.app_logs.id

  rule {
    id     = "logs-tiering"
    status = "Enabled"
    filter { prefix = "logs/" }

    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    transition {
      days          = 90
      storage_class = "GLACIER"
    }
    transition {
      days          = 365
      storage_class = "DEEP_ARCHIVE"
    }
    expiration {
      days = 2555 # 7 years for compliance
    }

    # Clean up abandoned multipart uploads to avoid wasted cost
    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }

    noncurrent_version_expiration {
      noncurrent_days = 30
    }
  }
}
```

**Key considerations:**
- **Minimum storage duration charges**: Standard-IA (30 days), Glacier (90 days), Deep Archive (180 days) — deleting or transitioning earlier still bills the full minimum period, so pick transition days carefully; don't transition small, short-lived data too early.
- **Many small objects (lots of small log files)**: each transition incurs a per-object request charge — millions of small log files transitioning can cost more in requests than the storage savings gained. Solution: batch small logs together (e.g. via Fluent Bit/Kinesis Firehose) before writing to S3, then apply the lifecycle.
- **Incomplete multipart uploads**: a large upload that fails partway still bills storage for the uploaded parts — always add an `abort_incomplete_multipart_upload` rule.
- **Versioning enabled**: if the bucket has versioning on, add a rule for **noncurrent versions** to avoid accumulating storage cost from unused old versions.

**Pitfall:** transition rules only apply cleanly under certain filter setups to objects created **after the rule takes effect** in some edge cases — always test a lifecycle rule against a small prefix before applying it to the whole production bucket.
