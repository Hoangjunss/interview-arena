---
id: oom-killer-trong-linux-cach-hoat-dong-va-cach-bao-ve-process-quan-trong
position: backend
technology: linux-practical
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
OOM Killer trong Linux: cách hoạt động và cách bảo vệ process quan trọng?

## Question (EN)
The Linux OOM Killer: how does it work and how do you protect important processes?

## Đáp án chi tiết (VI)
Khi Linux kernel không còn free memory (và không thể swap), OOM (Out-of-Memory) Killer được kích hoạt để kill một process và giải phóng memory. **Cách OOM Killer chọn victim:** tính điểm `oom_score` cho mỗi process (0-1000) — dựa trên: RSS (physical memory dùng), swap usage, thời gian chạy (lâu hơn → điểm thấp hơn, less likely to kill), nice value. Process có `oom_score` cao nhất bị kill. **Bảo vệ process quan trọng:**\
```bash\
# Giảm oom_score_adj → khó bị kill hơn\
echo -1000 \u003e /proc/$(pgrep redis-server)/oom_score_adj\
# -1000 = không bao giờ bị kill (chỉ root)\
# Xem score hiện tại\
cat /proc/$(pgrep nginx)/oom_score\
```\
**Kubernetes:** `oom_score_adj` được set tự động theo QoS class: Guaranteed pods (-997), Burstable (2-999), BestEffort (1000 = bị kill đầu tiên). **Best practices:** set memory limits hợp lý trong K8s; monitor `/proc/meminfo`, `MemAvailable`; dùng `cgroups memory.limit_in_bytes` để limit per-container thay vì để OOM Killer action ở system level.

## Detailed Answer (EN)
$84
