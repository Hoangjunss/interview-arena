---
id: log-metric-va-trace-moi-loai-tra-loi-duoc-cau-hoi-gi-khi-co-su-co-ban-nhin-cai-n
position: backend
technology: observability
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Log, metric và trace mỗi loại trả lời được câu hỏi gì? Khi có sự cố bạn nhìn cái nào trước?

## Question (EN)
What question does each of logs, metrics and traces answer? Which do you look at first during an incident?

## Đáp án chi tiết (VI)
Ba tín hiệu trả lời ba câu hỏi khác nhau, không thay thế cho nhau:\
\
- **Metric** — số liệu tổng hợp theo thời gian (request/s, tỉ lệ lỗi, độ trễ, CPU). Trả lời **\\"có đang hỏng không, hỏng từ lúc nào, mức độ ra sao\\"**. Rẻ, giữ được lâu, nhưng không cho biết chi tiết một request cụ thể.\
- **Trace** — đường đi của **một** request qua nhiều service, gồm các span có thời lượng. Trả lời **\\"chậm ở chặng nào, service nào gọi service nào\\"**.\
- **Log** — sự kiện rời rạc kèm ngữ cảnh. Trả lời **\\"cụ thể chuyện gì đã xảy ra trong lần đó\\"**: giá trị tham số, stack trace, mã lỗi từ bên thứ ba.\
\
**Thứ tự thực tế khi có sự cố:** metric phát hiện và khoanh vùng (dashboard cho thấy p99 của service checkout tăng lúc 14:05) → trace chỉ ra chặng nghi ngờ (span gọi payment mất 3s) → log của chặng đó cho nguyên nhân (timeout kết nối tới cổng thanh toán).\
\
Đi ngược lại — mở log trước — thường tốn thời gian vì bạn chưa biết cần đọc log của service nào, khoảng thời gian nào.

## Detailed Answer (EN)
The three signals answer three different questions and do not replace one another:\
\
- **Metrics** — aggregated numbers over time (requests/s, error rate, latency, CPU). They answer **\\"is something broken, since when, and how badly\\"**. Cheap, retained long, but say nothing about one specific request.\
- **Traces** — the path of **a single** request across services, made of timed spans. They answer **\\"which hop is slow, who calls whom\\"**.\
- **Logs** — discrete events with context. They answer **\\"what exactly happened that time\\"**: parameter values, stack traces, third-party error codes.\
\
**The practical order during an incident:** metrics detect and narrow the scope (the dashboard shows checkout p99 rising at 14:05) → a trace points at the suspect hop (the payment span takes 3s) → that hop's logs give the cause (connection timeout to the payment gateway).\
\
Going the other way — opening logs first — usually wastes time because you do not yet know which service or time window to read.
