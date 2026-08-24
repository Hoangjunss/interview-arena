---
id: load-average-interpretation
position: devops
technology: linux-networking-ops
level: mid
tags: [linux, cpu, monitoring, performance]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lệnh `uptime` cho ra `load average: 8.50, 4.20, 2.10` trên một máy 4 core. Bạn hiểu con số này như thế nào và server có đang quá tải không?

## Question (EN)
`uptime` shows `load average: 8.50, 4.20, 2.10` on a 4-core machine. How do you interpret this, and is the server overloaded?

## Đáp án chi tiết (VI)
**Load average** là số tiến trình trung bình đang ở trạng thái **runnable** (đang chạy trên CPU) hoặc **uninterruptible sleep** (đang chờ I/O, ví dụ chờ disk) trong khoảng thời gian 1, 5, 15 phút gần nhất. Đây là điểm nhiều người hiểu sai: load average **không chỉ đo CPU**, nó còn tính cả process đang bị block bởi I/O (trạng thái `D` trong `ps`/`top`).

```
$ uptime
 14:32:01 up 10 days,  3:15,  2 users,  load average: 8.50, 4.20, 2.10
```

Ba con số tương ứng trung bình trượt 1 phút, 5 phút, 15 phút. Cách đọc xu hướng:
- 1 phút (8.50) > 5 phút (4.20) > 15 phút (2.10): tải đang **tăng dần**, vấn đề mới xảy ra gần đây và đang xấu đi.
- Ngược lại nếu 1 phút thấp hơn 15 phút: tải đang **giảm dần**, có thể spike đã qua.

**Đánh giá "quá tải" phải chia cho số CPU core**: quy tắc kinh nghiệm là load average nên nhỏ hơn số core khả dụng để hệ thống còn "thở". Với máy 4 core:
- Load = 4.0 → CPU chạy 100%, chưa có process nào phải chờ, đây là baseline "vừa đủ tải".
- Load = 8.50 → gấp đôi số core → trung bình có 4.5 process đang phải **chờ** để được cấp CPU hoặc I/O, hệ thống rõ ràng đang quá tải.

Kiểm tra số core: `nproc` hoặc `lscpu`.

**Nhưng load cao không chắc là do CPU-bound** — cần phân biệt:
```bash
top      # xem %CPU cột us/sy, và cột trạng thái process (R = running, D = uninterruptible sleep)
vmstat 1 # cột "r" (runnable) và "b" (blocked/uninterruptible)
```
- Nếu `%wa` (I/O wait) trong `top` cao và nhiều process ở trạng thái `D` → load cao do **disk I/O chậm** (ví dụ disk saturated, NFS timeout), không phải do thiếu CPU. Tăng CPU sẽ không giải quyết được, cần xem `iostat -x 1` để check `%util` của disk.
- Nếu `%us`/`%sy` cao và process ở trạng thái `R` xếp hàng → thực sự **CPU-bound**, cần scale CPU hoặc tối ưu code.

**Ví dụ thực tế postmortem**: server báo load 15 trên máy 8 core, team hoảng loạn định scale thêm CPU, nhưng `iostat` cho thấy disk `%util` = 100% do một cron job đang chạy `rsync` full backup — sau khi dời lịch backup ra giờ thấp điểm, load về bình thường mà không cần thêm tài nguyên.

## Detailed Answer (EN)
**Load average** is the average number of processes in the **runnable** state (actively on CPU) or in **uninterruptible sleep** (waiting on I/O, e.g. disk) over the last 1, 5, and 15 minutes. This is where many people go wrong: load average does **not measure CPU alone** — it also counts processes blocked on I/O (state `D` in `ps`/`top`).

```
$ uptime
 14:32:01 up 10 days,  3:15,  2 users,  load average: 8.50, 4.20, 2.10
```

The three numbers are the 1-, 5-, and 15-minute moving averages. Reading the trend:
- 1-min (8.50) > 5-min (4.20) > 15-min (2.10): load is **rising**, the problem is recent and getting worse.
- The reverse (1-min lower than 15-min): load is **decreasing**, a spike may have passed.

**"Overloaded" must be judged relative to CPU core count**: the rule of thumb is load average should stay below the number of available cores for the system to have headroom. On a 4-core box:
- Load = 4.0 → CPU is fully saturated but nothing is queued waiting — a "just full" baseline.
- Load = 8.50 → double the core count → on average 4.5 processes are **waiting** for CPU or I/O at any moment — the system is clearly overloaded.

Check core count with `nproc` or `lscpu`.

**High load isn't necessarily CPU-bound** — you need to distinguish the cause:
```bash
top      # look at %us/%sy columns and process state (R = running, D = uninterruptible sleep)
vmstat 1 # "r" column (runnable) and "b" column (blocked/uninterruptible)
```
- If `%wa` (I/O wait) in `top` is high and many processes sit in `D` state → load is high due to **slow disk I/O** (saturated disk, NFS timeouts), not lack of CPU. Adding CPU won't help — check `iostat -x 1` for disk `%util`.
- If `%us`/`%sy` are high and processes queue up in `R` state → the box is genuinely **CPU-bound**, needing more CPU or code optimization.

**Real postmortem example**: a server reported load 15 on an 8-core box; the team panicked and wanted to scale up CPU, but `iostat` showed disk `%util` at 100% because a cron job was running a full `rsync` backup. After moving the backup to an off-peak window, load returned to normal with no extra resources needed.
