---
id: linux-network-namespace-container-networking
position: devops
technology: linux-networking-ops
level: senior
tags: [containers, networking, linux, architecture]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Docker container có network stack riêng biệt với host như thế nào ở tầng kernel? Giải thích cơ chế network namespace, veth pair, và bridge network của Docker.

## Question (EN)
How does a Docker container get an isolated network stack from the host at the kernel level? Explain network namespaces, veth pairs, and Docker's bridge network.

## Đáp án chi tiết (VI)
Container không phải là máy ảo — nó là các process bình thường trên host, được cô lập bằng các tính năng kernel Linux gọi là **namespace**. Riêng về networking, kernel dùng **network namespace (netns)** để mỗi container có một "bản sao" độc lập của toàn bộ stack mạng: routing table riêng, interface riêng, iptables rule riêng, port riêng — hoàn toàn tách biệt với host và các container khác dù chạy chung 1 kernel.

**Tạo network namespace thủ công để hiểu cơ chế** (không dùng Docker):
```bash
ip netns add mynetns
ip netns exec mynetns ip addr show   # chỉ thấy interface loopback, chưa có gì khác
```

**Cách container kết nối ra ngoài — veth pair**: vì network namespace bị cô lập hoàn toàn, cần một "đường ống" nối 2 namespace lại — đó là **veth pair (virtual Ethernet pair)**: 2 interface ảo luôn đi theo cặp, gói tin gửi vào đầu này sẽ xuất hiện ở đầu kia, hoạt động như một sợi cáp mạng ảo.

```bash
ip link add veth-host type veth peer name veth-container
ip link set veth-container netns mynetns
# veth-host ở host namespace, veth-container ở trong mynetns
```

**Mô hình Docker bridge network (mặc định)**:
1. Docker daemon tạo một **Linux bridge** ảo trên host, tên `docker0` (giống 1 switch ảo layer 2).
2. Mỗi khi container start, Docker tạo 1 cặp veth: 1 đầu (`eth0`) đưa vào network namespace của container, đầu còn lại gắn vào bridge `docker0` trên host.
3. `docker0` được gán 1 dải IP nội bộ (mặc định `172.17.0.0/16`), mỗi container nhận 1 IP trong dải đó.
4. Container này gửi gói tin tới container khác cùng bridge → đi qua veth → tới `docker0` → `docker0` forward (như switch L2) tới veth của container đích.
5. Container ra internet: gói tin đi qua `docker0` → kernel host thực hiện **NAT (masquerade)** qua iptables rule Docker tự thêm, đổi source IP từ IP nội bộ container thành IP thật của host trước khi ra ngoài — đây là lý do container "thấy" internet dù có IP private không route được từ ngoài vào.
6. Port mapping (`docker run -p 8080:80`) hoạt động bằng **DNAT**: Docker thêm iptables rule chuyển traffic đến `host_ip:8080` thành `container_ip:80`.

**Kiểm tra thực tế**:
```bash
ip link show                                  # thấy veth*, docker0 trên host
docker inspect <container> | grep IPAddress   # IP nội bộ container
iptables -t nat -L -n -v                      # xem rule MASQUERADE và DNAT Docker tự thêm
```

**Vì sao kiến trúc này quan trọng để hiểu khi debug production**:
- Container **không thể** bind trực tiếp vào port của host nếu không có port mapping — dễ nhầm "app đang chạy port 80 trong container" với "port 80 mở trên host", đây là nguồn gốc phổ biến của lỗi connection refused khi test từ ngoài container.
- **Hiệu năng NAT**: traffic qua bridge network tốn thêm 1 lớp NAT so với chạy trực tiếp trên host — với ứng dụng cực nhạy latency/throughput, có thể cân nhắc `--network host` (container dùng chung network namespace với host, bỏ qua toàn bộ cơ chế trên, đổi lại mất cô lập network và có thể xung đột port).
- **Container-to-container trong cùng bridge** giao tiếp qua tên service (Docker DNS resolver nội bộ ở `127.0.0.11` trong container) thay vì IP cố định, vì IP có thể đổi khi container restart.
- **Kubernetes dùng mô hình phức tạp hơn** (CNI plugin như Calico/Cilium) nhưng nền tảng vẫn là network namespace + veth, chỉ khác ở cách quản lý routing giữa các node (overlay network, BGP...) để mỗi Pod có 1 IP flat routable trong cluster, không cần NAT giữa các Pod như model Docker bridge mặc định.

## Detailed Answer (EN)
A container isn't a virtual machine — it's a regular host process isolated using Linux kernel features called **namespaces**. For networking specifically, the kernel uses a **network namespace (netns)** so each container gets its own independent "copy" of the entire network stack: its own routing table, its own interfaces, its own iptables rules, its own ports — fully separated from the host and other containers even though they all share one kernel.

**Creating a network namespace manually to understand the mechanism** (without Docker):
```bash
ip netns add mynetns
ip netns exec mynetns ip addr show   # only shows the loopback interface, nothing else
```

**How a container reaches the outside world — veth pairs**: since network namespaces are fully isolated, you need a "pipe" connecting two namespaces — that's a **veth pair (virtual Ethernet pair)**: two virtual interfaces that always come in pairs, where a packet sent into one end appears at the other end, behaving like a virtual network cable.

```bash
ip link add veth-host type veth peer name veth-container
ip link set veth-container netns mynetns
# veth-host stays in the host namespace, veth-container lives inside mynetns
```

**Docker's default bridge network model**:
1. The Docker daemon creates a virtual **Linux bridge** on the host, named `docker0` (essentially a virtual layer-2 switch).
2. Each time a container starts, Docker creates a veth pair: one end (`eth0`) goes into the container's network namespace, the other end attaches to the `docker0` bridge on the host.
3. `docker0` is assigned a private IP range (default `172.17.0.0/16`), and each container gets an IP within that range.
4. When one container sends a packet to another container on the same bridge → it goes through its veth → to `docker0` → `docker0` forwards it (like an L2 switch) to the destination container's veth.
5. A container reaching the internet: the packet goes through `docker0` → the host kernel performs **NAT (masquerade)** via an iptables rule Docker adds automatically, rewriting the source IP from the container's private IP to the host's real IP before it leaves — this is why a container "sees" the internet despite having a private, non-routable-from-outside IP.
6. Port mapping (`docker run -p 8080:80`) works via **DNAT**: Docker adds an iptables rule redirecting traffic destined for `host_ip:8080` to `container_ip:80`.

**Inspecting in practice**:
```bash
ip link show                                  # shows veth*, docker0 on the host
docker inspect <container> | grep IPAddress   # container's private IP
iptables -t nat -L -n -v                      # shows the MASQUERADE and DNAT rules Docker added
```

**Why this architecture matters for production debugging**:
- A container **cannot** directly bind to a host port without port mapping — it's easy to confuse "the app is running on port 80 inside the container" with "port 80 is open on the host," a common source of connection-refused errors when testing from outside the container.
- **NAT performance overhead**: traffic through the bridge network incurs an extra NAT layer compared to running directly on the host — for extremely latency/throughput-sensitive applications, consider `--network host` (the container shares the host's network namespace, bypassing all of the above, trading away network isolation and risking port conflicts).
- **Container-to-container communication on the same bridge** happens by service name (Docker's internal DNS resolver at `127.0.0.11` inside the container) rather than fixed IP, since a container's IP can change on restart.
- **Kubernetes uses a more complex model** (CNI plugins like Calico/Cilium), but the foundation is still network namespaces + veth pairs — the main difference is how routing between nodes is managed (overlay networks, BGP, etc.) so every Pod gets a flat, cluster-routable IP without needing NAT between Pods, unlike Docker's default bridge model.
