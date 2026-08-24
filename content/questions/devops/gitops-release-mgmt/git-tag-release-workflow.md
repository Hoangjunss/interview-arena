---
id: git-tag-release-workflow
position: devops
technology: gitops-release-mgmt
level: junior
tags: [git, release-management, ci-cd]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Git tag được dùng như thế nào trong một release workflow điển hình? Phân biệt annotated tag và lightweight tag.

## Question (EN)
How are Git tags used in a typical release workflow? What's the difference between an annotated tag and a lightweight tag?

## Đáp án chi tiết (VI)
**Git tag** là một con trỏ (reference) cố định gắn vào một commit cụ thể, thường dùng để đánh dấu **điểm release** (ví dụ `v1.4.2`). Khác với branch, tag không di chuyển theo commit mới.

**Hai loại tag:**

| | Lightweight tag | Annotated tag |
|---|---|---|
| Lệnh tạo | `git tag v1.4.2` | `git tag -a v1.4.2 -m "Release 1.4.2"` |
| Lưu trữ | Chỉ là con trỏ tới commit | Object riêng trong Git (có tagger, ngày, message, có thể ký GPG) |
| Dùng khi | Đánh dấu tạm, local | **Release chính thức** — khuyến nghị luôn dùng cho production release |
| Ký số | Không | Có thể `git tag -s` để ký GPG, xác thực nguồn gốc release |

**Workflow release điển hình:**
```bash
# 1. Merge PR vào main sau khi review + test pass
git checkout main && git pull

# 2. Tạo annotated tag đánh dấu release
git tag -a v1.4.2 -m "Release 1.4.2: fix order race condition"
git push origin v1.4.2

# 3. CI pipeline lắng nghe tag push (trigger on tag) để build & publish image
#    ví dụ GitHub Actions:
#    on:
#      push:
#        tags: ['v*']

# 4. Image được build và push với tag tương ứng
docker build -t registry.company.vn/order-service:1.4.2 .
docker push registry.company.vn/order-service:1.4.2

# 5. Cập nhật GitOps config repo (thủ công qua PR hoặc tool tự động như Renovate/Image Updater)
#    apps/order-service/values.yaml: tag: "1.4.2"
# 6. ArgoCD/Flux phát hiện thay đổi và tự động deploy
```

**Vì sao dùng tag thay vì chỉ dùng commit SHA hoặc branch:**
- **Human-readable**: `v1.4.2` dễ hiểu hơn `a3f9c21`.
- **Immutable theo convention**: team thống nhất không bao giờ move/xoá tag đã publish, đảm bảo mọi người luôn build ra cùng một artifact khi checkout cùng tag.
- **Trigger CI/CD**: hầu hết pipeline hiện đại dùng tag push làm trigger build release chính thức (khác với build snapshot mỗi khi push vào branch).
- Kết hợp với **GitHub/GitLab Releases** để sinh changelog tự động từ commit history giữa 2 tag.

**Pitfall:**
- Xoá và tạo lại tag đã publish (`git tag -f`, `git push -f`) rất nguy hiểm vì phá vỡ tính bất biến — nếu ai đó đã build image từ tag cũ, giờ tag trỏ tới commit khác sẽ gây lệch lạc nghiêm trọng khó debug.
- Quên `git push origin v1.4.2` — tag chỉ tồn tại local, CI không bao giờ thấy tag để trigger.

## Detailed Answer (EN)
A **Git tag** is a fixed pointer to a specific commit, typically used to mark a **release point** (e.g. `v1.4.2`). Unlike a branch, a tag doesn't move as new commits land.

**Two tag types:**

| | Lightweight tag | Annotated tag |
|---|---|---|
| Create command | `git tag v1.4.2` | `git tag -a v1.4.2 -m "Release 1.4.2"` |
| Storage | Just a pointer to a commit | A dedicated Git object (tagger, date, message, GPG-signable) |
| Use case | Temporary/local marking | **Official releases** — always recommended for production releases |
| Signing | No | Can be signed with `git tag -s` to verify release provenance |

**A typical release workflow:**
```bash
# 1. Merge the PR into main after review + passing tests
git checkout main && git pull

# 2. Create an annotated tag to mark the release
git tag -a v1.4.2 -m "Release 1.4.2: fix order race condition"
git push origin v1.4.2

# 3. The CI pipeline listens for tag pushes to build & publish the image
#    e.g. GitHub Actions:
#    on:
#      push:
#        tags: ['v*']

# 4. The image is built and pushed with the corresponding tag
docker build -t registry.company.vn/order-service:1.4.2 .
docker push registry.company.vn/order-service:1.4.2

# 5. Update the GitOps config repo (manually via PR, or an automated tool like
#    Renovate/Argo CD Image Updater)
#    apps/order-service/values.yaml: tag: "1.4.2"
# 6. ArgoCD/Flux detects the change and auto-deploys
```

**Why use tags instead of just commit SHAs or branches:**
- **Human-readable**: `v1.4.2` reads better than `a3f9c21`.
- **Immutable by convention**: the team agrees never to move/delete a published tag, guaranteeing everyone gets the same artifact when checking out the same tag.
- **CI/CD trigger**: most modern pipelines use tag pushes to trigger official release builds (as opposed to snapshot builds on every branch push).
- Pairs with **GitHub/GitLab Releases** to auto-generate changelogs from the commit history between two tags.

**Pitfalls:**
- Deleting and recreating a published tag (`git tag -f`, `git push -f`) is dangerous because it breaks immutability — if someone already built an image from the old tag, now the tag points to a different commit, causing serious hard-to-debug inconsistency.
- Forgetting `git push origin v1.4.2` — the tag only exists locally, and CI never sees it to trigger the build.
