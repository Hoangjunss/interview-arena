---
id: cloudfront-cache-invalidation-strategy
position: devops
technology: cloud-aws-gcp-azure
level: mid
tags: [cdn, caching, deployment]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sau khi deploy phiên bản mới của frontend, người dùng vẫn thấy phiên bản cũ do CDN cache. Bạn xử lý vấn đề này như thế nào, và chiến lược nào tốt hơn việc invalidate cache thủ công mỗi lần deploy?

## Question (EN)
After deploying a new frontend version, users still see the old version because of CDN caching. How do you fix this, and what strategy is better than manually invalidating the cache on every deploy?

## Đáp án chi tiết (VI)
**Giải pháp ngắn hạn — Cache Invalidation:**
```bash
aws cloudfront create-invalidation \
  --distribution-id EDFDVBD6EXAMPLE \
  --paths "/index.html" "/static/*"
```
Vấn đề: invalidation **tính phí** sau 1000 path/tháng miễn phí, và **không tức thời hoàn toàn** (mất vài phút để lan tới toàn bộ edge location) — không phù hợp làm chiến lược chính cho mọi deploy.

**Chiến lược tốt hơn — Cache-Control theo loại file (khuyến nghị lâu dài):**

| Loại file | Chiến lược | Cache-Control header |
|---|---|---|
| HTML (entry point) | Không cache, hoặc cache rất ngắn | `no-cache` hoặc `max-age=0, must-revalidate` |
| JS/CSS **có hash trong tên file** (`app.a1b2c3.js`) | Cache vĩnh viễn | `max-age=31536000, immutable` |
| Ảnh/font tĩnh không đổi | Cache dài | `max-age=2592000` |

**Vì sao cách này tốt hơn invalidation thủ công:**
- File JS/CSS build ra có **hash content trong tên** (Webpack/Vite tự làm điều này) — mỗi lần code thay đổi, tên file thay đổi theo, nên **không bao giờ có vấn đề cache cũ** cho các file này, cache mãi mãi an toàn.
- Chỉ có `index.html` (không có hash, luôn cùng tên) cần set `no-cache` — trình duyệt/CDN luôn phải revalidate với origin, nên **không cần invalidate thủ công** vì index.html mới sẽ được lấy ngay ở request tiếp theo, và nó trỏ tới các file JS/CSS hash mới.

**Kiến trúc deploy an toàn:**
```
1. Build tạo app.<hash-mới>.js, style.<hash-mới>.css
2. Upload toàn bộ file mới lên S3 (file cũ vẫn giữ, không xóa ngay)
3. Cập nhật index.html trỏ tới hash mới, upload cuối cùng
4. index.html có Cache-Control: no-cache -> user luôn lấy bản mới ở lần load tiếp theo
5. Sau vài ngày, dọn dẹp các asset hash cũ không còn được tham chiếu
```

**Khi vẫn cần invalidation thủ công:** trường hợp khẩn cấp (phát hiện lỗi bảo mật/nội dung sai cần gỡ ngay lập tức), hoặc file không thể đổi tên (ví dụ favicon.ico, robots.txt) — với các file này nên set TTL ngắn (vài phút - vài giờ) thay vì dài hạn để giảm nhu cầu invalidate khẩn cấp.

**Gotcha:** invalidate `/*` (toàn bộ distribution) tưởng "an toàn tuyệt đối" nhưng tốn phí lớn và tạo **cache stampede** — mọi request đồng loạt miss cache, dồn về origin cùng lúc, có thể làm origin quá tải nếu traffic lớn. Nên invalidate path cụ thể, không dùng wildcard toàn bộ trừ khi thực sự cần thiết.

## Detailed Answer (EN)
**Short-term fix — Cache Invalidation:**
```bash
aws cloudfront create-invalidation \
  --distribution-id EDFDVBD6EXAMPLE \
  --paths "/index.html" "/static/*"
```
The problem: invalidation is **billed** beyond 1000 free paths/month, and is **not instantaneous** (takes a few minutes to propagate to all edge locations) — not a good primary strategy for every deploy.

**Better strategy — Cache-Control by file type (recommended long-term approach):**

| File type | Strategy | Cache-Control header |
|---|---|---|
| HTML (entry point) | No cache, or very short cache | `no-cache` or `max-age=0, must-revalidate` |
| JS/CSS **with a content hash in the filename** (`app.a1b2c3.js`) | Cache forever | `max-age=31536000, immutable` |
| Static images/fonts that never change | Long cache | `max-age=2592000` |

**Why this is better than manual invalidation:**
- Built JS/CSS files have a **content hash baked into the filename** (Webpack/Vite do this automatically) — every code change produces a new filename, so **stale caching is never an issue** for these files; caching them forever is entirely safe.
- Only `index.html` (unhashed, always the same name) needs `no-cache` — the browser/CDN always revalidates with the origin, so **no manual invalidation is needed** since the new `index.html` will be fetched on the very next request, and it points to the newly-hashed JS/CSS files.

**Safe deploy architecture:**
```
1. Build produces app.<new-hash>.js, style.<new-hash>.css
2. Upload all new files to S3 (old files kept, not deleted immediately)
3. Update index.html to point to the new hashes, upload it last
4. index.html has Cache-Control: no-cache -> users always get the new version on next load
5. After a few days, clean up old hashed assets no longer referenced
```

**When manual invalidation is still needed:** emergencies (a security issue or wrong content found that needs immediate removal), or files that can't be renamed (e.g. favicon.ico, robots.txt) — for these, set a short TTL (minutes to hours) instead of a long one to reduce the need for emergency invalidation.

**Pitfall:** invalidating `/*` (the whole distribution) seems "maximally safe" but is expensive and creates a **cache stampede** — every request simultaneously misses cache and hits the origin at once, potentially overwhelming it under high traffic. Invalidate specific paths, and avoid wildcarding the entire distribution unless truly necessary.
