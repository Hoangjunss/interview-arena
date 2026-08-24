---
id: s3-storage-classes-overview
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [s3, storage, cost]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Amazon S3 có những storage class nào? Sự khác biệt chính giữa chúng là gì?

## Question (EN)
What storage classes does Amazon S3 offer? What are the key differences between them?

## Đáp án chi tiết (VI)
S3 cung cấp nhiều storage class khác nhau, đánh đổi giữa **chi phí lưu trữ**, **độ trễ truy xuất**, và **tần suất truy cập kỳ vọng**:

| Storage Class | Dùng cho | Độ trễ truy xuất | Chi phí lưu trữ | Ghi chú |
|---|---|---|---|---|
| **S3 Standard** | Dữ liệu truy cập thường xuyên | Mili-giây | Cao nhất trong nhóm "hot" | Mặc định, độ bền 99.999999999% (11 số 9) |
| **S3 Intelligent-Tiering** | Pattern truy cập không rõ/thay đổi | Mili-giây | Tự động tối ưu | Tự chuyển tier dựa trên access pattern, phí giám sát nhỏ/object |
| **S3 Standard-IA** (Infrequent Access) | Truy cập ít nhưng cần nhanh khi cần | Mili-giây | Thấp hơn Standard ~40% | Phí phụ thu khi retrieve, tối thiểu lưu 30 ngày |
| **S3 One Zone-IA** | Dữ liệu ít quan trọng, có thể tái tạo | Mili-giây | Thấp hơn Standard-IA | Chỉ lưu 1 AZ — rủi ro nếu AZ đó down |
| **S3 Glacier Instant Retrieval** | Archive nhưng thỉnh thoảng cần đọc ngay | Mili-giây | Rất thấp | Tối thiểu lưu 90 ngày |
| **S3 Glacier Flexible Retrieval** | Archive, không cần đọc ngay | Phút - giờ | Thấp hơn nữa | Retrieval có 3 tier tốc độ (Expedited/Standard/Bulk) |
| **S3 Glacier Deep Archive** | Lưu trữ dài hạn, hiếm khi đọc (compliance) | 12 giờ | Thấp nhất | Tối thiểu lưu 180 ngày |

**Ví dụ thực tế:** ảnh sản phẩm e-commerce mới upload nên để **Standard** (truy cập nhiều); sau 30 ngày ít người xem chuyển **Standard-IA**; log backup cho compliance 7 năm dùng **Glacier Deep Archive**.

**Lifecycle rule minh họa (Terraform):**
```hcl
resource "aws_s3_bucket_lifecycle_configuration" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    id     = "archive-old-logs"
    status = "Enabled"
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    transition {
      days          = 90
      storage_class = "GLACIER"
    }
    expiration {
      days = 2555 # 7 năm
    }
  }
}
```

**Gotcha:** chuyển tier hay xóa object trước khi hết **minimum storage duration** (30/90/180 ngày tùy class) vẫn bị tính phí như thể lưu đủ thời gian tối thiểu — nên với dữ liệu thay đổi nhanh, chuyển sang IA/Glacier có thể tốn hơn là để Standard.

## Detailed Answer (EN)
S3 offers multiple storage classes trading off **storage cost**, **retrieval latency**, and **expected access frequency**:

| Storage Class | Best for | Retrieval latency | Storage cost | Notes |
|---|---|---|---|---|
| **S3 Standard** | Frequently accessed data | Milliseconds | Highest among "hot" tiers | Default, 99.999999999% (11 nines) durability |
| **S3 Intelligent-Tiering** | Unknown/changing access patterns | Milliseconds | Auto-optimized | Automatically moves objects between tiers, small monitoring fee per object |
| **S3 Standard-IA** | Infrequent access, but needs to be fast when accessed | Milliseconds | ~40% lower than Standard | Retrieval fee applies, 30-day minimum storage |
| **S3 One Zone-IA** | Less critical, reproducible data | Milliseconds | Lower than Standard-IA | Stored in only 1 AZ — risk if that AZ goes down |
| **S3 Glacier Instant Retrieval** | Archive but occasionally needs instant read | Milliseconds | Very low | 90-day minimum storage |
| **S3 Glacier Flexible Retrieval** | Archive, no need for instant read | Minutes-hours | Even lower | 3 retrieval speed tiers (Expedited/Standard/Bulk) |
| **S3 Glacier Deep Archive** | Long-term, rarely-read storage (compliance) | 12 hours | Lowest | 180-day minimum storage |

**Real example:** a newly-uploaded e-commerce product image should stay on **Standard** (accessed often); after 30 days with fewer views, move it to **Standard-IA**; compliance backup logs kept for 7 years go to **Glacier Deep Archive**.

**Example lifecycle rule (Terraform):**
```hcl
resource "aws_s3_bucket_lifecycle_configuration" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    id     = "archive-old-logs"
    status = "Enabled"
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
    transition {
      days          = 90
      storage_class = "GLACIER"
    }
    expiration {
      days = 2555 # 7 years
    }
  }
}
```

**Pitfall:** transitioning or deleting an object before its **minimum storage duration** (30/90/180 days depending on class) still bills as if it had been stored the full minimum period — so for rapidly-changing data, moving to IA/Glacier can actually cost more than leaving it on Standard.
