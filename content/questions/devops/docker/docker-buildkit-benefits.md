---
id: docker-buildkit-benefits
position: devops
technology: docker
level: mid
tags: [docker, build, performance]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
BuildKit là gì và nó cải thiện gì so với legacy builder của Docker? Nêu vài tính năng chỉ có ở BuildKit mà bạn hay dùng.

## Question (EN)
What is BuildKit and how does it improve on Docker's legacy builder? Name a few BuildKit-only features you commonly use.

## Đáp án chi tiết (VI)
**BuildKit** là engine build image thế hệ mới của Docker (từ Docker 18.09+, và **mặc định bật từ Docker 23.0**), thay thế dần "legacy builder" cũ. Nó được thiết kế lại gần như hoàn toàn về kiến trúc build graph, mang lại cải tiến rõ rệt cả về tốc độ lẫn tính năng.

**Khác biệt cốt lõi so với legacy builder:**

| | Legacy builder | BuildKit |
|---|---|---|
| Thực thi step | Tuần tự, từng layer một | **Song song hóa** các bước không phụ thuộc nhau (ví dụ 2 stage độc lập trong multi-stage build) |
| Cache | Chỉ cache theo layer, dựa trên lịch sử build local | Cache **content-addressable**, có thể **export/import cache** qua registry, không cần build lại từ đầu trên máy khác |
| Build context | Gửi toàn bộ context lên trước khi build | Chỉ gửi phần context **thực sự cần** cho từng bước (context laziness) |
| Secret trong build | Không có cách an toàn — dễ lộ qua ARG/layer | `RUN --mount=type=secret` — secret không bao giờ ghi vào layer |
| Output | Chỉ tạo image | Có thể output ra **local filesystem, tarball, hoặc nhiều nền tảng (multi-arch)** cùng lúc |

**Bật BuildKit (nếu dùng bản Docker cũ hơn 23.0):**
```bash
export DOCKER_BUILDKIT=1
docker build -t myapp .
# hoặc dùng hẳn CLI plugin buildx (khuyến nghị)
docker buildx build -t myapp .
```

**Các tính năng chỉ BuildKit mới có, hay dùng trong thực tế:**

1. **Cache mount** — cache dependency (npm/pip/go module cache) tồn tại độc lập với layer, không bị mất khi source thay đổi:
```dockerfile
# syntax=docker/dockerfile:1
RUN --mount=type=cache,target=/root/.npm npm ci
```

2. **Secret mount** — build cần credential (private npm registry, SSH key) mà không lộ ra image:
```dockerfile
RUN --mount=type=secret,id=npm_token \
    NPM_TOKEN=$(cat /run/secrets/npm_token) npm ci
```
```bash
docker buildx build --secret id=npm_token,src=./token.txt -t myapp .
```

3. **Multi-platform build** — build đồng thời cho `linux/amd64` và `linux/arm64` (quan trọng khi vừa deploy trên server Intel vừa trên Apple Silicon/Graviton):
```bash
docker buildx build --platform linux/amd64,linux/arm64 -t myrepo/myapp:1.0 --push .
```

4. **Registry cache export/import** — chia sẻ cache build giữa các CI runner ephemeral (mỗi lần chạy là máy mới, không có local cache):
```bash
docker buildx build \
  --cache-to=type=registry,ref=myrepo/myapp:cache \
  --cache-from=type=registry,ref=myrepo/myapp:cache \
  -t myrepo/myapp:latest --push .
```

**Vì sao quan trọng trong CI/CD hiện đại:** trước BuildKit, mỗi CI job chạy trên runner mới đều build lại từ đầu (không cache), tốn thời gian; với `--cache-from`/`--cache-to` qua registry, build time có thể giảm từ vài phút xuống vài chục giây cho các thay đổi nhỏ.

**Gotcha:** cú pháp `RUN --mount=...` yêu cầu dòng đầu Dockerfile phải có `# syntax=docker/dockerfile:1` để kích hoạt cú pháp BuildKit mở rộng — thiếu dòng này, Docker có thể parse lỗi hoặc rơi về hành vi cũ tùy phiên bản.

## Detailed Answer (EN)
**BuildKit** is Docker's next-generation image build engine (available since Docker 18.09+, and **enabled by default since Docker 23.0**), gradually replacing the old "legacy builder". Its build-graph architecture was largely redesigned, bringing clear improvements in both speed and features.

**Core differences from the legacy builder:**

| | Legacy builder | BuildKit |
|---|---|---|
| Step execution | Sequential, one layer at a time | **Parallelizes** independent steps (e.g., two independent stages in a multi-stage build) |
| Cache | Layer-only cache, based on local build history | **Content-addressable** cache, can **export/import cache via a registry**, no need to rebuild from scratch on another machine |
| Build context | Sends the entire context before building | Sends only the context **actually needed** per step (context laziness) |
| Build-time secrets | No safe way — easily leaked via ARG/layers | `RUN --mount=type=secret` — secret never written to any layer |
| Output | Only produces an image | Can output to **local filesystem, a tarball, or multiple platforms (multi-arch)** at once |

**Enabling BuildKit (on Docker versions older than 23.0):**
```bash
export DOCKER_BUILDKIT=1
docker build -t myapp .
# or use the buildx CLI plugin directly (recommended)
docker buildx build -t myapp .
```

**BuildKit-only features commonly used in practice:**

1. **Cache mounts** — dependency caches (npm/pip/go module cache) persist independently of layers, surviving source changes:
```dockerfile
# syntax=docker/dockerfile:1
RUN --mount=type=cache,target=/root/.npm npm ci
```

2. **Secret mounts** — builds needing credentials (private npm registry, SSH keys) without leaking them into the image:
```dockerfile
RUN --mount=type=secret,id=npm_token \
    NPM_TOKEN=$(cat /run/secrets/npm_token) npm ci
```
```bash
docker buildx build --secret id=npm_token,src=./token.txt -t myapp .
```

3. **Multi-platform builds** — building simultaneously for `linux/amd64` and `linux/arm64` (important when deploying to both Intel servers and Apple Silicon/Graviton):
```bash
docker buildx build --platform linux/amd64,linux/arm64 -t myrepo/myapp:1.0 --push .
```

4. **Registry cache export/import** — sharing build cache across ephemeral CI runners (each run is a fresh machine with no local cache):
```bash
docker buildx build \
  --cache-to=type=registry,ref=myrepo/myapp:cache \
  --cache-from=type=registry,ref=myrepo/myapp:cache \
  -t myrepo/myapp:latest --push .
```

**Why this matters for modern CI/CD:** before BuildKit, every CI job on a fresh runner rebuilt from scratch (no cache), wasting time; with `--cache-from`/`--cache-to` via a registry, build time can drop from minutes to tens of seconds for small changes.

**Gotcha:** the `RUN --mount=...` syntax requires the first line of the Dockerfile to be `# syntax=docker/dockerfile:1` to enable BuildKit's extended syntax — without it, Docker may fail to parse the instruction or fall back to legacy behavior depending on the version.
