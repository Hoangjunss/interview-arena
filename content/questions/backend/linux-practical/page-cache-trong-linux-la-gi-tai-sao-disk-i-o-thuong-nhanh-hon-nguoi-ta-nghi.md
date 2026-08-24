---
id: page-cache-trong-linux-la-gi-tai-sao-disk-i-o-thuong-nhanh-hon-nguoi-ta-nghi
position: backend
technology: linux-practical
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Page cache trong Linux là gì? Tại sao disk I/O thường nhanh hơn người ta nghĩ?

## Question (EN)
What is Linux page cache? Why is disk I/O often faster than people think?

## Đáp án chi tiết (VI)
Linux page cache là phần RAM kernel dùng để cache file content từ disk — khi đọc file lần đầu, kernel load data vào page cache; lần sau đọc cùng file sẽ phục vụ từ RAM (không động đến disk). **Write-back:** write vào file chỉ update page cache (dirty pages), kernel flush xuống disk theo định kỳ hoặc khi `fsync()` được gọi. Vì vậy write thường nhanh (vào RAM), nhưng data chưa an toàn trên disk cho đến khi flush. **Tại sao I/O nhanh:** vì page cache absorb phần lớn I/O — database với `shared_buffers` nhỏ vẫn nhanh vì OS page cache bù đắp. `free -h` hiển thị `buff/cache` = page cache size. `vmstat` `bi`/`bo` = block in/out (disk I/O thực sự). **Drop cache để benchmark thực sự:**\
```bash\
sync; echo 3 \u003e /proc/sys/vm/drop_caches\
```\
**write-back vs write-through:** write-back (default) = nhanh nhưng có thể mất data nếu power fail; write-through (`O_SYNC` hoặc `fsync`) = chậm hơn nhưng durable. Database (PostgreSQL, MySQL) tự gọi `fsync` tại write-ahead log để đảm bảo durability.

## Detailed Answer (EN)
$89
