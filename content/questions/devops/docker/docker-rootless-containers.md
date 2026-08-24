---
id: docker-rootless-containers
position: devops
technology: docker
level: senior
tags: [docker, security]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rootless Docker (chạy Docker daemon không cần quyền root) khác gì với việc chỉ chạy container bằng non-root `USER`? Trade-off khi triển khai rootless trong production là gì?

## Question (EN)
How does Rootless Docker (running the Docker daemon itself without root) differ from just running containers with a non-root `USER`? What are the trade-offs of deploying rootless in production?

## Đáp án chi tiết (VI)
Đây là hai lớp bảo mật **khác nhau và bổ sung cho nhau**, dễ bị nhầm lẫn khi phỏng vấn:

- **`USER` non-root trong container**: chỉ ảnh hưởng đến **process bên trong container** — process app không chạy với UID 0 trong namespace của container. Nhưng **`dockerd` (Docker daemon) trên host vẫn chạy bằng root**, và daemon đó có toàn quyền tương đương root trên host (đây là lý do socket `/var/run/docker.sock` cực kỳ nhạy cảm — ai có quyền truy cập socket này coi như có quyền root trên host).
- **Rootless Docker**: chạy **toàn bộ Docker daemon và container runtime bằng một user thường (non-root)** trên host, sử dụng **user namespaces** để map UID/GID bên trong container tới một dải UID không có quyền trên host (ví dụ UID 0 trong container ánh xạ tới UID 100000 trên host — hoàn toàn không có quyền gì đặc biệt).

**So sánh mức độ bảo vệ:**

| Kịch bản tấn công | Non-root USER only | Rootless Docker |
|---|---|---|
| App bị RCE, escape container namespace | Attacker có thể chiếm quyền root trên **host** nếu khai thác được lỗ hổng kernel/runtime | Attacker chỉ chiếm được quyền của user thường trên host, ngay cả khi escape thành công |
| Truy cập `docker.sock` bị lộ | Toàn quyền root trên host | Chỉ quyền của user chạy rootless daemon |
| Container tự nhận UID 0 bên trong | Vẫn có thể ảnh hưởng tài nguyên host nếu daemon là root | UID 0 trong container bị map sang UID không đặc quyền trên host — vô hại hơn nhiều |

**Cách bật rootless mode:**
```bash
dockerd-rootless-setuptool.sh install
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock
docker run hello-world      # daemon chạy hoàn toàn dưới user thường, không cần sudo
```

**Trade-off khi dùng rootless trong production:**
1. **Hiệu năng network giảm nhẹ** — rootless dùng `slirp4netns` hoặc `VPNKit` để giả lập networking user-space thay vì thao tác trực tiếp iptables/kernel networking (cần quyền root cho việc đó), gây thêm overhead so với bridge network thông thường.
2. **Một số tính năng bị giới hạn**: không hỗ trợ `--net=host` đầy đủ, cgroup v1 hạn chế hơn (cần cgroup v2 + systemd để quản lý resource limit đầy đủ), một số plugin storage driver không tương thích.
3. **Port < 1024**: rootless daemon (chạy bằng user thường) không thể publish trực tiếp container port ra các port đặc quyền < 1024 trên host trừ khi cấu hình thêm `CAP_NET_BIND_SERVICE` cho binary rootlesskit, hoặc dùng reverse proxy ở tầng ngoài.
4. **Migration/operations phức tạp hơn**: nhiều script/tool CI-CD giả định `docker.sock` chạy ở path mặc định với quyền root — chuyển sang rootless cần điều chỉnh biến môi trường, quyền socket, và đôi khi cả cách mount volume (do UID mapping khác).
5. **Không phải giải pháp thay thế hoàn toàn**: rootless giảm thiểu **blast radius khi daemon hoặc container bị compromise**, nhưng vẫn cần kết hợp với non-root `USER` trong container, `--cap-drop=ALL`, seccomp profile, và image scanning — đây là các lớp phòng thủ độc lập, không thể thay thế nhau.

**Khi nào nên áp dụng:** môi trường multi-tenant chia sẻ Docker host giữa nhiều team/khách hàng không tin cậy lẫn nhau, hoặc compliance yêu cầu daemon không chạy bằng root (ví dụ theo CIS Docker Benchmark mức cao) — chi phí vận hành thêm là hợp lý để đổi lấy giảm đáng kể rủi ro leo thang đặc quyền lên host.

## Detailed Answer (EN)
These are two **different but complementary** security layers, easy to conflate in an interview:

- **Non-root `USER` in the container**: only affects the **process inside the container** — the app process doesn't run as UID 0 within the container's namespace. But **`dockerd` (the Docker daemon) on the host still runs as root**, and that daemon has effectively root-equivalent power on the host (which is why the `/var/run/docker.sock` socket is extremely sensitive — anyone with access to it effectively has root on the host).
- **Rootless Docker**: runs the **entire Docker daemon and container runtime as an ordinary (non-root) user** on the host, using **user namespaces** to map UID/GID inside the container to an unprivileged UID range on the host (e.g., UID 0 in the container maps to UID 100000 on the host — with no special privilege at all).

**Comparing protection levels:**

| Attack scenario | Non-root USER only | Rootless Docker |
|---|---|---|
| App RCE, container namespace escape | Attacker can gain root on the **host** if a kernel/runtime vulnerability is exploited | Attacker only gains an ordinary user's privilege on the host, even on successful escape |
| Exposed `docker.sock` access | Full root on host | Only the privilege of the rootless daemon's user |
| Container claims UID 0 internally | Can still affect host resources since the daemon is root | UID 0 inside the container maps to an unprivileged host UID — far less harmful |

**Enabling rootless mode:**
```bash
dockerd-rootless-setuptool.sh install
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock
docker run hello-world      # daemon runs entirely as an ordinary user, no sudo needed
```

**Trade-offs of running rootless in production:**
1. **Slight network performance drop** — rootless uses `slirp4netns` or `VPNKit` to emulate user-space networking instead of manipulating iptables/kernel networking directly (which requires root), adding overhead versus a standard bridge network.
2. **Some features are limited**: no full `--net=host` support, more restrictive cgroup v1 handling (needs cgroup v2 + systemd for full resource-limit management), some storage driver plugins are incompatible.
3. **Ports < 1024**: a rootless daemon (running as an ordinary user) can't publish container ports directly to privileged host ports below 1024 unless you additionally grant `CAP_NET_BIND_SERVICE` to the rootlesskit binary, or front it with an external reverse proxy.
4. **More complex migration/operations**: many CI/CD scripts/tools assume `docker.sock` lives at the default path with root permissions — switching to rootless requires adjusting environment variables, socket permissions, and sometimes volume mounting behavior (due to different UID mapping).
5. **Not a complete replacement**: rootless reduces the **blast radius when the daemon or a container is compromised**, but still needs to be combined with non-root `USER` inside containers, `--cap-drop=ALL`, seccomp profiles, and image scanning — these are independent defense layers, not substitutes for each other.

**When to adopt it:** multi-tenant environments sharing a Docker host across mutually untrusting teams/customers, or compliance requirements that the daemon not run as root (e.g., higher levels of the CIS Docker Benchmark) — the added operational cost is justified by the significant reduction in host privilege-escalation risk.
