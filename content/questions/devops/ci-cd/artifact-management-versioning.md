---
id: artifact-management-versioning
position: devops
technology: ci-cd
level: mid
tags: [artifact-management, versioning, registry]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Artifact trong CI/CD là gì? Bạn quản lý versioning và lưu trữ artifact (Docker image, package) như thế nào để đảm bảo traceability và khả năng rollback?

## Question (EN)
What is an artifact in CI/CD? How do you manage artifact versioning and storage to ensure traceability and rollback capability?

## Đáp án chi tiết (VI)
**Artifact** là sản phẩm nhị phân/deploy-được sinh ra từ quá trình build: Docker image, file `.jar`/`.war`, npm package, binary, Helm chart... Artifact cần được lưu trữ ở nơi tập trung (registry) thay vì build lại mỗi lần deploy, để đảm bảo **cùng một artifact được test ở staging chính là artifact deploy lên production** (nguyên tắc "build once, deploy many").

**Chiến lược versioning phổ biến:**

| Chiến lược | Ví dụ | Ưu điểm | Nhược điểm |
|---|---|---|---|
| **Semantic Versioning (SemVer)** | `v2.4.1` | Rõ ràng ý nghĩa breaking/feature/fix | Cần kỷ luật, dễ sai nếu tự gán tay |
| **Git SHA** | `app:a1b2c3d` | Truy vết chính xác 1-1 về commit, tự động hoàn toàn | Không đọc được ý nghĩa version |
| **Build number + branch** | `app:main-142` | Dễ theo dõi theo CI run | Không mang thông tin business |
| **CalVer** | `app:2026.08.24` | Rõ thời điểm release | Không phản ánh độ lớn thay đổi |

**Thực tế nhiều team kết hợp:** tag Docker image bằng Git SHA (để trace tuyệt đối chính xác) và đồng thời gắn thêm tag SemVer/`latest`/`main` để dễ tham chiếu:

```bash
docker build -t myrepo/app:$(git rev-parse --short HEAD) .
docker tag myrepo/app:$(git rev-parse --short HEAD) myrepo/app:v2.4.1
docker tag myrepo/app:$(git rev-parse --short HEAD) myrepo/app:latest
docker push myrepo/app --all-tags
```

**Nguyên tắc quan trọng: KHÔNG BAO GIỜ move tag** kiểu `latest` hay `v2.4.1` để trỏ sang image khác — điều này phá vỡ tính bất biến (immutability), gây khó reproduce bug và rollback sai artifact. Mỗi build ra một tag duy nhất, không tái sử dụng.

**Lưu trữ (registry):**
- Docker image: Docker Hub, AWS ECR, GCP Artifact Registry, Harbor (self-host).
- Package: Nexus, JFrog Artifactory, GitHub Packages, npm registry riêng.
- Cần **retention policy** — xóa image cũ (ví dụ giữ 30 build gần nhất hoặc theo tag protected) để tránh phình dung lượng registry.

**Đảm bảo traceability:**
- Gắn metadata/label vào image: commit SHA, build time, pipeline URL (`LABEL org.opencontainers.image.revision=$GIT_SHA`).
- Lưu SBOM (Software Bill of Materials) đi kèm artifact để audit dependency.
- Ký artifact (image signing với Cosign/Notary) để đảm bảo artifact deploy đúng là artifact được build bởi CI, chống supply-chain attack.

**Rollback nhờ artifact versioning:** vì mỗi artifact có version bất biến, rollback chỉ đơn giản là deploy lại artifact version trước đó (`kubectl set image deployment/app app=myrepo/app:v2.4.0`) mà không cần build lại — nhanh và an toàn hơn nhiều so với revert code rồi build lại.

## Detailed Answer (EN)
An **artifact** is the deployable binary produced by the build process: a Docker image, a `.jar`/`.war` file, an npm package, a binary, a Helm chart... Artifacts must be stored in a central registry rather than rebuilt on every deploy, to guarantee **the exact artifact tested in staging is the one deployed to production** (the "build once, deploy many" principle).

**Common versioning strategies:**

| Strategy | Example | Pros | Cons |
|---|---|---|---|
| **Semantic Versioning (SemVer)** | `v2.4.1` | Clear meaning for breaking/feature/fix | Requires discipline, error-prone if hand-assigned |
| **Git SHA** | `app:a1b2c3d` | Exact 1:1 traceability to a commit, fully automatic | Not human-readable |
| **Build number + branch** | `app:main-142` | Easy to track by CI run | Carries no business meaning |
| **CalVer** | `app:2026.08.24` | Clear release timing | Doesn't reflect change magnitude |

**In practice, many teams combine approaches:** tag the Docker image with the Git SHA (for exact traceability) while also attaching a SemVer/`latest`/`main` tag for convenience:

```bash
docker build -t myrepo/app:$(git rev-parse --short HEAD) .
docker tag myrepo/app:$(git rev-parse --short HEAD) myrepo/app:v2.4.1
docker tag myrepo/app:$(git rev-parse --short HEAD) myrepo/app:latest
docker push myrepo/app --all-tags
```

**Critical rule: NEVER move a tag** like `latest` or `v2.4.1` to point at a different image — this breaks immutability, makes bugs hard to reproduce, and can cause rollback to the wrong artifact. Each build produces one unique tag; tags are never reused.

**Storage (registry):**
- Docker images: Docker Hub, AWS ECR, GCP Artifact Registry, Harbor (self-hosted).
- Packages: Nexus, JFrog Artifactory, GitHub Packages, a private npm registry.
- You need a **retention policy** — delete old images (e.g. keep the last 30 builds or protected tags only) to avoid registry bloat.

**Ensuring traceability:**
- Attach metadata/labels to the image: commit SHA, build time, pipeline URL (`LABEL org.opencontainers.image.revision=$GIT_SHA`).
- Store an SBOM (Software Bill of Materials) alongside the artifact for dependency auditing.
- Sign artifacts (image signing with Cosign/Notary) to guarantee the deployed artifact is exactly what CI built, preventing supply-chain attacks.

**Rollback thanks to artifact versioning:** because each artifact has an immutable version, rollback is simply redeploying a previous version (`kubectl set image deployment/app app=myrepo/app:v2.4.0`) without rebuilding — much faster and safer than reverting code and rebuilding.