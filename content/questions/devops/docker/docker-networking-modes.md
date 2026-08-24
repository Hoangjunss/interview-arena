---
id: docker-networking-modes
position: devops
technology: docker
level: mid
tags: [docker, networking]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker có những network driver/mode nào (bridge, host, overlay, none)? Khi nào dùng mode nào?

## Question (EN)
What Docker network drivers/modes exist (bridge, host, overlay, none)? When should you use each?

## Đáp án chi tiết (VI)
| Mode | Cách hoạt động | Use case |
|---|---|---|
| **bridge** (mặc định) | Docker tạo một virtual bridge (`docker0` hoặc bridge tùy chỉnh) trên host; mỗi container có IP riêng trong subnet nội bộ, NAT ra ngoài qua host | Mặc định cho single-host, đa số ứng dụng thông thường |
| **host** | Container **dùng chung network namespace với host** — không NAT, không cô lập port | Cần hiệu năng network cao nhất, hoặc cần bind nhiều port động (ví dụ tool network scanning) |
| **none** | Container không có network interface nào (trừ loopback) | Container chỉ xử lý dữ liệu cục bộ, không cần network, tăng bảo mật tối đa |
| **overlay** | Tạo network ảo **trải rộng nhiều Docker host** (dùng VXLAN encapsulation), cho phép container trên các node khác nhau giao tiếp như cùng subnet | Docker Swarm / multi-host clustering |
| **macvlan** | Gán container một MAC/IP riêng trực tiếp trên mạng vật lý, container xuất hiện như một thiết bị thật trên LAN | Ứng dụng legacy cần IP thật trên mạng doanh nghiệp, không qua NAT |

**Chi tiết bridge (mode phổ biến nhất cần hiểu sâu):**
```bash
docker network create mynet
docker run -d --name web --network mynet nginx
docker run -d --name app --network mynet myapp
```
- Container trong cùng **custom bridge network** (không phải bridge mặc định `docker0`) có **DNS tự động**: container `app` có thể `ping web` hoặc gọi `http://web:80` bằng tên container.
- Bridge mặc định (`docker0`) **không có DNS tự động** giữa container — phải dùng `--link` (deprecated) hoặc biết IP cứng, đây là lý do luôn khuyến nghị **tạo custom bridge network** thay vì dùng default.
- Port publish (`-p 8080:80`) chỉ cần thiết khi muốn traffic từ **ngoài host** vào container; container-to-container trong cùng network không cần publish port, gọi trực tiếp qua network nội bộ + container port.

**So sánh hiệu năng và cô lập:**
```
host:    [Network cao nhất] <-----------------> [Cô lập thấp nhất]
bridge:  [Network trung bình, có NAT overhead]   [Cô lập tốt]
none:    [Không network]                          [Cô lập tuyệt đối]
```

**Ví dụ overlay network trong Swarm:**
```bash
docker swarm init
docker network create -d overlay my-overlay
docker service create --name web --network my-overlay --replicas 3 nginx
```
3 replica của service `web` có thể nằm trên 3 node vật lý khác nhau nhưng vẫn giao tiếp được qua overlay network như cùng một mạng LAN ảo.

**Edge case / gotcha:**
- `host` mode **không hoạt động trên Docker Desktop (macOS/Windows)** theo đúng nghĩa native — vì Docker chạy trong VM Linux ẩn, "host" ở đây là host của VM đó, không phải máy Mac/Windows thật. Chỉ hoạt động đúng như mô tả trên Linux native.
- Dùng `host` network bỏ qua toàn bộ port mapping và network isolation của container — hai container cùng bind port 8080 trên `host` mode sẽ **conflict trực tiếp** như hai process chạy thẳng trên host.
- Overlay network mặc định **không mã hóa traffic** giữa các node — cần bật `--opt encrypted` khi tạo network nếu truyền dữ liệu nhạy cảm qua nhiều datacenter.

## Detailed Answer (EN)
| Mode | How it works | Use case |
|---|---|---|
| **bridge** (default) | Docker creates a virtual bridge (`docker0` or a custom bridge) on the host; each container gets its own IP in an internal subnet, NATed out through the host | Default for single-host, most typical applications |
| **host** | Container **shares the host's network namespace** — no NAT, no port isolation | Need maximum network performance, or need to bind many dynamic ports (e.g., a network scanning tool) |
| **none** | Container has no network interface (except loopback) | Container only processes local data, needs no network, maximum security |
| **overlay** | Creates a virtual network **spanning multiple Docker hosts** (via VXLAN encapsulation), letting containers on different nodes communicate as if on the same subnet | Docker Swarm / multi-host clustering |
| **macvlan** | Gives a container its own MAC/IP directly on the physical network; the container appears as a real device on the LAN | Legacy apps needing a real IP on the corporate network, bypassing NAT |

**Deep dive on bridge (the most common mode, worth understanding well):**
```bash
docker network create mynet
docker run -d --name web --network mynet nginx
docker run -d --name app --network mynet myapp
```
- Containers on the same **custom bridge network** (not the default `docker0` bridge) get **automatic DNS**: container `app` can `ping web` or call `http://web:80` by container name.
- The default bridge (`docker0`) has **no automatic DNS** between containers — you'd need `--link` (deprecated) or hardcoded IPs, which is why creating a **custom bridge network** instead of using the default is always recommended.
- Port publishing (`-p 8080:80`) is only needed when you want traffic from **outside the host** to reach the container; container-to-container traffic on the same network doesn't need publishing — it calls directly over the internal network using the container's port.

**Performance vs. isolation trade-off:**
```
host:    [Highest network perf] <-----------------> [Lowest isolation]
bridge:  [Moderate perf, NAT overhead]                [Good isolation]
none:    [No network]                                  [Absolute isolation]
```

**Overlay network example in Swarm:**
```bash
docker swarm init
docker network create -d overlay my-overlay
docker service create --name web --network my-overlay --replicas 3 nginx
```
The 3 replicas of the `web` service can live on 3 different physical nodes but still communicate over the overlay network as if on the same virtual LAN.

**Edge case / gotcha:**
- `host` mode **doesn't work natively on Docker Desktop (macOS/Windows)** — Docker runs inside a hidden Linux VM, so "host" here means the VM's host, not the actual Mac/Windows machine. It only behaves as described on native Linux.
- Using `host` networking bypasses all port mapping and network isolation — two containers both binding port 8080 in `host` mode will **directly conflict**, just like two processes running straight on the host.
- Overlay networks **don't encrypt traffic between nodes by default** — enable `--opt encrypted` when creating the network if sensitive data crosses multiple datacenters.
