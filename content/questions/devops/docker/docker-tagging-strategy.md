---
id: docker-tagging-strategy
position: devops
technology: docker
level: junior
tags: [docker, registry]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao không nên dùng tag `latest` cho môi trường production? Nên đặt chiến lược tag image như thế nào?

## Question (EN)
Why shouldn't you use the `latest` tag in production? What tagging strategy should you use instead?

## Đáp án chi tiết (VI)
`latest` chỉ là một **tag bình thường**, không có ý nghĩa đặc biệt về mặt kỹ thuật — nó chỉ là tag mặc định được gán khi `docker build`/`docker push` không chỉ định tag nào khác. Vấn đề khi dùng `latest` trong production:

1. **Không xác định (non-deterministic) và không reproducible** — `myapp:latest` hôm nay có thể khác hoàn toàn `myapp:latest` hôm qua. Không thể biết chính xác image nào đang chạy chỉ từ tên tag.
2. **Khó rollback** — khi có sự cố, không biết "latest" trước đó là version nào để quay lại, trừ khi lưu lại digest SHA256 riêng.
3. **Kubernetes mặc định `imagePullPolicy: Always` cho tag `latest`** — mỗi lần pod restart có thể kéo về một image khác (nếu registry đã bị push đè), gây ra hiện tượng "works on node A, broken on node B" vì mỗi node pull image tại thời điểm khác nhau.
4. **Cache layer bị vô hiệu hóa** trong nhiều pipeline CI/CD nếu dựa vào tag để quyết định pull hay dùng cache.

**Chiến lược tag nên dùng:**

| Chiến lược | Ví dụ | Khi dùng |
|---|---|---|
| **Semantic versioning** | `myapp:1.4.2` | Release chính thức, phù hợp SemVer (major.minor.patch) |
| **Git SHA** | `myapp:a1b2c3d` | CI/CD build tự động, truy vết chính xác commit nào tạo ra image |
| **Git SHA + môi trường** | `myapp:staging-a1b2c3d` | Phân biệt image build cho môi trường nào |
| **Digest (immutable)** | `myapp@sha256:abcd1234...` | Deploy production cần tuyệt đối chắc chắn không đổi nội dung, kể cả khi tag bị push đè |
| **Ngày/build number** | `myapp:2026-08-24-build42` | Khi cần thứ tự thời gian rõ ràng, dễ đọc |

Ví dụ pipeline thực tế:
```bash
GIT_SHA=$(git rev-parse --short HEAD)
docker build -t myregistry/myapp:${GIT_SHA} -t myregistry/myapp:1.4.2 .
docker push myregistry/myapp:${GIT_SHA}
docker push myregistry/myapp:1.4.2
# KHÔNG push kèm :latest cho production; chỉ dùng cho local dev nếu cần
```

Trong Kubernetes deployment, luôn pin tag cụ thể (hoặc digest) và set `imagePullPolicy: IfNotPresent` (khi tag immutable) để tránh pull lại không cần thiết:
```yaml
image: myregistry/myapp:1.4.2
imagePullPolicy: IfNotPresent
```

**Edge case:** `latest` vẫn hữu ích cho **local development** hoặc base image công cộng ổn định (`node:latest` để luôn lấy bản mới nhất khi dev) — vấn đề chỉ nằm ở chỗ dùng nó cho **image tự build và deploy production**, nơi cần khả năng truy vết và rollback chính xác.

## Detailed Answer (EN)
`latest` is just a **regular tag**, with no special technical meaning — it's simply the default tag assigned when `docker build`/`docker push` doesn't specify one. Problems with using `latest` in production:

1. **Non-deterministic, not reproducible** — `myapp:latest` today can be completely different from `myapp:latest` yesterday. You can't know exactly which image is running just from the tag name.
2. **Hard to roll back** — during an incident, you don't know what the previous "latest" actually was unless you separately recorded its SHA256 digest.
3. **Kubernetes defaults `imagePullPolicy: Always` for the `latest` tag** — every pod restart can pull a different image (if the registry tag was re-pushed), causing "works on node A, broken on node B" because each node pulled the image at a different point in time.
4. **CI/CD cache is invalidated** in many pipelines that rely on tags to decide whether to pull or reuse cache.

**Recommended tagging strategy:**

| Strategy | Example | When to use |
|---|---|---|
| **Semantic versioning** | `myapp:1.4.2` | Official releases, following SemVer (major.minor.patch) |
| **Git SHA** | `myapp:a1b2c3d` | Automated CI/CD builds, precise traceability to the commit |
| **Git SHA + environment** | `myapp:staging-a1b2c3d` | Distinguishing which environment an image was built for |
| **Digest (immutable)** | `myapp@sha256:abcd1234...` | Production deploys needing absolute certainty content hasn't changed, even if the tag gets re-pushed |
| **Date/build number** | `myapp:2026-08-24-build42` | When clear chronological ordering and readability matter |

Real pipeline example:
```bash
GIT_SHA=$(git rev-parse --short HEAD)
docker build -t myregistry/myapp:${GIT_SHA} -t myregistry/myapp:1.4.2 .
docker push myregistry/myapp:${GIT_SHA}
docker push myregistry/myapp:1.4.2
# do NOT also push :latest for production; keep it for local dev only if needed
```

In a Kubernetes deployment, always pin a specific tag (or digest) and set `imagePullPolicy: IfNotPresent` (when the tag is immutable) to avoid unnecessary re-pulls:
```yaml
image: myregistry/myapp:1.4.2
imagePullPolicy: IfNotPresent
```

**Edge case:** `latest` is still fine for **local development** or a stable public base image (`node:latest` to always get the newest version while developing) — the problem is specifically using it for **self-built images deployed to production**, where you need precise traceability and rollback.
