---
id: build-caching-strategies
position: devops
technology: ci-cd
level: mid
tags: [performance, caching, docker]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có những chiến lược caching nào để tăng tốc CI pipeline? Nêu ví dụ với dependency cache và Docker layer cache.

## Question (EN)
What caching strategies exist to speed up a CI pipeline? Give examples for dependency caching and Docker layer caching.

## Đáp án chi tiết (VI)
Cache là kỹ thuật quan trọng nhất để giảm thời gian pipeline vì phần lớn thời gian CI thường tiêu tốn vào việc tải lại dependency và rebuild từ đầu mỗi lần.

**1. Dependency caching (npm/Maven/pip/Go modules):**

```yaml
# GitHub Actions - cache node_modules theo hash của package-lock.json
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      npm-
```

Nguyên tắc: **cache key phải phản ánh nội dung** (hash file lock), không nên dùng key cố định — nếu không sẽ cache stale dependency cũ khi lock file đã thay đổi. `restore-keys` cho phép fallback về cache gần nhất nếu không tìm thấy exact match, tốt hơn build lại từ đầu (partial cache hit vẫn nhanh hơn cache miss hoàn toàn).

**2. Docker layer caching:**

```dockerfile
# Sắp xếp Dockerfile để tận dụng cache: COPY file ít đổi trước
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY . .
RUN npm run build
```

Nếu copy toàn bộ source code (`COPY . .`) trước khi `npm ci`, mỗi lần code thay đổi (dù chỉ 1 dòng) sẽ invalidate cache và phải cài lại dependency từ đầu — rất lãng phí. Đặt các bước ít thay đổi (install dependency) lên trước các bước hay thay đổi (copy source).

Với BuildKit, dùng cache mount để cache riêng thư mục package manager kể cả khi layer bị invalidate:

```dockerfile
RUN --mount=type=cache,target=/root/.npm npm ci
```

Trong CI, dùng `docker buildx build --cache-from=type=registry,ref=myrepo/app:buildcache --cache-to=type=registry,ref=myrepo/app:buildcache,mode=max` để lưu cache lên registry, tái sử dụng giữa các runner ephemeral (mỗi lần chạy CI là máy mới, không có local cache).

**3. Cache ở cấp pipeline framework:**
- GitLab CI: `cache:` key theo branch hoặc theo file hash, hỗ trợ `cache:policy: pull-push`.
- GitHub Actions: `actions/cache` với giới hạn 10GB/repo, cache tồn tại 7 ngày nếu không được truy cập.

**Pitfall thường gặp:**
- Cache quá "rộng" (cache cả `node_modules` thay vì chỉ cache download dir của npm) khiến cache lớn, chậm restore, và có thể chứa binary không tương thích giữa các OS/arch của runner.
- Không invalidate cache đúng lúc — sửa lock file nhưng cache key không đổi dẫn tới build với dependency cũ (bug khó debug).
- Cache secrets vô tình (ví dụ `.env` bị cache) — cần `.gitignore`/loại trừ rõ ràng trong path cache.

## Detailed Answer (EN)
Caching is the single most impactful technique to reduce pipeline time, since most CI time is typically spent re-downloading dependencies and rebuilding from scratch every run.

**1. Dependency caching (npm/Maven/pip/Go modules):**

```yaml
# GitHub Actions - cache node_modules keyed by package-lock.json hash
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: npm-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      npm-
```

Rule of thumb: **the cache key must reflect content** (hash of the lock file), never a fixed key — otherwise you'll serve stale dependencies after the lock file changes. `restore-keys` lets you fall back to the closest cache if there's no exact match, which is still faster than a full cache miss.

**2. Docker layer caching:**

```dockerfile
# Order the Dockerfile to exploit caching: COPY rarely-changing files first
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY . .
RUN npm run build
```

If you copy the whole source tree (`COPY . .`) before `npm ci`, every code change (even one line) invalidates the cache and forces a full dependency reinstall — very wasteful. Put rarely-changing steps (dependency install) before frequently-changing ones (copying source).

With BuildKit, use a cache mount to cache the package manager directory independently of layer invalidation:

```dockerfile
RUN --mount=type=cache,target=/root/.npm npm ci
```

In CI, use `docker buildx build --cache-from=type=registry,ref=myrepo/app:buildcache --cache-to=type=registry,ref=myrepo/app:buildcache,mode=max` to persist cache to a registry, reusable across ephemeral runners (each CI run is a fresh machine with no local cache).

**3. Caching at the pipeline framework level:**
- GitLab CI: `cache:` keyed by branch or file hash, supports `cache:policy: pull-push`.
- GitHub Actions: `actions/cache` with a 10GB/repo limit; cache is evicted after 7 days without access.

**Common pitfalls:**
- Caching too "broadly" (caching all of `node_modules` instead of just npm's download dir) makes the cache huge and slow to restore, and may contain binaries incompatible across runner OS/architectures.
- Not invalidating the cache correctly — the lock file changes but the cache key doesn't, so the build runs with stale dependencies (a hard-to-debug bug).
- Accidentally caching secrets (e.g. `.env` getting swept into the cache) — exclude such paths explicitly.