---
id: free-command-buff-cache
position: devops
technology: linux-networking-ops
level: junior
tags: [linux, memory, monitoring]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chạy lệnh `free -h` thấy "available" thấp nhưng "buff/cache" rất cao. Server có thực sự thiếu RAM không? Giải thích các cột trong output của `free`.

## Question (EN)
Running `free -h` shows low "available" memory but very high "buff/cache". Is the server actually low on RAM? Explain the columns in `free`'s output.

## Đáp án chi tiết (VI)
Đây là một trong những hiểu lầm phổ biến nhất khi mới làm ops. Output mẫu:

```
              total        used        free      shared  buff/cache   available
Mem:           15Gi       2.1Gi       0.3Gi       120Mi        13Gi        12Gi
Swap:         2.0Gi          0B       2.0Gi
```

Giải thích từng cột:
- **total**: tổng RAM vật lý.
- **used**: bộ nhớ đang bị process chiếm dụng thực sự (không tính buffer/cache).
- **free**: RAM hoàn toàn chưa dùng đến — con số này **thường thấp** và **không phản ánh đúng** tình trạng hệ thống, vì Linux có triết lý "RAM trống là RAM lãng phí".
- **buff/cache**: bộ nhớ Linux dùng để cache dữ liệu disk (page cache) và buffer cho block I/O, nhằm tăng tốc độ đọc/ghi lần sau. Đây là bộ nhớ **có thể thu hồi lại ngay lập tức** khi ứng dụng cần.
- **available**: ước tính lượng RAM có thể cấp cho ứng dụng mới **mà không cần swap**, đã tính đến phần cache có thể giải phóng. Đây mới là con số quan trọng nhất để đánh giá server có thiếu RAM hay không, **không phải** `free`.

Vậy trong ví dụ trên: `available = 12Gi` là rất khỏe mạnh, mặc dù `free` chỉ có 0.3Gi. Kernel đang dùng RAM dư để cache file trên disk (ví dụ MySQL InnoDB buffer pool hoặc page cache của file tĩnh), và sẽ tự động nhường lại cache đó ngay khi có process cần cấp phát bộ nhớ mới — hoàn toàn bình thường, thậm chí là dấu hiệu tốt vì disk I/O sẽ nhanh hơn.

**Khi nào mới thực sự đáng lo?**
- `available` thấp gần bằng 0 **và** hệ thống bắt đầu dùng swap nhiều (`Swap used` tăng, `si`/`so` trong `vmstat` khác 0 liên tục) → đây là dấu hiệu **thật sự** thiếu RAM.
- Kiểm tra thêm bằng `vmstat 1` để xem `si`/`so` (swap in/out), nếu liên tục > 0 tức là hệ thống đang swap thrashing, ảnh hưởng nghiêm trọng đến latency vì disk chậm hơn RAM hàng nghìn lần.

```bash
vmstat 1 5
# procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
#  r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
```

- Dùng `/proc/meminfo` để xem chi tiết hơn: `MemAvailable`, `Cached`, `Dirty` (dữ liệu cache chưa flush xuống disk — nếu `Dirty` cao và không giảm, có thể disk I/O đang là bottleneck).

**Pitfall**: rất nhiều alert/monitoring cấu hình sai khi cảnh báo dựa trên `free` thay vì `available`, gây ra false alarm liên tục dù server hoàn toàn khỏe mạnh. Nên cấu hình alert dựa trên `MemAvailable` từ `/proc/meminfo` hoặc metric tương đương của node_exporter (`node_memory_MemAvailable_bytes`).

## Detailed Answer (EN)
This is one of the most common misunderstandings for people new to ops. Sample output:

```
              total        used        free      shared  buff/cache   available
Mem:           15Gi       2.1Gi       0.3Gi       120Mi        13Gi        12Gi
Swap:         2.0Gi          0B       2.0Gi
```

Column breakdown:
- **total**: total physical RAM.
- **used**: memory actually held by processes (excludes buffer/cache).
- **free**: RAM completely untouched — this number is **usually low** and **misleading** on its own, because Linux's philosophy is "unused RAM is wasted RAM."
- **buff/cache**: memory Linux uses to cache disk data (page cache) and buffer block I/O, to speed up future reads/writes. This memory is **instantly reclaimable** whenever an application needs it.
- **available**: an estimate of how much RAM can be handed to a new application **without swapping**, already accounting for reclaimable cache. This is the number that actually matters for judging whether a server is low on memory — **not** `free`.

In the example above: `available = 12Gi` is very healthy, even though `free` is only 0.3Gi. The kernel is using spare RAM to cache disk data (e.g. MySQL's InnoDB buffer pool or page cache for static files), and will instantly release that cache the moment a process needs fresh memory — this is entirely normal, and arguably a good sign, since it means disk I/O will be faster.

**When should you actually worry?**
- `available` is near zero **and** the system starts swapping heavily (`Swap used` climbing, `si`/`so` in `vmstat` consistently non-zero) — that's a **real** memory shortage.
- Cross-check with `vmstat 1` for `si`/`so` (swap in/out). If they stay above 0 continuously, the system is swap-thrashing, which severely hurts latency since disk is orders of magnitude slower than RAM.

```bash
vmstat 1 5
# procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
#  r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
```

- `/proc/meminfo` gives more detail: `MemAvailable`, `Cached`, `Dirty` (cached data not yet flushed to disk — if `Dirty` stays high and doesn't drain, disk I/O may be the bottleneck).

**Pitfall**: many monitoring setups misconfigure alerts on `free` instead of `available`, causing constant false alarms on perfectly healthy servers. Alerts should be based on `MemAvailable` from `/proc/meminfo` or the equivalent node_exporter metric (`node_memory_MemAvailable_bytes`).
