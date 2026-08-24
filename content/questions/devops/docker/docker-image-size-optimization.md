---
id: docker-image-size-optimization
position: devops
technology: docker
level: mid
tags: [docker, optimization]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có những kỹ thuật nào để giảm kích thước Docker image? Vì sao image nhỏ lại quan trọng?

## Question (EN)
What techniques reduce Docker image size? Why does a smaller image matter?

## Đáp án chi tiết (VI)
**Vì sao image nhỏ quan trọng:**
- **Pull/push nhanh hơn** — quan trọng với CI/CD chạy nhiều lần/ngày và với auto-scaling (pod mới cần pull image nhanh để scale kịp tải).
- **Giảm attack surface** — ít package hơn đồng nghĩa ít CVE tiềm ẩn hơn (image scanner sẽ báo ít lỗ hổng hơn).
- **Tiết kiệm băng thông/chi phí lưu trữ registry**, đặc biệt khi có nhiều tag/version.

**Các kỹ thuật chính:**

1. **Chọn base image tối giản:**
```dockerfile
FROM node:20-alpine        # ~180MB, thay vì node:20 (~1GB) dùng Debian full
FROM gcr.io/distroless/nodejs20  # không có shell, package manager — nhỏ và an toàn hơn nữa
```
So sánh nhanh: `ubuntu` (~78MB) > `debian-slim` (~80MB) > `alpine` (~7MB) > `distroless` (vài MB) > `scratch` (0MB, chỉ dùng được với static binary).

2. **Multi-stage build** — tách toolchain build ra khỏi image runtime (xem câu hỏi riêng về multi-stage).

3. **Dọn dẹp trong cùng một `RUN` layer** (không tách riêng lệnh dọn dẹp thành layer sau, vì layer trước vẫn giữ nguyên dữ liệu đã xóa ở layer sau):
```dockerfile
# Sai: rác vẫn tồn tại trong layer trước, image không nhỏ đi
RUN apt-get update && apt-get install -y build-essential
RUN rm -rf /var/lib/apt/lists/*

# Đúng: gộp vào 1 layer, rác không bao giờ được ghi vào layer cuối
RUN apt-get update && apt-get install -y build-essential \
    && rm -rf /var/lib/apt/lists/*
```

4. **Dùng `.dockerignore`** để tránh copy file/thư mục không cần thiết (`node_modules`, `.git`, test fixtures lớn...).

5. **Chỉ cài dependency cần cho production**:
```dockerfile
RUN npm ci --only=production   # bỏ qua devDependencies
```

6. **Kết hợp squash/flatten khi cần** (ít dùng hơn multi-stage, nhưng vẫn tồn tại):
```bash
docker build --squash -t myapp:squashed .   # gộp tất cả layer thành 1 (yêu cầu experimental feature)
```
Lưu ý: squash làm mất khả năng cache theo layer cho các build sau, nên cân nhắc trade-off.

7. **Phân tích image để tìm layer nặng**:
```bash
docker history --no-trunc myapp:latest   # xem kích thước từng layer
dive myapp:latest                        # công cụ trực quan phân tích layer + tìm file rác
```

**Ví dụ thực tế trước/sau:**
```dockerfile
# Trước: ~950MB
FROM python:3.12
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```
```dockerfile
# Sau: ~120MB
FROM python:3.12-slim AS builder
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.12-slim
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "app.py"]
```

**Gotcha:** giảm size không nên đánh đổi bằng việc mất khả năng debug hoàn toàn — nếu team chưa quen thao tác với distroless/scratch (không có shell), nên cân nhắc giữ `alpine` làm điểm cân bằng giữa nhỏ gọn và dễ vận hành, hoặc chuẩn bị sẵn debug container/ephemeral container cho production.

## Detailed Answer (EN)
**Why image size matters:**
- **Faster pull/push** — important for CI/CD running many times a day and for auto-scaling (new pods need to pull the image quickly to scale in time).
- **Reduced attack surface** — fewer packages means fewer potential CVEs (scanners report fewer vulnerabilities).
- **Lower bandwidth/registry storage cost**, especially with many tags/versions.

**Main techniques:**

1. **Pick a minimal base image:**
```dockerfile
FROM node:20-alpine        # ~180MB, instead of node:20 (~1GB) on full Debian
FROM gcr.io/distroless/nodejs20  # no shell, no package manager — smaller and more secure
```
Quick comparison: `ubuntu` (~78MB) > `debian-slim` (~80MB) > `alpine` (~7MB) > `distroless` (a few MB) > `scratch` (0MB, only works with a static binary).

2. **Multi-stage builds** — separate the build toolchain from the runtime image (see the dedicated multi-stage question).

3. **Clean up within the same `RUN` layer** (never split cleanup into a later layer — earlier layers still retain data even after a later layer "deletes" it):
```dockerfile
# Wrong: garbage still exists in the earlier layer, image doesn't shrink
RUN apt-get update && apt-get install -y build-essential
RUN rm -rf /var/lib/apt/lists/*

# Right: combined into one layer, garbage never gets written to the final layer
RUN apt-get update && apt-get install -y build-essential \
    && rm -rf /var/lib/apt/lists/*
```

4. **Use `.dockerignore`** to avoid copying unnecessary files/directories (`node_modules`, `.git`, large test fixtures...).

5. **Install only production dependencies:**
```dockerfile
RUN npm ci --only=production   # skip devDependencies
```

6. **Squash/flatten when needed** (less common than multi-stage, but still available):
```bash
docker build --squash -t myapp:squashed .   # merges all layers into one (requires experimental feature)
```
Note: squashing loses per-layer caching for subsequent builds, so weigh the trade-off.

7. **Analyze the image to find heavy layers:**
```bash
docker history --no-trunc myapp:latest   # see the size of each layer
dive myapp:latest                        # visual tool for layer analysis and finding wasted files
```

**Real before/after example:**
```dockerfile
# Before: ~950MB
FROM python:3.12
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```
```dockerfile
# After: ~120MB
FROM python:3.12-slim AS builder
COPY requirements.txt .
RUN pip install --user -r requirements.txt

FROM python:3.12-slim
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "app.py"]
```

**Gotcha:** shrinking size shouldn't come at the cost of losing all debuggability — if the team isn't comfortable operating distroless/scratch images (no shell), consider `alpine` as a balance between compactness and operability, or have a debug/ephemeral container strategy ready for production.
