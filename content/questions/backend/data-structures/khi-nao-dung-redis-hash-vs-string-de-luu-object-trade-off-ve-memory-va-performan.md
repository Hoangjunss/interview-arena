---
id: khi-nao-dung-redis-hash-vs-string-de-luu-object-trade-off-ve-memory-va-performan
position: backend
technology: data-structures
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào dùng Redis Hash vs String để lưu object? Trade-off về memory và performance?

## Question (EN)
When should you use Redis Hash vs String to store an object? What are the memory and performance trade-offs?

## Đáp án chi tiết (VI)
**String approach**: serialize toàn bộ object thành JSON và lưu vào một key — đơn giản, một GET là lấy toàn bộ. Nhược điểm: muốn update một field phải GET toàn bộ object, deserialize, update, serialize lại, SET — tốn băng thông và CPU; race condition nếu concurrent write. **Hash approach**: mỗi field là một Hash field — `HSET user:1 name 'Alice' age 30 email 'a@b.com'`; `HGET user:1 name` lấy một field; `HINCRBY user:1 age 1` tăng atomic không cần GET. **Memory trade-off**: Redis tự dùng `listpack` encoding (compact array, đổi tên từ ziplist trong Redis 7.0) khi Hash nhỏ (\u003c `hash-max-listpack-entries=128` field và `hash-max-listpack-value=64` bytes) — hash nhỏ tốn ít memory hơn nhiều String key riêng lẻ. Khi vượt ngưỡng, Redis chuyển sang `hashtable` encoding. **Quyết định:** nhiều field thay đổi độc lập → Hash; object luôn đọc/ghi toàn bộ → String (JSON); object rất lớn (\u003e 1KB serialized) → String với compression.

## Detailed Answer (EN)
$82
