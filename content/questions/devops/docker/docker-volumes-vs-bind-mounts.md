---
id: docker-volumes-vs-bind-mounts
position: devops
technology: docker
level: junior
tags: [docker, storage]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
So sánh Docker volumes và bind mounts. Khi nào dùng cái nào?

## Question (EN)
Compare Docker volumes and bind mounts. When should you use each?

## Đáp án chi tiết (VI)
Cả hai đều cho phép dữ liệu **tồn tại ngoài vòng đời của container** (persist ngoài writable layer), nhưng khác nhau về nơi quản lý và cách dùng:

| | **Volume** | **Bind mount** |
|---|---|---|
| Vị trí lưu | Docker quản lý, nằm trong `/var/lib/docker/volumes/...` | Bất kỳ đường dẫn nào trên host do bạn chỉ định |
| Quản lý | Qua `docker volume create/ls/rm/inspect` | Không có lệnh quản lý riêng — chỉ là path |
| Portable | Có (không phụ thuộc cấu trúc thư mục host) | Không (phụ thuộc host có đúng path đó không) |
| Hiệu năng trên Docker Desktop (Mac/Windows) | Tốt hơn | Chậm hơn do đi qua lớp filesystem sharing (gRPC-FUSE/VirtioFS) |
| Use case điển hình | Database data, cache, dữ liệu production cần backup | Mount source code lúc dev (hot reload), mount config file/cert từ host |
| Cú pháp | `-v myvol:/data` hoặc `--mount type=volume,src=myvol,dst=/data` | `-v /host/path:/data` hoặc `--mount type=bind,src=/host/path,dst=/data` |

Ví dụ dùng volume cho database (production):
```bash
docker volume create pgdata
docker run -d --name db -v pgdata:/var/lib/postgresql/data postgres:16
```
Dữ liệu Postgres sống trong volume `pgdata`, tồn tại kể cả khi `docker rm db`, và có thể backup bằng cách mount volume đó vào container khác:
```bash
docker run --rm -v pgdata:/data -v $(pwd):/backup alpine \
  tar czf /backup/pgdata-backup.tar.gz -C /data .
```

Ví dụ dùng bind mount lúc dev (hot reload code):
```bash
docker run -d -v $(pwd)/src:/app/src -p 3000:3000 myapp:dev
```
Sửa code trên host lập tức phản ánh vào container mà không cần rebuild image.

**Điểm dễ nhầm / gotcha:**
- Bind mount **ghi đè hoàn toàn** thư mục đích trong image — nếu image có sẵn file ở `/app/src` và bạn bind mount thư mục rỗng trên host vào đó, file trong image sẽ "biến mất" (thực chất bị che khuất).
- Volume tạo lần đầu bằng cách mount vào container sẽ được **populate dữ liệu có sẵn trong image** ở đường dẫn đó (nếu volume đang rỗng) — bind mount thì không có hành vi này.
- Trên Linux, bind mount hiệu năng gần như native vì dùng chung kernel VFS; trên Docker Desktop (macOS/Windows) nó chậm hơn nhiều do phải đi qua lớp ảo hóa filesystem — đây là lý do nhiều dự án Node/PHP dev trên Mac bị "npm install siêu chậm" khi bind mount `node_modules`.
- Có loại thứ ba là **tmpfs mount** — dữ liệu chỉ nằm trong RAM, mất khi container dừng, dùng cho dữ liệu nhạy cảm tạm thời (session token) không muốn ghi ra đĩa.

## Detailed Answer (EN)
Both let data **persist beyond the container's lifecycle** (outside the writable layer), but they differ in where they're managed and how they're used:

| | **Volume** | **Bind mount** |
|---|---|---|
| Storage location | Managed by Docker, under `/var/lib/docker/volumes/...` | Any host path you specify |
| Management | Via `docker volume create/ls/rm/inspect` | No dedicated management command — just a path |
| Portable | Yes (doesn't depend on host directory structure) | No (depends on that exact path existing on the host) |
| Performance on Docker Desktop (Mac/Windows) | Better | Slower, due to the filesystem-sharing layer (gRPC-FUSE/VirtioFS) |
| Typical use case | Database data, cache, production data needing backup | Mounting source code during dev (hot reload), mounting config/certs from host |
| Syntax | `-v myvol:/data` or `--mount type=volume,src=myvol,dst=/data` | `-v /host/path:/data` or `--mount type=bind,src=/host/path,dst=/data` |

Example using a volume for a database (production):
```bash
docker volume create pgdata
docker run -d --name db -v pgdata:/var/lib/postgresql/data postgres:16
```
Postgres data lives in the `pgdata` volume, survives even `docker rm db`, and can be backed up by mounting that volume into another container:
```bash
docker run --rm -v pgdata:/data -v $(pwd):/backup alpine \
  tar czf /backup/pgdata-backup.tar.gz -C /data .
```

Example using a bind mount during dev (hot reload):
```bash
docker run -d -v $(pwd)/src:/app/src -p 3000:3000 myapp:dev
```
Editing code on the host is instantly reflected inside the container without rebuilding the image.

**Common gotchas:**
- A bind mount **completely overrides** the target directory in the image — if the image already has files at `/app/src` and you bind-mount an empty host directory there, the image's files appear to "disappear" (they're actually just shadowed).
- The **first time** a named volume is mounted into a container, it gets **populated with the image's existing content** at that path (if the volume was empty) — bind mounts don't have this behavior.
- On Linux, bind mounts perform nearly natively since they share the kernel's VFS; on Docker Desktop (macOS/Windows) they're much slower because they go through a virtualized filesystem layer — this is why many Node/PHP dev setups on Mac see "npm install is super slow" when bind-mounting `node_modules`.
- There's a third type, **tmpfs mount** — data lives only in RAM and is lost when the container stops, used for sensitive temporary data (session tokens) you don't want written to disk.
