---
id: monorepo-ci-optimization
position: devops
technology: ci-cd
level: senior
tags: [monorepo, performance, scaling]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Với một monorepo chứa hàng chục service, làm sao để pipeline CI không chạy lại toàn bộ mọi thứ trên mỗi commit? Nêu các kỹ thuật tối ưu hóa cụ thể.

## Question (EN)
In a monorepo with dozens of services, how do you keep the CI pipeline from rebuilding/retesting everything on every single commit? Describe concrete optimization techniques.

## Đáp án chi tiết (VI)
Vấn đề cốt lõi của CI trên monorepo: nếu pipeline mặc định build+test toàn bộ repo mỗi lần có commit, thời gian pipeline sẽ tăng tuyến tính theo số lượng service, dù commit chỉ đổi 1 dòng ở 1 service. Với monorepo lớn (hàng trăm package), pipeline có thể mất hàng giờ nếu không tối ưu.

**1. Affected-based execution (chỉ chạy phần bị ảnh hưởng):**

Dùng công cụ hiểu dependency graph để xác định chính xác package nào bị ảnh hưởng bởi diff hiện tại:
```bash
# Nx
nx affected --target=test --base=main

# Turborepo
turbo run test --filter=...[origin/main]

# Bazel
bazel test $(bazel query "rdeps(//..., set($(git diff --name-only origin/main)))")
```
Các công cụ này xây dependency graph giữa các package (dựa vào import/require), khi 1 file thay đổi, tự động suy ra tất cả package phụ thuộc trực tiếp/gián tiếp cần rebuild/retest — package không liên quan được **skip hoàn toàn**.

**2. Remote caching theo nội dung (content-addressable cache):**

Turborepo/Nx/Bazel đều hỗ trợ cache kết quả build/test dựa trên **hash của input** (source file + dependency + config), không phải theo thời gian. Nếu 2 lần chạy có input giống hệt nhau (kể cả trên 2 máy khác nhau), kết quả được lấy từ cache thay vì chạy lại:
```bash
turbo run build --remote-cache-timeout=60
# Nếu cache hit: "cache hit, replaying output" — build/test skip hoàn toàn, chỉ replay log
```
Đây là khác biệt lớn so với cache local trong 1 CI run — remote cache chia sẻ giữa mọi dev và mọi CI runner, nên nếu đồng nghiệp đã build cùng input trước đó, bạn không cần build lại.

**3. Sharding/parallelization ở cấp job:**

Với các package độc lập, chạy song song trên nhiều runner:
```yaml
# GitHub Actions matrix, mỗi shard build 1 tập package độc lập
strategy:
  matrix:
    shard: [1, 2, 3, 4]
steps:
  - run: turbo run test --filter=...[origin/main] --concurrency=4
```

**4. Path-based trigger filtering (kỹ thuật đơn giản nhất, không cần dependency graph tool):**
```yaml
# GitHub Actions - chỉ chạy job service-a nếu có thay đổi trong path liên quan
on:
  push:
    paths:
      - 'services/service-a/**'
      - 'libs/shared/**'
```
Hạn chế: không tự động suy ra transitive dependency — nếu `libs/shared` thay đổi mà quên khai báo path cho mọi service phụ thuộc, sẽ bỏ sót test cần chạy (false negative nguy hiểm hơn false positive).

**5. Distributed task execution (Bazel Remote Execution, Nx Cloud):**
Không chỉ cache mà còn **phân tán việc thực thi task** ra nhiều máy song song, hữu ích khi 1 CI runner không đủ mạnh để build monorepo khổng lồ trong thời gian chấp nhận được.

**So sánh trade-off:**

| Kỹ thuật | Độ chính xác | Độ phức tạp setup | Hiệu quả |
|---|---|---|---|
| Path filter thủ công | Thấp (dễ sót transitive dep) | Thấp | Trung bình |
| Dependency-graph tool (Nx/Turborepo) | Cao | Trung bình | Cao |
| Remote cache | Cao (nếu affected đã đúng) | Trung bình-cao | Rất cao |
| Bazel remote execution | Cao nhất | Cao (thường cần refactor build system) | Cao nhất nhưng đầu tư lớn |

**Pitfall thường gặp:**
- Dùng path filter tay không theo dõi transitive dependency — sửa 1 shared lib nhưng chỉ CI của lib đó chạy, các service dùng lib này không được test, bug lọt xuống production.
- Cache key không tính đến biến môi trường/config ảnh hưởng tới output (ví dụ Node version) — dẫn đến cache hit sai (stale cache dùng nhầm binary không tương thích).
- Đầu tư quá sớm vào Bazel cho một monorepo nhỏ (vài service) — chi phí học tập và migrate build system không tương xứng với lợi ích, trong khi Turborepo/Nx đơn giản hơn nhiều đã đủ dùng.

## Detailed Answer (EN)
The core problem of CI on a monorepo: if the pipeline defaults to building+testing the entire repo on every commit, pipeline time scales linearly with the number of services, even when a commit changes one line in one service. In a large monorepo (hundreds of packages), an unoptimized pipeline can take hours.

**1. Affected-based execution (only run what's impacted):**

Use a tool that understands the dependency graph to determine exactly which packages are affected by the current diff:
```bash
# Nx
nx affected --target=test --base=main

# Turborepo
turbo run test --filter=...[origin/main]

# Bazel
bazel test $(bazel query "rdeps(//..., set($(git diff --name-only origin/main)))")
```
These tools build a dependency graph between packages (based on imports/requires); when a file changes, they automatically infer every directly/transitively dependent package that needs rebuilding/retesting — unrelated packages are **skipped entirely**.

**2. Content-addressable remote caching:**

Turborepo/Nx/Bazel all support caching build/test results keyed by a **hash of the inputs** (source files + dependencies + config), not by time. If two runs have identical inputs (even across different machines), the result is pulled from cache instead of re-executed:
```bash
turbo run build --remote-cache-timeout=60
# On cache hit: "cache hit, replaying output" — build/test is fully skipped, only the log is replayed
```
This is a big difference from a local cache scoped to a single CI run — a remote cache is shared across every developer and every CI runner, so if a colleague already built the same input, you don't rebuild it.

**3. Job-level sharding/parallelization:**

For independent packages, run them in parallel across multiple runners:
```yaml
# GitHub Actions matrix, each shard builds an independent set of packages
strategy:
  matrix:
    shard: [1, 2, 3, 4]
steps:
  - run: turbo run test --filter=...[origin/main] --concurrency=4
```

**4. Path-based trigger filtering (the simplest technique, no dependency-graph tool needed):**
```yaml
# GitHub Actions - only run the service-a job if related paths changed
on:
  push:
    paths:
      - 'services/service-a/**'
      - 'libs/shared/**'
```
Limitation: it doesn't automatically infer transitive dependencies — if `libs/shared` changes and you forget to list it under every dependent service's paths, you'll miss required tests (a dangerous false negative, worse than a false positive).

**5. Distributed task execution (Bazel Remote Execution, Nx Cloud):**
Not just caching but actually **distributing task execution** across multiple machines in parallel — useful when a single CI runner isn't powerful enough to build a giant monorepo within acceptable time.

**Trade-off comparison:**

| Technique | Accuracy | Setup complexity | Effectiveness |
|---|---|---|---|
| Manual path filters | Low (easy to miss transitive deps) | Low | Medium |
| Dependency-graph tool (Nx/Turborepo) | High | Medium | High |
| Remote cache | High (if affected-detection is correct) | Medium-high | Very high |
| Bazel remote execution | Highest | High (often requires build-system refactor) | Highest, but a big investment |

**Common pitfalls:**
- Using manual path filters without tracking transitive dependencies — changing a shared lib only triggers CI for that lib, while services consuming it never get tested, letting a bug slip into production.
- A cache key that doesn't account for environment variables/config affecting the output (e.g. Node version) — leading to incorrect cache hits (a stale cache serving an incompatible binary).
- Investing too early in Bazel for a small monorepo (a handful of services) — the learning curve and build-system migration cost outweigh the benefit, when a simpler Turborepo/Nx setup would have sufficed.