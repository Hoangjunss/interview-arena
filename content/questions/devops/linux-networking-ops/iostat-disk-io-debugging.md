---
id: iostat-disk-io-debugging
position: devops
technology: linux-networking-ops
level: mid
tags: [disk-io, performance, monitoring, debugging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Ứng dụng phản hồi chậm và bạn nghi ngờ do disk I/O. Bạn dùng công cụ nào để xác nhận, và các chỉ số nào trong `iostat` là quan trọng nhất?

## Question (EN)
An application is responding slowly and you suspect disk I/O. What tools would you use to confirm this, and which `iostat` metrics matter most?

## Đáp án chi tiết (VI)
**Bước 1: Xác nhận nhanh có phải I/O wait không** bằng `top`/`vmstat`:
```bash
top
# %Cpu(s): 5.0 us, 2.0 sy, 0.0 ni, 40.0 id, 53.0 wa, 0.0 hi, 0.0 si, 0.0 st
vmstat 1 5
```
`%wa` (I/O wait) cao (ví dụ 53% như trên) nghĩa là CPU đang **rảnh nhưng phải chờ** dữ liệu từ disk — dấu hiệu rõ ràng disk là bottleneck chứ không phải CPU.

**Bước 2: Đi sâu vào từng disk bằng `iostat -x`**:
```bash
iostat -x 1 5
```
Output mẫu:
```
Device            r/s     w/s     rkB/s     wkB/s   await  r_await  w_await  %util
nvme0n1          120.0   450.0   4800.0   18000.0   35.20    12.10    42.30   98.50
```
Các chỉ số quan trọng nhất:
- **`%util`**: tỷ lệ thời gian disk **bận xử lý ít nhất 1 request** trong khoảng đo. `%util` gần 100% liên tục là dấu hiệu rõ ràng disk đã **saturated** (bão hòa). Lưu ý với SSD/NVMe hỗ trợ nhiều queue song song, `%util` = 100% chưa chắc đã "hết công suất" hoàn toàn (khác với HDD chỉ có 1 head đọc/ghi), nên cần xem thêm `await`.
- **`await`**: thời gian trung bình (ms) một I/O request phải chờ để hoàn thành, bao gồm cả thời gian trong queue lẫn thời gian service thực tế. Đây là chỉ số ảnh hưởng trực tiếp tới **latency ứng dụng cảm nhận được**. `await` cao (vài chục ms với SSD, hàng trăm ms với HDD) là dấu hiệu disk đang là bottleneck thật sự.
- **`r_await`/`w_await`**: tách riêng await cho đọc và ghi — giúp xác định workload nghiêng về đọc hay ghi để tối ưu đúng hướng (ví dụ nếu `w_await` cao bất thường, có thể do write cache/buffer disk đầy, hoặc RAID controller không có battery-backed cache).
- **`r/s`, `w/s`**: số IOPS (request/giây) — so sánh với IOPS tối đa mà loại disk đó công bố (ví dụ SSD gp3 trên AWS mặc định 3000 IOPS) để biết có đang chạm giới hạn provisioned hay không.
- **`rkB/s`, `wkB/s`**: throughput — so với giới hạn băng thông disk.

**Bước 3: Xác định process nào đang gây I/O** bằng `iotop` (cần cài thêm, không có sẵn mặc định trên nhiều distro):
```bash
iotop -oPa    # -o: chỉ hiện process có I/O, -P: theo process không theo thread, -a: tích lũy
```
Nếu không có `iotop`, dùng `/proc/<pid>/io` để check thủ công từng process nghi ngờ:
```bash
cat /proc/1234/io
# rchar, wchar, read_bytes, write_bytes...
```

**Chẩn đoán phân biệt nguyên nhân**:
- `%util` cao + `await` cao + IOPS đã gần chạm giới hạn provisioned của cloud disk → **disk bị throttle** do vượt IOPS/throughput được cấp phát (rất phổ biến với EBS gp2/gp3 trên AWS) — giải pháp: nâng cấp loại volume hoặc provisioned IOPS.
- `%util` cao nhưng IOPS thấp, `w_await` bất thường cao → có thể do **fsync đồng bộ liên tục** (ví dụ DB commit mỗi transaction, hoặc ứng dụng ghi log không buffer) — giải pháp thường ở tầng application (batch write, tối ưu commit).
- I/O tăng đột biến vào 1 khung giờ cố định → nghi ngờ **cron job** (backup, log rotation, report định kỳ) — kiểm tra `crontab -l` và `/etc/cron.d/`.

**Pitfall thường gặp**: chỉ nhìn `%util` mà bỏ qua `await` — trên SSD hiện đại, `%util` 100% có thể vẫn đang phục vụ tốt nếu `await` thấp (do xử lý song song nhiều queue), nên kết luận "disk quá tải" chỉ dựa vào `%util` một mình có thể sai, cần luôn đọc kết hợp cả hai chỉ số.

## Detailed Answer (EN)
**Step 1: Quickly confirm whether it's I/O wait** using `top`/`vmstat`:
```bash
top
# %Cpu(s): 5.0 us, 2.0 sy, 0.0 ni, 40.0 id, 53.0 wa, 0.0 hi, 0.0 si, 0.0 st
vmstat 1 5
```
A high `%wa` (I/O wait), like 53% above, means the CPU is **idle but waiting** for data from disk — a clear sign that disk, not CPU, is the bottleneck.

**Step 2: Dig into each disk with `iostat -x`**:
```bash
iostat -x 1 5
```
Sample output:
```
Device            r/s     w/s     rkB/s     wkB/s   await  r_await  w_await  %util
nvme0n1          120.0   450.0   4800.0   18000.0   35.20    12.10    42.30   98.50
```
Key metrics:
- **`%util`**: the percentage of time the disk was busy servicing **at least one** request during the sample. Sustained `%util` near 100% strongly suggests the disk is **saturated**. Note: on SSD/NVMe with parallel queue support, `%util` at 100% doesn't necessarily mean it's fully maxed out (unlike an HDD with a single read/write head), so always cross-check with `await`.
- **`await`**: average time (ms) an I/O request waits to complete, including both queue time and actual service time. This directly translates to **application-perceived latency**. High `await` (tens of ms for SSD, hundreds for HDD) signals a real disk bottleneck.
- **`r_await`/`w_await`**: separate read/write await — useful to determine whether the workload skews read-heavy or write-heavy for targeted optimization (e.g. an abnormally high `w_await` may indicate a full write cache/buffer, or a RAID controller lacking battery-backed cache).
- **`r/s`, `w/s`**: IOPS (requests/sec) — compare against the disk type's rated max (e.g. AWS gp3 defaults to 3000 IOPS) to check whether you're hitting a provisioned limit.
- **`rkB/s`, `wkB/s`**: throughput — compare against the disk's bandwidth limit.

**Step 3: Identify which process is causing the I/O** with `iotop` (needs installing, not present by default on many distros):
```bash
iotop -oPa    # -o: only processes with I/O, -P: per process not per thread, -a: accumulated
```
Without `iotop`, manually check suspects via `/proc/<pid>/io`:
```bash
cat /proc/1234/io
# rchar, wchar, read_bytes, write_bytes...
```

**Differentiating root causes**:
- High `%util` + high `await` + IOPS near the cloud disk's provisioned ceiling → **the disk is being throttled** for exceeding its provisioned IOPS/throughput (very common with AWS EBS gp2/gp3) — fix by upgrading the volume type or provisioned IOPS.
- High `%util` but low IOPS, unusually high `w_await` → likely **frequent synchronous fsyncs** (e.g. a DB committing every transaction, or unbuffered application logging) — the fix usually lives at the application layer (batch writes, optimize commit strategy).
- I/O spikes at a fixed time window → suspect a **cron job** (backup, log rotation, scheduled report) — check `crontab -l` and `/etc/cron.d/`.

**Common pitfall**: looking only at `%util` while ignoring `await` — on modern SSDs, `%util` at 100% can still be serving requests well if `await` stays low (thanks to deep parallel queues), so concluding "the disk is overloaded" from `%util` alone can be wrong; always read both metrics together.
