---
id: producer-cua-kafka-nen-du-lieu-ra-sao-danh-doi-the-nao
position: backend
technology: producer
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Producer của Kafka nén dữ liệu ra sao, đánh đổi thế nào?

## Question (EN)
How does the Kafka producer compress data, and what are the trade-offs?

## Đáp án chi tiết (VI)
Producer đặt qua **`compression.type`**, chọn một trong: **`none`, `gzip`, `snappy`, `lz4`, `zstd`**. Producer nén **cả một batch** message trước khi gửi, broker **lưu nguyên dạng nén**, consumer giải nén — tiết kiệm băng thông mạng lẫn dung lượng đĩa.\
\
**Tương tác với batching:** nén hoạt động trên **batch**, nên batch càng lớn thì tỉ lệ nén càng tốt. Tăng `linger.ms` và `batch.size` cho producer gom nhiều message hơn mỗi lần gửi → nén hiệu quả hơn.\
\
**Đánh đổi throughput vs CPU:**\
\
| Codec | Tỉ lệ nén | CPU | Ghi chú |\
|---|---|---|---|\
| `snappy`, `lz4` | trung bình | thấp | nhanh, độ trễ thấp |\
| `gzip` | cao | cao | tốn CPU nhất |\
| `zstd` | cao | vừa | cân bằng tốt (từ Kafka 2.1) |\
\
**Quy tắc:** cần thông lượng cao/độ trễ thấp → `lz4`/`snappy`. Muốn tiết kiệm mạng và đĩa tối đa mà chịu được CPU → `zstd` (thường là lựa chọn cân bằng nhất) hoặc `gzip`.

## Detailed Answer (EN)
The producer sets **`compression.type`**, choosing one of: **`none`, `gzip`, `snappy`, `lz4`, `zstd`**. The producer compresses an **entire batch** of messages before sending, the broker **stores it still compressed**, and consumers decompress — saving both network bandwidth and disk.\
\
**Interaction with batching:** compression works on a **batch**, so larger batches yield better ratios. Raise `linger.ms` and `batch.size` so the producer groups more messages per send → more effective compression.\
\
**Throughput vs CPU trade-off:**\
\
| Codec | Ratio | CPU | Notes |\
|---|---|---|---|\
| `snappy`, `lz4` | medium | low | fast, low latency |\
| `gzip` | high | high | most CPU-heavy |\
| `zstd` | high | moderate | good balance (since Kafka 2.1) |\
\
**Rule of thumb:** need high throughput / low latency → `lz4`/`snappy`. Want to minimise network and disk and can spare CPU → `zstd` (usually the most balanced choice) or `gzip`.
