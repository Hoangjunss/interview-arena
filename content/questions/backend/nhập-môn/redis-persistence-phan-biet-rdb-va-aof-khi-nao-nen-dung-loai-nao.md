---
id: redis-persistence-phan-biet-rdb-va-aof-khi-nao-nen-dung-loai-nao
position: backend
technology: nhập-môn
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis persistence: phân biệt RDB và AOF, khi nào nên dùng loại nào?

## Question (EN)
Redis persistence: what is the difference between RDB and AOF, and when should you use each?

## Đáp án chi tiết (VI)
RDB (Redis Database Snapshot): tạo snapshot toàn bộ data ra file `.rdb` theo định kỳ (ví dụ: `save 900 1` = snapshot nếu có ít nhất 1 key thay đổi trong 900 giây). RDB compact, restart nhanh vì chỉ load một file, nhưng có thể mất data của khoảng thời gian kể từ snapshot cuối. AOF (Append-Only File): log mọi write operation vào file `.aof`; khi restart, replay toàn bộ command để rebuild state. AOF bền hơn (cấu hình `appendfsync always` không mất data, `everysec` mất tối đa 1 giây), nhưng file lớn hơn và restart chậm hơn. Có thể dùng cả hai cùng lúc (khuyến nghị cho production): RDB cho backup định kỳ, AOF cho durability. Redis 7.0 giới thiệu RDB-AOF hybrid format — AOF rewrite dùng RDB snapshot + delta AOF, kết hợp ưu điểm của cả hai. Nếu Redis chỉ dùng thuần túy làm cache, có thể disable cả hai để tối đa performance.

## Detailed Answer (EN)
RDB (Redis Database Snapshot): periodically creates a full snapshot of all data to a `.rdb` file (e.g., `save 900 1` = snapshot if at least 1 key changed within 900 seconds). RDB is compact and restarts quickly since only one file needs to be loaded, but data written since the last snapshot can be lost. AOF (Append-Only File): logs every write operation to a `.aof` file; on restart, all commands are replayed to rebuild state. AOF is more durable (`appendfsync always` loses no data; `everysec` loses at most 1 second of data) but produces a larger file and slower restarts. Both can be used together (recommended for production): RDB for periodic backups, AOF for durability. Redis 7.0 introduced a hybrid RDB-AOF format — AOF rewrite uses an RDB snapshot plus an incremental AOF, combining the benefits of both. If Redis is used purely as a cache, both can be disabled for maximum performance.
