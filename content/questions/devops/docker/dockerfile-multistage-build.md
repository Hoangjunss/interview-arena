---
id: dockerfile-multistage-build
position: devops
technology: docker
level: mid
tags: [docker, dockerfile, optimization]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Multi-stage build trong Dockerfile là gì? Nó giúp giải quyết vấn đề gì so với build một stage duy nhất?

## Question (EN)
What is a multi-stage build in a Dockerfile? What problem does it solve compared to a single-stage build?

## Đáp án chi tiết (VI)
**Multi-stage build** cho phép dùng **nhiều lệnh `FROM`** trong một Dockerfile, mỗi `FROM` mở ra một "stage" riêng biệt với filesystem riêng. Stage sau có thể `COPY --from=<stage>` để lấy artifact (file binary, thư mục build output...) từ stage trước, **nhưng không kéo theo** toolchain/dependency dùng để build ra artifact đó.

**Vấn đề nó giải quyết:** nếu build và run trong cùng một stage, image cuối cùng sẽ chứa **toàn bộ toolchain build** (compiler, dev headers, package manager cache, source code, test framework...) — những thứ chỉ cần lúc build, không cần lúc chạy, nhưng vẫn làm image phình to và tăng attack surface (nhiều package = nhiều CVE tiềm ẩn).

Ví dụ single-stage (không tối ưu) cho app Go:
```dockerfile
FROM golang:1.22
WORKDIR /app
COPY . .
RUN go build -o server .
CMD ["./server"]
```
Image cuối vẫn chứa toàn bộ Go toolchain (~800MB+) dù runtime chỉ cần 1 binary tĩnh.

Ví dụ multi-stage tối ưu:
```dockerfile
# Stage 1: build
FROM golang:1.22 AS builder
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /out/server .

# Stage 2: runtime — chỉ copy binary đã build, dùng base image tối giản
FROM gcr.io/distroless/static-debian12
COPY --from=builder /out/server /server
USER nonroot:nonroot
ENTRYPOINT ["/server"]
```
Kết quả: image runtime chỉ vài MB (thay vì ~800MB), không có shell, không có compiler, không có source code — giảm mạnh attack surface.

**Các lợi ích khác của multi-stage:**
- **Tách stage test** riêng: có thể có `FROM builder AS test` chạy unit test, nếu fail thì build fail sớm, mà không ảnh hưởng tới stage runtime.
- **Build target linh hoạt** với `--target`:
```bash
docker build --target test -t myapp:test .     # chỉ build tới stage test (để chạy CI)
docker build --target runtime -t myapp:prod .  # build stage cuối cho production
```
- **Cache theo stage độc lập** — nếu chỉ sửa code app mà không đổi `go.mod`, layer `go mod download` vẫn được cache.

**Gotcha:** nếu quên đặt tên stage (`AS builder`) và dùng `COPY --from=0` bằng index, dễ gây lỗi khi thêm/xóa stage về sau làm số thứ tự bị lệch — nên luôn đặt tên stage rõ ràng.

## Detailed Answer (EN)
**Multi-stage build** lets you use **multiple `FROM` instructions** in a single Dockerfile, each opening a separate "stage" with its own filesystem. A later stage can `COPY --from=<stage>` to pull artifacts (binaries, build output directories...) from an earlier stage **without dragging along** the toolchain/dependencies used to produce that artifact.

**Problem it solves:** if you build and run in the same stage, the final image ends up containing the **entire build toolchain** (compiler, dev headers, package manager cache, source code, test frameworks...) — things only needed at build time, not runtime, yet they still bloat the image and increase attack surface (more packages = more potential CVEs).

Single-stage example (unoptimized) for a Go app:
```dockerfile
FROM golang:1.22
WORKDIR /app
COPY . .
RUN go build -o server .
CMD ["./server"]
```
The final image still contains the entire Go toolchain (~800MB+) even though runtime needs just one static binary.

Optimized multi-stage example:
```dockerfile
# Stage 1: build
FROM golang:1.22 AS builder
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /out/server .

# Stage 2: runtime — copy only the built binary, use a minimal base image
FROM gcr.io/distroless/static-debian12
COPY --from=builder /out/server /server
USER nonroot:nonroot
ENTRYPOINT ["/server"]
```
Result: a runtime image of just a few MB (instead of ~800MB), no shell, no compiler, no source code — dramatically reduced attack surface.

**Other multi-stage benefits:**
- **Separate test stage**: you can have `FROM builder AS test` that runs unit tests — if it fails, the build fails early without affecting the runtime stage.
- **Flexible build targets** with `--target`:
```bash
docker build --target test -t myapp:test .     # build only up to the test stage (for CI)
docker build --target runtime -t myapp:prod .  # build the final stage for production
```
- **Independent per-stage caching** — if you only change app code without touching `go.mod`, the `go mod download` layer stays cached.

**Gotcha:** if you forget to name a stage (`AS builder`) and use `COPY --from=0` by index, adding/removing stages later can shift the index and break the copy — always name your stages explicitly.
