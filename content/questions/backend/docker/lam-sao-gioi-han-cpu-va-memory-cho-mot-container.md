---
id: lam-sao-gioi-han-cpu-va-memory-cho-mot-container
position: backend
technology: docker
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao giới hạn CPU và memory cho một container?

## Question (EN)
How do you limit a container's CPU and memory?

## Đáp án chi tiết (VI)
Docker dựa vào cgroups để đặt trần tài nguyên ngay khi chạy. Mặc định container dùng tài nguyên gần như không giới hạn, nên trên host nhiều container cần đặt limit rõ ràng.\
\
**Memory:**\
- `--memory` (hard limit): vượt trần thì kernel OOM-kill process trong container.\
- `--memory-reservation` (soft limit): mức cam kết, kernel cố ép về khi host thiếu RAM.\
\
**CPU:**\
- `--cpus=\\"1.5\\"`: giới hạn tối đa 1.5 core (cách trực quan nhất).\
- `--cpu-shares`: trọng số tương đối khi các container tranh CPU, chỉ có tác dụng khi CPU bão hòa.\
\
```bash\
docker run --memory=512m --cpus=\\"1.5\\" myapp\
```\
Lưu ý interview: hard memory limit là ranh giới cứng — app JVM/Node cần biết limit để đặt heap, nếu không process có thể bị OOM-kill dù bên trong tưởng còn RAM. Đây cũng là cơ sở cho `resources.limits`/`requests` trong Kubernetes.

## Detailed Answer (EN)
Docker uses cgroups to cap resources at runtime. By default a container uses nearly unlimited resources, so on a multi-container host you should set explicit limits.\
\
**Memory:**\
- `--memory` (hard limit): exceeding it makes the kernel OOM-kill a process inside the container.\
- `--memory-reservation` (soft limit): a committed level the kernel tries to push back toward when the host is low on RAM.\
\
**CPU:**\
- `--cpus=\\"1.5\\"`: cap at most 1.5 cores (the most intuitive option).\
- `--cpu-shares`: a relative weight when containers contend for CPU, effective only when the CPU is saturated.\
\
```bash\
docker run --memory=512m --cpus=\\"1.5\\" myapp\
```\
Interview note: the hard memory limit is a firm boundary — a JVM/Node app needs to know the limit to size its heap, otherwise the process can be OOM-killed even though it thinks RAM is free. This is also the basis for `resources.limits`/`requests` in Kubernetes.
