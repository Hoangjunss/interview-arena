---
id: what-is-cdn-and-edge-caching
position: devops
technology: cloud-aws-gcp-azure
level: junior
tags: [cdn, caching, networking]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CDN là gì và tại sao dùng CDN lại giúp website nhanh hơn?

## Question (EN)
What is a CDN and why does using one make a website faster?

## Đáp án chi tiết (VI)
**CDN (Content Delivery Network)** là mạng lưới các **edge location** (máy chủ phân tán về mặt địa lý) lưu cache bản sao nội dung tĩnh (ảnh, CSS, JS, video) gần người dùng cuối hơn, thay vì mọi request đều phải đi tới origin server ở xa.

**Vì sao nhanh hơn:**
1. **Giảm độ trễ mạng (latency)**: người dùng ở Việt Nam lấy dữ liệu từ edge location tại Singapore/Hồ Chí Minh thay vì origin ở US.
2. **Giảm tải cho origin server**: cache hit tại edge không cần chạm tới backend, giúp origin phục vụ được nhiều traffic hơn với cùng tài nguyên.
3. **Tối ưu route mạng**: CDN provider thường có backbone network riêng, route hiệu quả hơn public internet.

**Ví dụ cấu hình CloudFront trước S3:**
```hcl
resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.assets.bucket_regional_domain_name
    origin_id   = "s3-assets"
  }
  default_cache_behavior {
    target_origin_id       = "s3-assets"
    viewer_protocol_policy = "redirect-to-https"
    cached_methods         = ["GET", "HEAD"]
    allowed_methods        = ["GET", "HEAD"]
    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
    min_ttl     = 0
    default_ttl = 86400
    max_ttl     = 31536000
  }
  enabled             = true
  default_root_object = "index.html"
}
```

**Cache header quan trọng:**
- `Cache-Control: max-age=86400` — báo CDN/browser cache trong 86400 giây.
- `Cache-Control: no-cache` hoặc `private` — không cache tại CDN (dùng cho nội dung động, cá nhân hóa).

**Gotcha:** nhầm giữa cache TTL trên CDN và trên browser — set `max-age` thấp làm mất lợi ích cache; set quá cao làm người dùng thấy nội dung cũ sau khi deploy (cần **cache invalidation** hoặc **versioned filename**, ví dụ `app.a1b2c3.js`, để tránh phải invalidate thủ công).

## Detailed Answer (EN)
A **CDN (Content Delivery Network)** is a network of geographically distributed **edge locations** that cache copies of static content (images, CSS, JS, video) closer to end users, instead of every request having to travel to a distant origin server.

**Why it's faster:**
1. **Reduced network latency**: a user in Vietnam fetches data from an edge location in Singapore/Ho Chi Minh City instead of an origin server in the US.
2. **Reduced load on origin**: a cache hit at the edge never touches the backend, letting the origin serve much more traffic with the same resources.
3. **Optimized network routing**: CDN providers typically run their own backbone network, routing more efficiently than the public internet.

**Example — CloudFront in front of S3:**
```hcl
resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.assets.bucket_regional_domain_name
    origin_id   = "s3-assets"
  }
  default_cache_behavior {
    target_origin_id       = "s3-assets"
    viewer_protocol_policy = "redirect-to-https"
    cached_methods         = ["GET", "HEAD"]
    allowed_methods        = ["GET", "HEAD"]
    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }
    min_ttl     = 0
    default_ttl = 86400
    max_ttl     = 31536000
  }
  enabled             = true
  default_root_object = "index.html"
}
```

**Key cache headers:**
- `Cache-Control: max-age=86400` — tells the CDN/browser to cache for 86400 seconds.
- `Cache-Control: no-cache` or `private` — don't cache at the CDN (for dynamic, personalized content).

**Pitfall:** confusing CDN-level TTL with browser-level TTL — too low a `max-age` loses caching benefits; too high causes users to see stale content after a deploy (requires **cache invalidation** or **versioned filenames**, e.g. `app.a1b2c3.js`, to avoid manual invalidation).
