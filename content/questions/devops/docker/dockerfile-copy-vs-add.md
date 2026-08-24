---
id: dockerfile-copy-vs-add
position: devops
technology: docker
level: junior
tags: [docker, dockerfile]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`COPY` và `ADD` trong Dockerfile khác nhau như thế nào? Tại sao best practice khuyên dùng `COPY` thay vì `ADD`?

## Question (EN)
What's the difference between `COPY` and `ADD` in a Dockerfile? Why does best practice recommend `COPY` over `ADD`?

## Đáp án chi tiết (VI)
Cả hai đều dùng để đưa file từ build context (hoặc URL) vào image, nhưng `ADD` có thêm 2 tính năng "ma thuật":

| Tính năng | `COPY` | `ADD` |
|---|---|---|
| Copy file/thư mục local | Có | Có |
| Tự động giải nén tar (`.tar`, `.tar.gz`...) | Không | **Có** (tự extract vào đích) |
| Tải file từ URL | Không | **Có** (nhưng không xóa file tạm, không hỗ trợ auth header) |
| Tính minh bạch/dự đoán được | Cao | Thấp hơn |

**Lý do nên ưu tiên `COPY`:**
1. **Rõ ràng, tường minh (explicit)** — chỉ làm đúng một việc: copy. Đọc Dockerfile không cần đoán có auto-extract hay không.
2. **`ADD` tải URL là anti-pattern** — nếu tải file từ internet nên dùng `curl`/`wget` trong `RUN` để kiểm soát được: xóa file tạm, verify checksum, dùng multi-stage để không giữ lại tool tải file trong image cuối.
3. Auto-extract của `ADD` có thể gây bug khó lường nếu vô tình COPY một file `.tar.gz` mà không biết nó sẽ tự giải nén.

**Khi nào thực sự cần `ADD`:** trường hợp hợp lệ gần như duy nhất là cần giải nén một tarball cục bộ ngay trong lúc build:
```dockerfile
ADD app.tar.gz /usr/src/app/   # tự động giải nén vào /usr/src/app/
```

Ví dụ thực tế nên dùng COPY:
```dockerfile
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY . .
```
Lưu ý: tách `COPY package.json` riêng trước `RUN npm ci` là kỹ thuật tận dụng **layer cache** — nếu source code thay đổi nhưng `package.json` không đổi, Docker sẽ tái sử dụng layer `npm ci` đã cache thay vì cài lại toàn bộ dependency.

## Detailed Answer (EN)
Both bring files from the build context (or a URL) into the image, but `ADD` has two extra "magic" features:

| Feature | `COPY` | `ADD` |
|---|---|---|
| Copy local file/directory | Yes | Yes |
| Auto-extract tar archives (`.tar`, `.tar.gz`...) | No | **Yes** (auto-extracts into destination) |
| Download from URL | No | **Yes** (but doesn't clean up the temp file, no auth header support) |
| Predictability | High | Lower |

**Why prefer `COPY`:**
1. **Explicit and predictable** — it does exactly one thing: copy. You don't have to guess whether auto-extraction happens by reading a Dockerfile.
2. **`ADD` for URLs is an anti-pattern** — if you need to download a file, use `curl`/`wget` inside a `RUN` step so you control cleanup, checksum verification, and can use a multi-stage build to avoid keeping the download tool in the final image.
3. `ADD`'s auto-extraction can cause subtle bugs if you accidentally `COPY`-like a `.tar.gz` without realizing it will silently extract.

**When `ADD` is actually justified**: essentially the only valid case is extracting a local tarball at build time:
```dockerfile
ADD app.tar.gz /usr/src/app/   # auto-extracts into /usr/src/app/
```

Real-world example that should use COPY:
```dockerfile
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY . .
```
Note: copying `package.json` separately before `RUN npm ci` exploits **layer caching** — if the source code changes but `package.json` doesn't, Docker reuses the cached `npm ci` layer instead of reinstalling all dependencies.
