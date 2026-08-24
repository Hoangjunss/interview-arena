---
id: oom-killer-explained
position: devops
technology: linux-networking-ops
level: mid
tags: [linux, memory, debugging, production-incident]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Process quan trọng bị kill đột ngột và trong `dmesg` có dòng "Out of memory: Killed process". OOM Killer là gì, nó chọn process nào để kill, và làm sao để kiểm soát hành vi này?

## Question (EN)
A critical process was suddenly killed, and `dmesg` shows "Out of memory: Killed process". What is the OOM Killer, how does it choose which process to kill, and how do you control this behavior?

## Đáp án chi tiết (VI)
**OOM Killer (Out-Of-Memory Killer)** là cơ chế của kernel Linux được kích hoạt khi hệ thống **cạn kiệt bộ nhớ khả dụng cả RAM lẫn swap**, không còn cách nào cấp phát thêm memory cho request mới. Thay vì để toàn bộ hệ thống treo/panic, kernel chủ động **chọn và kill một process** để giải phóng RAM, giữ hệ thống sống sót.

**Xác nhận đúng là do OOM Killer**:
```bash
dmesg -T | grep -i "out of memory\|oom"
journalctl -k | grep -i oom
```
Output mẫu:
```
Out of memory: Killed process 4821 (java) total-vm:8123456kB, anon-rss:6234567kB, oom_score_adj:0
```

**Cơ chế chọn "nạn nhân"** — kernel tính điểm `oom_score` cho từng process (xem tại `/proc/<pid>/oom_score`), điểm càng cao càng dễ bị kill trước. Các yếu tố ảnh hưởng chính:
- **Lượng RAM process đang chiếm** — yếu tố lớn nhất, process ăn nhiều RAM nhất thường bị nhắm tới đầu tiên (kill 1 process lớn giải phóng được nhiều RAM hơn kill nhiều process nhỏ).
- **`oom_score_adj`**: giá trị điều chỉnh thủ công từ -1000 đến 1000 mà admin có thể set cho từng process. `-1000` = **không bao giờ bị OOM kill**, `1000` = ưu tiên kill trước tiên.
- Thời gian chạy, quyền root (process chạy bởi root được "ưu ái" nhẹ hơn) cũng ảnh hưởng nhưng ít quan trọng hơn lượng RAM.

**Điều chỉnh hành vi OOM Killer**:
```bash
# Bảo vệ 1 process quan trọng khỏi bị OOM kill (ví dụ database chính)
echo -1000 > /proc/$(pgrep postgres)/oom_score_adj

# Với systemd service, cấu hình trực tiếp trong unit file
```
```ini
[Service]
OOMScoreAdjust=-500
```

**Các hướng xử lý triệt để hơn** (thay vì chỉ né OOM Killer, vì né 1 process nghĩa là process khác sẽ bị kill thay):
1. **Set memory limit hợp lý cho từng service** (`MemoryMax` trong systemd, hoặc `mem_limit`/resources.limits trong Docker/Kubernetes) để giới hạn "sát thương" — 1 service leak memory chỉ tự kill chính nó (qua cgroup OOM riêng) thay vì kéo theo cả hệ thống.
2. **Monitoring chủ động**: alert khi `available` memory xuống thấp (trước khi OOM Killer kích hoạt), thay vì chỉ phát hiện sau khi sự cố đã xảy ra.
3. **Đúng kích thước heap/JVM args** cho ứng dụng Java (`-Xmx`) — một lỗi rất phổ biến là set `-Xmx` gần bằng RAM vật lý của container mà quên native memory (thread stack, metaspace, direct buffer), dẫn tới container bị OOM kill dù JVM tưởng vẫn còn heap trống.
4. **Trong Kubernetes**: phân biệt rõ OOM Killer của **kernel/cgroup** (pod bị kill khi vượt `resources.limits.memory`, log `OOMKilled` trong `kubectl describe pod`) với memory pressure ở tầng node — set `requests`/`limits` sát với usage thực tế qua profiling, tránh để limit quá cao khiến nhiều pod cùng chen chúc gây OOM ở tầng node.

**Câu hỏi hay bị hỏi thêm**: vì sao không tắt hẳn overcommit/OOM Killer? Vì Linux mặc định cho phép **overcommit memory** (`vm.overcommit_memory=0`) — nhiều process gọi `malloc()` xin nhiều RAM hơn thực sự dùng (rất phổ biến với `fork()` copy-on-write), nếu kernel từ chối cấp phát ngay khi tổng "xin" vượt RAM vật lý thì rất nhiều ứng dụng bình thường sẽ crash ngay từ đầu dù thực tế chưa bao giờ dùng hết. OOM Killer là "van an toàn" chấp nhận đánh đổi để tối ưu việc sử dụng RAM tổng thể.

## Detailed Answer (EN)
The **OOM Killer (Out-Of-Memory Killer)** is a Linux kernel mechanism triggered when the system **runs out of usable memory across both RAM and swap**, with no way to satisfy a new allocation request. Instead of letting the entire system hang or panic, the kernel actively **selects and kills a process** to free up RAM and keep the system alive.

**Confirming it was the OOM Killer**:
```bash
dmesg -T | grep -i "out of memory\|oom"
journalctl -k | grep -i oom
```
Sample output:
```
Out of memory: Killed process 4821 (java) total-vm:8123456kB, anon-rss:6234567kB, oom_score_adj:0
```

**How the "victim" is chosen** — the kernel computes an `oom_score` for every process (viewable at `/proc/<pid>/oom_score`); the higher the score, the more likely it is to be killed first. Key factors:
- **RAM currently consumed** — the biggest factor; the process eating the most RAM is usually targeted first (killing one large process frees more memory than killing several small ones).
- **`oom_score_adj`**: a manual adjustment value from -1000 to 1000 that an admin can set per process. `-1000` = **never OOM-killed**, `1000` = kill first, highest priority.
- Runtime duration and root privilege (root-owned processes get a slight discount) also matter, but far less than RAM usage.

**Tuning OOM Killer behavior**:
```bash
# Protect a critical process from being OOM-killed (e.g. the primary database)
echo -1000 > /proc/$(pgrep postgres)/oom_score_adj

# For a systemd service, configure it directly in the unit file
```
```ini
[Service]
OOMScoreAdjust=-500
```

**More structural fixes** (rather than just dodging the OOM Killer for one process, since protecting one just shifts the risk onto another):
1. **Set sensible memory limits per service** (`MemoryMax` in systemd, or `mem_limit`/`resources.limits` in Docker/Kubernetes) to contain the "blast radius" — a service that leaks memory gets killed on its own via its own cgroup OOM instead of dragging down the whole system.
2. **Proactive monitoring**: alert when available memory drops low, *before* the OOM Killer fires, rather than only discovering the incident after the fact.
3. **Right-size heap/JVM args** for Java applications (`-Xmx`) — a very common mistake is setting `-Xmx` close to a container's full RAM while forgetting native memory overhead (thread stacks, metaspace, direct buffers), leading to the container being OOM-killed even though the JVM believes it still has free heap.
4. **In Kubernetes**: clearly distinguish the **kernel/cgroup** OOM Killer (a pod killed for exceeding `resources.limits.memory`, showing `OOMKilled` in `kubectl describe pod`) from node-level memory pressure — right-size `requests`/`limits` against real profiled usage, and avoid limits set too high, which lets too many pods crowd a node and trigger node-level OOM.

**A common follow-up question**: why not just disable overcommit/OOM Killer entirely? Because Linux by default allows **memory overcommit** (`vm.overcommit_memory=0`) — many processes `malloc()` more RAM than they actually end up using (very common with copy-on-write `fork()`). If the kernel rejected every allocation the moment total "requested" memory exceeded physical RAM, countless normal applications would crash immediately despite never actually using that much. The OOM Killer is the "safety valve" that trades off this risk to optimize overall RAM utilization.
