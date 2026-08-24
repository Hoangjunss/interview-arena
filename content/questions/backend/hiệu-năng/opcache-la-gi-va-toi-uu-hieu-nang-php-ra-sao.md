---
id: opcache-la-gi-va-toi-uu-hieu-nang-php-ra-sao
position: backend
technology: hiệu-năng
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
OPcache là gì và tối ưu hiệu năng PHP ra sao?

## Question (EN)
What is OPcache and how does it optimise PHP performance?

## Đáp án chi tiết (VI)
Mặc định mỗi request, PHP làm lại vòng: **đọc file `.php` → parse → compile ra opcode → execute → vứt opcode**. Parse + compile lặp lại mỗi lần là lãng phí.\
\
**OPcache** lưu opcode đã compile trong **shared memory**, nên các request sau **bỏ qua** hẳn bước đọc/parse/compile → chạy thẳng opcode. Đây là tối ưu có ảnh hưởng lớn nhất, gần như bắt buộc trên production.\
\
Các tham số chính:\
- `opcache.memory_consumption` — dung lượng cache opcode.\
- `opcache.max_accelerated_files` — số file cache tối đa (đặt ≥ tổng số file dự án).\
- `opcache.validate_timestamps` — **production nên tắt** để khỏi `stat` file mỗi request; đổi lại **phải reset OPcache khi deploy** (`opcache_reset()` hoặc restart PHP-FPM).\
- `opcache.revalidate_freq` — khoảng thời gian check lại khi validate bật (thường cho dev).\
\
Bổ trợ: **Preloading** (`opcache.preload`) nạp sẵn class framework vào bộ nhớ lúc khởi động; PHP 8 **JIT** nằm ngay trên OPcache.

## Detailed Answer (EN)
By default, every request PHP repeats the cycle: **read the `.php` file → parse → compile to opcodes → execute → discard the opcodes**. Re-parsing and re-compiling on every request is wasteful.\
\
**OPcache** stores the compiled opcodes in **shared memory**, so subsequent requests **skip** the read/parse/compile steps entirely and run the opcodes directly. It is the single highest-impact optimisation and effectively mandatory in production.\
\
Key settings:\
- `opcache.memory_consumption` — size of the opcode cache.\
- `opcache.max_accelerated_files` — max cached files (set ≥ your project’s file count).\
- `opcache.validate_timestamps` — **turn off in production** to avoid a `stat` per request; in exchange you **must reset OPcache on deploy** (`opcache_reset()` or restart PHP-FPM).\
- `opcache.revalidate_freq` — how often to re-check when validation is on (typically dev).\
\
Complementary: **Preloading** (`opcache.preload`) loads framework classes into memory at startup; PHP 8’s **JIT** sits on top of OPcache.
