---
id: goi-service-trong-cluster-bi-503-connection-refused-pod-van-running-debug-theo-t
position: backend
technology: troubleshooting
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gọi Service trong cluster bị 503 / connection refused, Pod vẫn Running — debug theo trình tự nào?

## Question (EN)
An in-cluster Service call returns 503 / connection refused while Pods are Running — what is your debug order?

## Đáp án chi tiết (VI)
Đi từ **Service về phía Pod**, mỗi bước loại trừ một tầng.\
\
**1. Service có Endpoints không?**\
\
```bash\
kubectl get endpoints api\
```\
\
Rỗng là manh mối rõ nhất: hoặc **selector không khớp label của Pod**, hoặc Pod **chưa READY** (readiness fail thì bị loại khỏi Endpoints). Đối chiếu `spec.selector` của Service với `kubectl get pods --show-labels`.\
\
**2. `targetPort` có đúng port app đang listen không?** Service `port` là port bên ngoài, `targetPort` mới là port trong container. Đặt nhầm thì Endpoints vẫn có nhưng connection refused.\
\
**3. App có bind `0.0.0.0` không?** Bind vào `127.0.0.1` thì chỉ chính container gọi được, ngoài vào là refused. Lỗi này rất hay gặp.\
\
**4. Thử từ trong cluster để loại trừ DNS/NetworkPolicy:**\
\
```bash\
kubectl run tmp --rm -it --image=busybox --restart=Never -- sh\
# wget -qO- http://api.default.svc.cluster.local:80/health\
```\
\
Gọi thẳng **Pod IP** được mà gọi Service không được → vấn đề ở Service/kube-proxy. Cả hai đều không được → vấn đề ở app hoặc NetworkPolicy đang chặn.

## Detailed Answer (EN)
$89
