---
id: docker-named-vs-anonymous-volumes
position: devops
technology: docker
level: mid
tags: [docker, storage]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Named volume và anonymous volume trong Docker khác nhau ở điểm nào? Vấn đề gì xảy ra nếu lạm dụng anonymous volume trong production?

## Question (EN)
What's the difference between a named volume and an anonymous volume in Docker? What issues arise from overusing anonymous volumes in production?

## Đáp án chi tiết (VI)
| | **Named volume** | **Anonymous volume** |
|---|---|---|
| Cách tạo | `docker volume create myvol` hoặc khai báo tên trong `-v myvol:/path` | Tự động sinh khi chỉ khai báo path đích: `-v /path` hoặc trong Dockerfile `VOLUME /path` mà không map tên |
| Định danh | Tên dễ đọc, dễ tham chiếu lại | Hash ngẫu nhiên dài (ví dụ `a1b2c3...`), khó truy vết |
| Tái sử dụng | Dễ — chỉ cần gọi đúng tên ở container khác | Khó — phải tra `docker volume ls` để tìm đúng volume nào gắn với container nào |
| Dọn dẹp | Chủ động, có kiểm soát (`docker volume rm myvol`) | Dễ bị **rác tồn đọng (orphaned volume)** vì không ai nhớ tên để xóa |
| Use case | Data cần persist rõ ràng, share giữa nhiều container (DB data, upload storage) | Thường phát sinh ngoài ý muốn khi image có `VOLUME` trong Dockerfile mà không map tên lúc `docker run` |

Ví dụ named volume:
```bash
docker volume create pgdata
docker run -d -v pgdata:/var/lib/postgresql/data postgres:16
docker volume ls        # thấy "pgdata" rõ ràng
docker volume inspect pgdata
```

Ví dụ anonymous volume phát sinh ngoài ý muốn:
```dockerfile
# Trong image postgres chính thức có sẵn:
VOLUME /var/lib/postgresql/data
```
```bash
docker run -d postgres:16          # không map -v nào
docker volume ls
# DRIVER    VOLUME NAME
# local     a1b2c3d4e5f6...        <-- anonymous volume tự sinh vì Dockerfile khai báo VOLUME
```
Nếu sau đó `docker rm` container này (mà quên `-v` để xóa kèm volume), volume vẫn tồn tại **mồ côi (orphaned)** trên host, chiếm dung lượng, không ai còn biết nó thuộc container nào.

**Vấn đề khi lạm dụng anonymous volume trong production:**
1. **Rò rỉ dung lượng đĩa dần dần** — mỗi lần `docker run` một image có `VOLUME` trong Dockerfile mà không map tên, một anonymous volume mới được tạo; qua nhiều lần deploy/restart, số lượng volume mồ côi tăng dần, `docker system df` sẽ cho thấy dung lượng volume ngày càng lớn.
2. **Mất dữ liệu khi tưởng đang persist** — dev có thể lầm tưởng dữ liệu đã "an toàn" trong volume, nhưng nếu container bị xóa và container mới lại tự sinh anonymous volume **khác** (không phải volume cũ), dữ liệu cũ coi như mất truy cập dù về mặt kỹ thuật chưa bị xóa hẳn.
3. **Khó backup/migrate** vì không định danh được rõ ràng volume nào chứa data quan trọng.

**Cách dọn dẹp:**
```bash
docker volume ls -f dangling=true      # liệt kê volume không gắn với container nào
docker volume prune                    # xóa tất cả volume dangling (cẩn thận, không hoàn tác được)
docker run --rm -v <container_id> ...  # hoặc luôn dùng: docker rm -v <container> để xóa kèm anonymous volume
```

**Best practice:** luôn **map tường minh named volume** cho mọi dữ liệu cần persist, tránh để Docker tự sinh anonymous volume trong môi trường production; chỉ chấp nhận anonymous volume cho dữ liệu tạm thời không quan trọng (ví dụ cache có thể build lại).

## Detailed Answer (EN)
| | **Named volume** | **Anonymous volume** |
|---|---|---|
| Creation | `docker volume create myvol` or declared by name in `-v myvol:/path` | Auto-generated when only the destination path is given: `-v /path`, or from a Dockerfile `VOLUME /path` with no name mapped |
| Identity | Human-readable name, easy to reference | Long random hash (e.g., `a1b2c3...`), hard to trace |
| Reusability | Easy — just reference the same name in another container | Hard — you must inspect `docker volume ls` to figure out which volume belongs to which container |
| Cleanup | Deliberate and controlled (`docker volume rm myvol`) | Prone to **orphaned volumes** since no one remembers the name to delete it |
| Use case | Data that must clearly persist, shared across containers (DB data, upload storage) | Usually created unintentionally when an image declares `VOLUME` in its Dockerfile without a name mapped at `docker run` |

Named volume example:
```bash
docker volume create pgdata
docker run -d -v pgdata:/var/lib/postgresql/data postgres:16
docker volume ls        # clearly shows "pgdata"
docker volume inspect pgdata
```

Unintentional anonymous volume example:
```dockerfile
# The official postgres image includes:
VOLUME /var/lib/postgresql/data
```
```bash
docker run -d postgres:16          # no -v mapping given
docker volume ls
# DRIVER    VOLUME NAME
# local     a1b2c3d4e5f6...        <-- anonymous volume auto-created because Dockerfile declared VOLUME
```
If you later `docker rm` this container (forgetting `-v` to remove the volume with it), the volume remains **orphaned** on the host, consuming disk space, with no way to tell which container it belonged to.

**Problems from overusing anonymous volumes in production:**
1. **Gradual disk leakage** — every `docker run` of an image with a Dockerfile `VOLUME` without a named mapping creates a new anonymous volume; across many deploys/restarts, orphaned volumes accumulate and `docker system df` shows growing volume usage.
2. **Data loss disguised as persistence** — a developer might assume data is "safely persisted" in a volume, but if the container is removed and a new one spawns a **different** anonymous volume, the old data effectively becomes inaccessible even though it technically hasn't been deleted.
3. **Hard to back up/migrate** since you can't clearly identify which volume holds the important data.

**Cleanup:**
```bash
docker volume ls -f dangling=true      # list volumes not attached to any container
docker volume prune                    # remove all dangling volumes (careful, irreversible)
docker rm -v <container>               # always remove containers with -v to clean up anonymous volumes with them
```

**Best practice:** always **explicitly map named volumes** for anything that needs to persist, avoiding Docker auto-creating anonymous volumes in production; only tolerate anonymous volumes for unimportant, rebuildable temp data (e.g., cache).
