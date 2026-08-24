---
id: sua-configmap-secret-thi-pod-co-tu-nhan-cau-hinh-moi-khong
position: backend
technology: configuration
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Sửa ConfigMap/Secret thì Pod có tự nhận cấu hình mới không?

## Question (EN)
If I edit a ConfigMap/Secret, do running Pods pick up the new values?

## Đáp án chi tiết (VI)
Tùy **cách gắn vào Pod**, và đây là chỗ hay hiểu nhầm.\
\
**Gắn qua `env` / `envFrom`: KHÔNG.** Biến môi trường được đưa vào lúc container start; sửa ConfigMap sau đó không ảnh hưởng process đang chạy. Phải tạo Pod mới.\
\
**Mount thành volume: CÓ, nhưng có độ trễ.** kubelet đồng bộ file theo chu kỳ (mặc định cỡ một phút, cộng thêm TTL cache), nên nội dung file sẽ đổi mà container không restart. Đổi lại, **ứng dụng phải tự đọc lại file** — nếu app chỉ đọc config lúc boot thì file mới cũng vô nghĩa.\
\
Lưu ý: volume mount với `subPath` **không** được cập nhật, và ConfigMap đánh dấu `immutable: true` cũng vậy.\
\
**Cách làm thực tế nhất** là ép rollout để Pod mới nạp cấu hình mới:\
\
```bash\
kubectl rollout restart deployment/api\
```\
\
Hoặc gắn hash của ConfigMap vào annotation của pod template — nội dung đổi thì hash đổi, Deployment coi đó là thay đổi spec và tự rolling update. Cách này giúp rollback config đi kèm rollback deployment.

## Detailed Answer (EN)
$85
